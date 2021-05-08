package com.cnpm.fashion_shop.core.role.service;


import com.cnpm.fashion_shop.api.role.dto.RoleDto;
import com.cnpm.fashion_shop.api.role.dto.RoleResponseDto;
import com.cnpm.fashion_shop.api.user.dto.UserResponseDto;
import com.cnpm.fashion_shop.common.enums.RoleEnum;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.role.repository.RoleRepository;
import com.cnpm.fashion_shop.entity.Role;
import com.cnpm.fashion_shop.util.filterUtil.Implements.OrderFilterHelperImpl;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.invoke.MethodHandles;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    @Autowired
    RoleRepository roleRepository;

    @Transactional
    public Page<RoleResponseDto> findAllRoleDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "name"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return roleRepository.findAllByName(pageable, search);
    }

    @Transactional
    public Page<UserResponseDto> findAllUserByRole(Integer id, int size, int page, String sort) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "username",
                "fullName",
                "address",
                "phone_number",
                "email"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return roleRepository.findAllByNameRole(pageable, id);
    }

    public ResponseEntity getOne(Integer id) {
        Optional<Role> roleOptional = roleRepository.findById(id);
        Role role;

        if (roleOptional.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Response.notFound("Cannot find this role with id = " + id));
        }

        role = roleOptional.get();

        if (role.getIsDeleted()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Response.conflict("Role with id = " + id + " is deleted"));
        }
        return ResponseEntity.ok(new RoleDto(role.getId(), role.getName()));
    }

    @Transactional
    public ResponseEntity<Response> createRole(RoleDto dto) {
        Role role;
        Role existingRole = roleRepository.findByName(StringUtils.trim(dto.getName()));
        if (StringUtils.trim(dto.getName()).equals("")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Role name cannot be empty or contain only space"));
        }

        if (existingRole != null) {
            if (!existingRole.getIsDeleted()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT.value())
                        .body(Response.conflict("This role name existed already"));

            }

            existingRole.setIsDeleted(false);

            try {
                roleRepository.save(existingRole);
                return ResponseEntity.ok(SuccessfulResponse.CREATED);
            } catch (Exception e) {
                LOG.error(e.getMessage());
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Response.internalError(e.getMessage()));
            }
        }

        role = new Role();
        role.setName(dto.getName().trim());

        try {
            roleRepository.save(role);
            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> updateRole(Integer id, RoleDto dto) {
        Optional<Role> roleOptional = roleRepository.findById(id);
        Role role;
        Role existingRole = roleRepository.findByName(StringUtils.trim(dto.getName()));

        if (StringUtils.equals(StringUtils.trim(dto.getName()), "")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Role's name cannot be empty"));
        }

        if (roleOptional.isEmpty() || roleOptional.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found role to be updated"));
        }

        // Compare old and new name
        if (roleOptional.get().getName().equals(StringUtils.trim(dto.getName()))) {
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        }

        if (existingRole != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This role already exists"));
        }

        role = roleOptional.get();
        role.setName(dto.getName().trim());

        try {
            roleRepository.save(role);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> deleteRole(Integer id) {
        Role role;
        Optional<Role> roleOptional = roleRepository.findById(id);

        if (roleOptional.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This brand does not exist"));
        }

        role = roleOptional.get();

        if (role.getIsDeleted()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This role has been deleted"));
        }

        role.setIsDeleted(true);

        try {
            roleRepository.save(role);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    public Role getEmployeeRole() {
        return roleRepository.findByName(RoleEnum.employee.name());
    }

    public Role getAdminRole() {
        return roleRepository.findByName(RoleEnum.admin.name());
    }

    public Role getCustomerRole() {
        return roleRepository.findByName(RoleEnum.customer.name());
    }

}
