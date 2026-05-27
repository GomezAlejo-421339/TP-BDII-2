package com.fakegraph.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

public class PasswordUtils {

    /**
     * Hashea una contraseña usando SHA-256 y retorna su representación en hexadecimal.
     */
    public static String hashPassword(String password) {
        if (password == null) return null;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error al buscar el algoritmo SHA-256", e);
        }
    }

    /**
     * Compara una contraseña en texto plano contra un hash almacenado.
     */
    public static boolean checkPassword(String password, String storedHash) {
        if (password == null || storedHash == null) return false;
        return hashPassword(password).equals(storedHash);
    }
}
