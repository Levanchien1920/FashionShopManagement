package com.cnpm.fashion_shop.core.employee.service;

import com.cnpm.fashion_shop.entity.Employee;
import com.cnpm.fashion_shop.api.employee.dto.EmployeeDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EmployeeDetailService implements UserDetailsService {
    @Autowired
    private EmployeeService employeeService;

    public UserDetails loadUserById(Integer id) throws UsernameNotFoundException {
        Optional<Employee> employee = employeeService.findByIdOptional(id);

        if (employee.isEmpty()) {
            throw new UsernameNotFoundException("Username is not found");
        }

        return new EmployeeDetail(
                employee.get().getUsername(),
                employee.get().getPassword(),
                employeeService.mappingRolesToName(employee.get().getRole())
        );
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return null;
    }
}
