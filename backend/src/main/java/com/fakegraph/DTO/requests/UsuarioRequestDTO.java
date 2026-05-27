package com.fakegraph.DTO.requests;

import lombok.Data;

@Data
public class UsuarioRequestDTO {
    private String nombre;
    private String email;
    private String password;
}
