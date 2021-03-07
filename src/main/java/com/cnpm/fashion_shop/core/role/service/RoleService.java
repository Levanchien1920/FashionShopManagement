package com.cnpm.fashion_shop.core.role.service;


import com.cnpm.fashion_shop.common.enums.RoleEnum;
import com.cnpm.fashion_shop.core.role.repository.RoleRepository;
import com.cnpm.fashion_shop.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

    public Role getDefaultRole() {
        return roleRepository.findByName(RoleEnum.EMPLOYEE.name());
    }
}
