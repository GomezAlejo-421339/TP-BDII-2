package com.fakegraph.exception;

public class FuenteNotFoundException extends ResourceNotFoundException {
    public FuenteNotFoundException(Long id) {
        super("No se encontró la fuente con ID: " + id);
    }
}
