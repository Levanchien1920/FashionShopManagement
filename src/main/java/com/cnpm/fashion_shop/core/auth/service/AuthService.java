package com.cnpm.fashion_shop.core.auth.service;

import com.cnpm.fashion_shop.api.auth.dto.AuthCustomerResponseDto;
import com.cnpm.fashion_shop.api.auth.dto.AuthEmployeeResponseDto;
import com.cnpm.fashion_shop.api.auth.dto.LoginCustomerDto;
import com.cnpm.fashion_shop.api.auth.dto.LoginDto;
import com.cnpm.fashion_shop.api.auth.dto.LoginEmployeeDetailDto;
import com.cnpm.fashion_shop.common.exception.UnAuthorizedException;
import com.cnpm.fashion_shop.core.customer.service.CustomerService;
import com.cnpm.fashion_shop.core.employee.service.EmployeeService;
import com.cnpm.fashion_shop.entity.Customer;
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
    private CustomerService customerService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private JwtProvider jwtProvider;

    public AuthEmployeeResponseDto loginEmployee(LoginDto dto) {
        Employee employee = employeeService.findByUsername(dto.getUsername());
        if (employee == null || !encoder.matches(dto.getPassword(), employee.getPassword())) {
            throw new UnAuthorizedException();
        }
        LoginEmployeeDetailDto info = new LoginEmployeeDetailDto(
                employee.getId(),
                employee.getUsername(),
                employee.getFullName(),
                employeeService.mappingRolesToName(employee.getRole())
        );
        String token = jwtProvider.generateTokenForEmployee(employee);

        return new AuthEmployeeResponseDto(
                token,
                info
        );
    }

    public AuthCustomerResponseDto loginCustomer(LoginDto dto) {
        Customer customer = customerService.findByUsername(dto.getUsername());
        if (customer == null || !encoder.matches(dto.getPassword(), customer.getPassword())) {
            throw new UnAuthorizedException();
        }

        LoginCustomerDto infoCustomer = new LoginCustomerDto(
                customer.getId_cus(),
                customer.getUsername(),
                customer.getFullname(),
                customer.getAddress(),
                customer.getPhoneNumber(),
                customer.getEmail()
        );
        String token = jwtProvider.generateTokenForCustomer(customer);

        return new AuthCustomerResponseDto(
                token,
                infoCustomer
        );
    }
}
