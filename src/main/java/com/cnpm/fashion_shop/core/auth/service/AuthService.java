package com.cnpm.fashion_shop.core.auth.service;

import com.cnpm.fashion_shop.api.auth.dto.AuthResponseDto;
import com.cnpm.fashion_shop.api.auth.dto.LoginDto;
import com.cnpm.fashion_shop.api.auth.dto.LoginEmployeeDetailDto;
import com.cnpm.fashion_shop.common.exception.UnAuthorizedException;
import com.cnpm.fashion_shop.core.employee.service.EmployeeService;
import com.cnpm.fashion_shop.entity.Employee;
import com.cnpm.fashion_shop.shared.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private JwtProvider jwtProvider;

    public AuthResponseDto login(LoginDto dto) {
        Employee user = employeeService.findByUsername(dto.getUsername());
        if (user == null || !encoder.matches(dto.getPassword(), user.getPassword())) {
            throw new UnAuthorizedException();
        }

        LoginEmployeeDetailDto info = new LoginEmployeeDetailDto(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                employeeService.mappingRolesToName(user.getRole())
        );
        String token = jwtProvider.generateToken(user);

        return new AuthResponseDto(
                token,
                info
        );
    }
}
