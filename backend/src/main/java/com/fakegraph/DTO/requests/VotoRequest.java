package com.fakegraph.DTO.requests;

import com.fakegraph.model.relaciones.TipoVoto;
import lombok.Data;

@Data
public class VotoRequest {
    private TipoVoto tipoVoto;  // VERDADERO | FALSO | DUDOSO
    private String comentario;   // opcional
}
