package com.cnpm.fashion_shop.api.auth.controller;

import java.rmi.UnexpectedException;
import javax.validation.Valid;

import com.cnpm.fashion_shop.api.auth.dto.AuthResponseDto;
import com.cnpm.fashion_shop.api.auth.dto.LoginDto;
import com.cnpm.fashion_shop.core.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public AuthResponseDto login(@Valid @RequestBody LoginDto dto) throws UnexpectedException {
        return authService.login(dto);
    }
}

