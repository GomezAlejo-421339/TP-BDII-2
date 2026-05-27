package com.fakegraph.service;

import com.fakegraph.DTO.requests.NoticiaRequestDTO;
import com.fakegraph.DTO.requests.VotoRequest;
import com.fakegraph.DTO.response.NoticiaResponseDTO;
import com.fakegraph.model.nodos.Fuente;
import com.fakegraph.model.nodos.Noticia;
import com.fakegraph.model.nodos.Tema;
import com.fakegraph.model.nodos.Usuario;
import com.fakegraph.model.relaciones.Comparte;
import com.fakegraph.model.relaciones.Voto;
import com.fakegraph.repository.FuenteRepository;
import com.fakegraph.repository.NoticiaRepository;
import com.fakegraph.repository.TemaRepository;
import com.fakegraph.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.neo4j.core.Neo4jClient;
import java.util.Map;
import java.util.List;
import java.util.Optional;
import java.time.ZonedDateTime;

@Service
@RequiredArgsConstructor
public class NoticiaService {
    private final NoticiaRepository noticiaRepository;
    private final TemaRepository temaRepository;
    private final FuenteRepository fuenteRepository;
    private final UsuarioRepository usuarioRepository;
    private final UrlParserService urlParserService;
    private final Neo4jClient neo4jClient;

    @Transactional(readOnly = true)
    public Map<String, Object> obtenerDesgloseCredibilidad(Long noticiaId) {
        return neo4jClient.query(
                "MATCH (n:Noticia) WHERE id(n) = $id " +
                "OPTIONAL MATCH (n)<-[c:COMPARTE]-(:Usuario) " +
                "OPTIONAL MATCH (n)<-[v:VOTO {tipoVoto: 'FALSO'}]-(:Usuario) " +
                "OPTIONAL MATCH (n)-[:PUBLICADA_EN]->(f:Fuente) " +
                "RETURN count(DISTINCT c) as shares, " +
                "       count(DISTINCT v) as desmentidos, " +
                "       coalesce(f.verificada, false) as fuenteVerificada")
                .bind(noticiaId).to("id")
                .fetch().first().orElse(Map.of());
    }

    @Transactional(readOnly = true)
    public Map<String, Object> obtenerDesgloseDifusion(Long noticiaId) {
        List<String> usuarios = (List<String>) neo4jClient.query(
                "MATCH (n:Noticia)<-[:COMPARTE]-(u:Usuario) " +
                "WHERE id(n) = $id " +
                "RETURN u.nombre as nombre")
                .bind(noticiaId).to("id")
                .fetchAs(String.class)
                .mappedBy((ts, rec) -> rec.get("nombre").asString())
                .all();
        
        return Map.of(
            "totalShares", usuarios.size(),
            "usuarios", usuarios
        );
    }

    @Transactional
    public NoticiaResponseDTO postearNoticia(NoticiaRequestDTO request, Long usuarioId) {
        Usuario u = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new com.fakegraph.exception.UsuarioNotFoundException(usuarioId));

        String dominio = urlParserService.extractDomain(request.getUrl());
        Fuente f = fuenteRepository.mergeByDominio(dominio);
        Tema t = temaRepository.mergeByNombre(request.getTema());

        Optional<Noticia> existenteOpt = noticiaRepository.findByUrl(request.getUrl());
        Noticia noticia;
        boolean yaExistia = false;

        if (existenteOpt.isPresent()) {
            noticia = existenteOpt.get();
            yaExistia = true;
        } else {
            noticia = new Noticia();
            noticia.setTitulo(request.getTitulo());
            noticia.setUrl(request.getUrl());
            noticia.setAutorNombre(request.getAutorNombre());
            noticia.setFechaPublicacion(ZonedDateTime.now());
            noticia.setScoreCredibilidad(0.5);
            noticia.setSitioWeb(f);
            noticia.setTema(t);
            noticia = noticiaRepository.save(noticia);
            
            // Relacionar usuario -> posteo -> noticia
            usuarioRepository.linkPosteo(usuarioId, noticia.getId());
        }

        return toNoticiaResponseDTO(noticia, yaExistia);
    }

    @Transactional(readOnly = true)
    public Page<NoticiaResponseDTO> listarNoticias(Pageable pageable) {
        return noticiaRepository.findAll(pageable).map(n -> toNoticiaResponseDTO(n, false));
    }

    @Transactional(readOnly = true)
    public Iterable<NoticiaResponseDTO> listarSospechosas() {
        return ((java.util.List<Noticia>)noticiaRepository.findNoticiasSospechosasAltaDifusion())
                .stream().map(n -> toNoticiaResponseDTO(n, false)).toList();
    }

    @Transactional(readOnly = true)
    public NoticiaResponseDTO obtenerPorId(Long id) {
        Noticia n = noticiaRepository.findById(id)
                .orElseThrow(() -> new com.fakegraph.exception.NoticiaNotFoundException(id));
        return toNoticiaResponseDTO(n, false);
    }

    @Transactional
    public NoticiaResponseDTO votar(Long noticiaId, Long usuarioId, VotoRequest request) {
        Usuario u = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new com.fakegraph.exception.UsuarioNotFoundException(usuarioId));
        Noticia n = noticiaRepository.findById(noticiaId)
                .orElseThrow(() -> new com.fakegraph.exception.NoticiaNotFoundException(noticiaId));

        u.votar(n, request.getTipoVoto(), request.getComentario());
        usuarioRepository.save(u); // Guarda la relación VOTO

        // Recalcular score (ejecutando query nativa para mayor eficiencia)
        Noticia actualizada = noticiaRepository.recalcularScore(noticiaId);

        // Recalcular la confiabilidad de los usuarios que participaron en esta noticia
        usuarioRepository.recalcularUsuariosQueVotaron(noticiaId);
        
        // Refrescar para asegurar que tenemos la version mas reciente
        actualizada = noticiaRepository.findById(noticiaId).orElse(actualizada);
        return toNoticiaResponseDTO(actualizada, true);
    }

    @Transactional
    public void repostear(Long noticiaId, Long usuarioId) {
        Usuario u = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new com.fakegraph.exception.UsuarioNotFoundException(usuarioId));
        Noticia n = noticiaRepository.findById(noticiaId)
                .orElseThrow(() -> new com.fakegraph.exception.NoticiaNotFoundException(noticiaId));

        u.repostear(n);
        usuarioRepository.save(u); // Guarda la relación COMPARTE
    }

    private NoticiaResponseDTO toNoticiaResponseDTO(Noticia n, boolean yaExistia) {
        NoticiaResponseDTO response = new NoticiaResponseDTO();
        response.setId(n.getId());
        response.setTitulo(n.getTitulo());
        response.setUrl(n.getUrl());
        response.setAutorNombre(n.getAutorNombre());
        response.setFechaPublicacion(n.getFechaPublicacion());
        response.setScoreCredibilidad(n.getScoreCredibilidad());
        response.setYaExistia(yaExistia);

        if (n.getSitioWeb() != null) {
            response.setDominio(n.getSitioWeb().getDominio());
            response.setNombreFuente(n.getSitioWeb().getNombre());
            response.setFuenteVerificada(n.getSitioWeb().isVerificada());
        }

        if (n.getTema() != null) {
            response.setTema(n.getTema().getNombre());
        }
        
        // TODO: Para los totales se requieren queries adicionales, 
        // o si las relaciones VOTO/COMPARTE estuvieran mapedas desde Noticia, 
        // pero SDN 6 cargaría grafos inmensos. Las estadísticas las proveerá EstadisticasService.
        return response;
    }
}
