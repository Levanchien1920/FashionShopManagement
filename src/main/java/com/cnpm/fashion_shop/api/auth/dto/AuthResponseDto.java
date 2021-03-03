package com.cnpm.fashion_shop.api.auth.dto;

public class AuthResponseDto {
    private String token ;
    private LoginEmployeeDetailDto info ;
    public AuthResponseDto(String token, LoginEmployeeDetailDto info) {
        super();
        this.token = token;
        this.info = info;
    }
}
