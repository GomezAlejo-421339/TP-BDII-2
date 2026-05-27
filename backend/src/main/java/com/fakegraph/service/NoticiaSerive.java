package com.fakegraph.service;

import com.fakegraph.DTO.requests.NoticiaRequestDTO;
import com.fakegraph.DTO.response.NoticiaResponseDTO;
import com.fakegraph.model.nodos.Autor;
import com.fakegraph.model.nodos.Fuente;
import com.fakegraph.model.nodos.Noticia;
import com.fakegraph.model.nodos.Tema;
import com.fakegraph.repository.AutorRepository;
import com.fakegraph.repository.FuenteRepository;
import com.fakegraph.repository.NoticiaRepository;
import com.fakegraph.repository.TemaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NoticiaSerive {
    private final NoticiaRepository noticiaRepository;
    private final AutorRepository autorRepository;
    private final TemaRepository temaRepository;
    private final FuenteRepository fuenteRepository;

    public NoticiaResponseDTO create(NoticiaRequestDTO request) {
        Autor a = autorRepository.findById(Long.parseLong(request.getAutor_id()))
                .orElseThrow(() -> new RuntimeException("No se encontro el autor con id "+request.getAutor_id()));
        Tema t = temaRepository.findById(Long.parseLong(request.getTema_id()))
                .orElseThrow(() -> new RuntimeException("No se encontro el tema con id "+request.getTema_id()));
        Fuente f = fuenteRepository.findById(Long.parseLong(request.getFuente_id()))
                .orElseThrow(() -> new RuntimeException("No se encontro la fuente con id "+request.getFuente_id()));

        Noticia n = new Noticia();
        n.setAutor(a);
        n.setTema(t);
        n.setSitioWeb(f);
        n.setFechaPublicacion(LocalDateTime.now());
        n.setResumen(request.getResumen());
        n.setTitulo(request.getTitulo());
        n.setUrl(request.getUrl());

        Noticia noticia = noticiaRepository.save(n);

        return toNoticiaResponseDTO(noticia);
    }


    private NoticiaResponseDTO toNoticiaResponseDTO(Noticia n) {
        NoticiaResponseDTO resposne = new NoticiaResponseDTO();
        resposne.setId(n.getId());
        resposne.setAutor(n.getAutor());
        resposne.setTema(n.getTema());
        resposne.setSitioWeb(n.getSitioWeb());
        resposne.setFechaPublicacion(n.getFechaPublicacion());
        resposne.setResumen(n.getResumen());
        resposne.setTitulo(n.getTitulo());
        resposne.setUrl(n.getUrl());
        return resposne;
    }
}
