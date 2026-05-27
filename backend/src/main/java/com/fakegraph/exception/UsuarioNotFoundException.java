package com.fakegraph.exception;

public class UsuarioNotFoundException extends ResourceNotFoundException {
    public UsuarioNotFoundException(Long id) {
        super("No se encontró el usuario con ID: " + id);
    }
}
