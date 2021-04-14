package com.cnpm.fashion_shop.core.employee.service;

import com.cnpm.fashion_shop.api.employee.dto.EmployeeDetailDto;
import com.cnpm.fashion_shop.api.employee.dto.EmployeeDto;
import com.cnpm.fashion_shop.api.employee.dto.EmployeeResponseDto;
import com.cnpm.fashion_shop.common.enums.RoleEnum;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.employee.repository.EmployeeRepository;
import com.cnpm.fashion_shop.core.role.service.RoleService;
import com.cnpm.fashion_shop.entity.Employee;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.lang.invoke.MethodHandles;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RoleService roleService;
    @Autowired
    private BCryptPasswordEncoder encoder;

    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @Transactional
    public Page<EmployeeResponseDto> findAllEmployeeDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "employeeName",
                "phoneNumber",
                "address"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return employeeRepository.findAllByUsername(pageable, search);
    }

    /**
     * create new employee record in employee table
     * notice: password field is not used, just use for logging by admin so password will be set is DEFAULT_PASSWORD
     *
     * @return employee id after save it into database
     * if cannot create return null
     */
    public ResponseEntity getOne(Integer id) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);

        if (optionalEmployee.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Response.notFound("Cannot find this employee with id = " + id));
        }

        Employee employee = optionalEmployee.get();

        if (employee.getIsDeleted()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Response.conflict("Employee with id = " + id + " is deleted"));
        }
        return ResponseEntity.ok(new EmployeeDto(employee.getId(), employee.getFullName(), employee.getPhone_number(), employee.getUsername(), employee.getAddress(), employee.getId_role()));
    }

    public ResponseEntity<Response> createEmployee(EmployeeDto dto) {
        Employee employee;
        Employee existingEmployee = employeeRepository.findByUsername(StringUtils.trim(dto.getUsername()));
        if (StringUtils.trim(dto.getFullname()).equals("")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Employee name cannot be empty or contain only space"));
        }

        if (existingEmployee != null) {
            if (!existingEmployee.getIsDeleted()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT.value())
                        .body(Response.conflict("This username existed already"));

            }

            existingEmployee.setIsDeleted(false);

            try {
                employeeRepository.save(existingEmployee);
                return ResponseEntity.ok(SuccessfulResponse.CREATED);
            } catch (Exception e) {
                LOG.error(e.getMessage());
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Response.internalError(e.getMessage()));
            }
        }

        employee = new Employee();
        employee.setPassword(encoder.encode(dto.getPassword()));
        employee.setUsername(dto.getUsername());
        employee.setFullName(dto.getFullname().trim());
        employee.setAddress(dto.getAddress());
        employee.setPhone_number(dto.getPhoneNumber());
        employee.setId_role(dto.getId_role());
        if (dto.getId_role() == 1) {
            employee.setRole(new HashSet<>(Collections.singletonList(roleService.getAdminRole())));
        }
        if (dto.getId_role() == 2) {
            employee.setRole(new HashSet<>(Collections.singletonList(roleService.getEmployeeRole())));
        }
        if (dto.getId_role() == 3) {
            employee.setRole(new HashSet<>(Collections.singletonList(roleService.getCustomerRole())));
        }

        try {
            employeeRepository.save(employee);
            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> updateEmployee(Integer id, EmployeeDto dto) {
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        Employee employee;
        Employee existingEmployee = employeeRepository.findByUsername(StringUtils.trim(dto.getUsername()));

        if (StringUtils.equals(StringUtils.trim(dto.getFullname()), "")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Customer's name cannot be empty"));
        }

        if (employeeOpt.isEmpty() || employeeOpt.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found Customer to be updated"));
        }

        // Compare old and new name
        if (employeeOpt.get().getUsername().equals(StringUtils.trim(dto.getUsername()))) {
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        }

        if (existingEmployee != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This email customer already exists"));
        }

        employee = employeeOpt.get();
        employee.setUsername(dto.getUsername());
        employee.setFullName(dto.getFullname().trim());
        employee.setPassword(encoder.encode(dto.getPassword()));
        employee.setAddress(dto.getAddress());
        employee.setPhone_number(dto.getPhoneNumber());


        try {
            employeeRepository.save(employee);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    public ResponseEntity<Response> deleteEmployee(Integer id) {
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        if (employeeOpt.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This employee does not exist"));
        }

        Employee employee = employeeOpt.get();

        if (employee.getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This employee is deleted already"));
        }
        EmployeeDetailDto employeeRole = employeeRepository.getEmployeeDetailsWithRoleUser(employee.getId(), RoleEnum.admin.name());
        if (employeeRole != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Cannot delete employee with role Admin"));
        }
        employee.setIsDeleted(true);

        try {

            this.employeeRepository.save(employee);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    public Employee findByUsername(String username) {
        return this.employeeRepository.findByUsername(username);
    }

    public List<String> mappingRolesToName(Set<Role> roles) {
        return roles
                .stream().map(Role::getName)
                .collect(Collectors.toList());
    }

    public Optional<Employee> findByIdOptional(Integer id) {
        return this.employeeRepository.findById(id);
    }

}

