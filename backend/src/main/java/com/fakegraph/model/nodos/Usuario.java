package com.fakegraph.model.nodos;

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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Node
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id @GeneratedValue
    private Long id;
    private String nombre;
    private String email;
    private int scoreCredibility;

    @Relationship(type = "VOTO", direction = Relationship.Direction.OUTGOING)
    private List<Voto> interacciones = new ArrayList<>();

    public void votarYComentar(Noticia noticia, TipoVoto tipoVoto, String comentario) {
        Voto voto = new Voto();
        voto.setNoticia(noticia);
        voto.setTipoVoto(tipoVoto);
        voto.setComentario(comentario);
        voto.setFecha(LocalDateTime.now());
        this.interacciones.add(voto);
    }
}
