package com.cnpm.fashion_shop.shared;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.cnpm.fashion_shop.entity.Customer;
import com.cnpm.fashion_shop.entity.Employee;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {
    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private String jwtExpirationInMs;

    public Long getUserIdFromJWT(String token) {
        String id =  JWT
                .require(Algorithm.HMAC512(jwtSecret.getBytes()))
                .build()
                .verify(token)
                .getSubject();
        return Long.parseLong(id);
    }

    public String generateTokenForEmployee(Employee auth) {
        return JWT.create()
                .withSubject(Long.toString(auth.getId()))
                .withClaim("id", auth.getId())
                .withExpiresAt(new Date(System.currentTimeMillis()  + Integer.parseInt(jwtExpirationInMs)))
                .sign(Algorithm.HMAC512(jwtSecret.getBytes()));
    }
    public String generateTokenForCustomer(Customer auth) {
        return JWT.create()
                .withSubject(Long.toString(auth.getId_cus()))
                .withClaim("id", auth.getId_cus())
                .withExpiresAt(new Date(System.currentTimeMillis()  + Integer.parseInt(jwtExpirationInMs)))
                .sign(Algorithm.HMAC512(jwtSecret.getBytes()));
    }


    public String validateToken(String accessToken) {
        return JWT
                .require(Algorithm.HMAC512(jwtSecret.getBytes()))
                .build()
                .verify(accessToken)
                .getPayload();
    }
}


