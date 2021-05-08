package com.cnpm.fashion_shop.core.employee.service;

import com.cnpm.fashion_shop.api.user.dto.UserDetailDto;
import com.cnpm.fashion_shop.api.user.dto.UserDto;
import com.cnpm.fashion_shop.api.user.dto.UserResponseDto;
import com.cnpm.fashion_shop.common.enums.RoleEnum;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.customer.repository.CustomerRepository;
import com.cnpm.fashion_shop.core.employee.repository.UserRepository;
import com.cnpm.fashion_shop.core.role.service.RoleService;
import com.cnpm.fashion_shop.entity.User;
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
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoleService roleService;
    @Autowired
    private BCryptPasswordEncoder encoder;

    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @Transactional
    public Page<UserResponseDto> findAllEmployeesDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "address",
                "fullName",
                "userName",
                "phoneNumber",
                "email"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return userRepository.findAllByUsername(pageable, search);
    }

    @Transactional
    public Page<UserResponseDto> findAllCustomerDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "address",
                "fullName",
                "userName",
                "phoneNumber",
                "email"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return customerRepository.findAllByName(pageable, search);
    }


    /**
     * create new employee record in employee table
     * notice: password field is not used, just use for logging by admin so password will be set is DEFAULT_PASSWORD
     *
     * @return employee id after save it into database
     * if cannot create return null
     */
    public ResponseEntity getOneEmployee(Integer id) {
        Optional<User> optionalEmployee = userRepository.findById(id);

        if (optionalEmployee.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Response.notFound("Cannot find this employee with id = " + id));
        }

        User user = optionalEmployee.get();

        if (user.getIsDeleted()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Response.conflict("Employee with id = " + id + " is deleted"));
        }
        return ResponseEntity.ok(new UserDto(user.getId(), user.getFullName(), user.getPhone_number(), user.getUsername(), user.getAddress(), user.getPassword(), user.getEmail(), user.getId_role()));
    }

    public ResponseEntity getOneCustomer(Integer id) {
        Optional<User> optionalCustomer = customerRepository.findById_customer(id);

        if (optionalCustomer.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Response.notFound("Cannot find this customer with id = " + id));
        }

        User user = optionalCustomer.get();

        if (user.getIsDeleted()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Response.conflict("Customer with id = " + id + " is deleted"));
        }
        return ResponseEntity.ok(new UserDto(user.getId(), user.getFullName(), user.getPhone_number(), user.getUsername(), user.getAddress(), user.getPassword(), user.getEmail(), user.getId_role()));
    }


    public ResponseEntity<Response> createUser(UserDto dto) {
        User user;
        User existingUser = userRepository.findByUsername(StringUtils.trim(dto.getUsername()));
        if (StringUtils.trim(dto.getFullname()).equals("")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("User name cannot be empty or contain only space"));
        }

        if (existingUser != null) {
            if (!existingUser.getIsDeleted()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT.value())
                        .body(Response.conflict("This username existed already"));

            }

            existingUser.setIsDeleted(false);

            try {
                userRepository.save(existingUser);
                return ResponseEntity.ok(SuccessfulResponse.CREATED);
            } catch (Exception e) {
                LOG.error(e.getMessage());
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Response.internalError(e.getMessage()));
            }
        }

        user = new User();
        user.setPassword(encoder.encode(dto.getPassword()));
        user.setUsername(dto.getUsername());
        user.setFullName(dto.getFullname().trim());
        user.setAddress(dto.getAddress());
        user.setPhone_number(dto.getPhoneNumber());
        user.setEmail(dto.getEmail());
        user.setId_role(dto.getId_role());
        if (dto.getId_role() == 1) {
            user.setRole(new HashSet<>(Collections.singletonList(roleService.getAdminRole())));
        }
        if (dto.getId_role() == 2) {
            user.setRole(new HashSet<>(Collections.singletonList(roleService.getEmployeeRole())));
        }
        if (dto.getId_role() == 3) {
            user.setRole(new HashSet<>(Collections.singletonList(roleService.getCustomerRole())));
        }


        try {
            userRepository.save(user);
            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> updateUser(Integer id, UserDto dto) {
        Optional<User> userOpt = userRepository.findById(id);
        User user;
        User existingUser = userRepository.findByUsername(StringUtils.trim(dto.getUsername()));

        if (StringUtils.equals(StringUtils.trim(dto.getUsername()), "")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("User's name cannot be empty"));
        }

        if (userOpt.isEmpty() || userOpt.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found user to be updated"));
        }

        // Compare old and new name
        if (userOpt.get().getUsername().equals(StringUtils.trim(dto.getUsername()))) {
            user = userOpt.get();
            user.setFullName(dto.getFullname().trim());
            user.setPassword(encoder.encode(dto.getPassword()));
            user.setAddress(dto.getAddress());
            user.setEmail(dto.getEmail());
            user.setPhone_number(dto.getPhoneNumber());
            userRepository.save(user);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        }

        if (existingUser != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This email user already exists"));
        }

        user = userOpt.get();
        user.setUsername(dto.getUsername());
        user.setFullName(dto.getFullname().trim());
        user.setPassword(encoder.encode(dto.getPassword()));
        user.setAddress(dto.getAddress());
        user.setEmail(dto.getEmail());
        user.setPhone_number(dto.getPhoneNumber());


        try {
            userRepository.save(user);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> deleteCustomer(Integer id) {
        Optional<User> customer = customerRepository.findById_customer(id);
        if (customer.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This customer does not exist"));
        }

        User user = customer.get();

        if (user.getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This customer is deleted already"));
        }
        UserDetailDto employeeRole = userRepository.getUserDetailsWithRoleUser(user.getId(), RoleEnum.admin.name());
        if (employeeRole != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Cannot delete user with role Admin"));
        }
        user.setIsDeleted(true);

        try {

            this.userRepository.save(user);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> deleteEmployee(Integer id) {
        Optional<User> employeeOpt = userRepository.findByIdEmployee(id);
        if (employeeOpt.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This employee does not exist"));
        }

        User user = employeeOpt.get();

        if (user.getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This employee is deleted already"));
        }
        UserDetailDto employeeRole = userRepository.getUserDetailsWithRoleUser(user.getId(), RoleEnum.admin.name());
        if (employeeRole != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Cannot delete user with role Admin"));
        }
        user.setIsDeleted(true);

        try {

            this.userRepository.save(user);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    public User findByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    public List<String> mappingRolesToName(Set<Role> roles) {
        return roles
                .stream().map(Role::getName)
                .collect(Collectors.toList());
    }

    public Optional<User> findByIdOptional(Integer id) {
        return this.userRepository.findById(id);
    }

    public Integer getTotalCustomers() {
        return this.customerRepository.findAllTotal();
    }

}

