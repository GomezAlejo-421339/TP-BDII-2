package com.fakegraph.model.nodos;

import com.fakegraph.model.relaciones.Comparte;
import com.fakegraph.model.relaciones.TipoVoto;
import com.fakegraph.model.relaciones.Voto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Nodo Usuario en el grafo Neo4j.
 *
 * Relaciones outgoing:
 *   - [:POSTEO]   → Noticia  (noticias que el usuario cargó en la plataforma)
 *   - [:COMPARTE] → Noticia  (noticias que el usuario reposteó)
 *   - [:VOTO]     → Noticia  (noticias que el usuario votó, con tipo y comentario)
 *
 * El usuario se identifica por su email (unique constraint en Neo4j).
 * El ID se guarda en localStorage del frontend y se envía como header X-User-Id.
 *
 * Constraint: CREATE CONSTRAINT usuario_email ... REQUIRE u.email IS UNIQUE
 */
@Node("Usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue
    private Long id;

    /** Nombre para mostrar en la UI. */
    private String nombre;

    /**
     * Email del usuario. Sirve como clave única para evitar registros duplicados.
     */
    private String email;

    /**
     * Score de credibilidad del usuario (0 a 100).
     * Aumenta cuando sus votos coinciden con el consenso.
     */
    private int scoreCredibilidad;

    /** Cantidad de seguidores del usuario. */
    private Integer seguidores;

    /** Antigüedad del usuario en días. */
    private Integer antiguedadDias;

    /** Hash de la contraseña del usuario (SHA-256). */
    private String passwordHash;

    /** Lista de votos emitidos por este usuario sobre noticias. */
    @Relationship(type = "VOTO", direction = Relationship.Direction.OUTGOING)
    private List<Voto> votos = new ArrayList<>();

    /** Lista de noticias que este usuario reposteó. */
    @Relationship(type = "COMPARTE", direction = Relationship.Direction.OUTGOING)
    private List<Comparte> reposteos = new ArrayList<>();

    /**
     * Registra un voto del usuario sobre una noticia.
     * Si ya existe un voto previo, se reemplaza (un usuario = un voto por noticia).
     */
    public void votar(Noticia noticia, TipoVoto tipoVoto, String comentario) {
        // Eliminar voto previo a la misma noticia si existe
        votos.removeIf(c -> c.getNoticia() != null
                && c.getNoticia().getId() != null
                && c.getNoticia().getId().equals(noticia.getId()));

        Voto voto = new Voto();
        voto.setNoticia(noticia);
        voto.setTipoVoto(tipoVoto);
        voto.setComentario(comentario);
        voto.setFecha(ZonedDateTime.now());
        this.votos.add(voto);
    }

    /**
     * Registra un reposteo del usuario sobre una noticia.
     */
    public void repostear(Noticia noticia) {
        Comparte comparte = new Comparte();
        comparte.setNoticia(noticia);
        comparte.setTimestamp(ZonedDateTime.now());
        comparte.setPlataforma("web");
        this.reposteos.add(comparte);
    }
}
