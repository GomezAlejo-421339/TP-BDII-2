package com.fakegraph.exception;

public class NoticiaNotFoundException extends ResourceNotFoundException {
    public NoticiaNotFoundException(Long id) {
        super("No se encontró la noticia con ID: " + id);
    }
}
