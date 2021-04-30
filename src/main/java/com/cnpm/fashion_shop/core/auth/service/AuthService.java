package com.cnpm.fashion_shop.core.auth.service;

import com.cnpm.fashion_shop.api.auth.dto.AuthResponseDto;
import com.cnpm.fashion_shop.api.auth.dto.LoginDetailDto;
import com.cnpm.fashion_shop.api.auth.dto.LoginDto;
import com.cnpm.fashion_shop.common.exception.UnAuthorizedException;
import com.cnpm.fashion_shop.core.employee.service.UserService;
import com.cnpm.fashion_shop.entity.User;
import com.cnpm.fashion_shop.shared.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private JwtProvider jwtProvider;

    public AuthResponseDto login(LoginDto dto) {
        User user = userService.findByUsername(dto.getUsername());
        if (user == null || !encoder.matches(dto.getPassword(), user.getPassword())) {
            throw new UnAuthorizedException();
        }
        LoginDetailDto info = new LoginDetailDto(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getAddress(),
                user.getPhone_number(),
                user.getEmail(),
                userService.mappingRolesToName(user.getRole())
        );
        String token = jwtProvider.generateTokenForEmployee(user);

        return new AuthResponseDto(
                token,
                info
        );
    }

}
