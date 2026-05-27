package com.fakegraph.DTO.requests;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
}
