package com.cnpm.fashion_shop.core.employee.service;

import com.cnpm.fashion_shop.core.employee.repository.EmployeeRepository;
import com.cnpm.fashion_shop.core.role.service.RoleService;
import com.cnpm.fashion_shop.entity.Employee;
import com.cnpm.fashion_shop.entity.Role;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.invoke.MethodHandles;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
   // private static final Logger LOG = (Logger) LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RoleService roleService;
  //  @Autowired
   // private BCryptPasswordEncoder encoder;

//    public Page<EmployeeDetailDto> getEmployees(int page, int size, String order, String keyword) {
//        List<String> columnsAllow = Arrays.asList("id", "employeeName", "project", "assignedDevice");
//        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(order, columnsAllow);
//
//        orderFilterHelperImpl.validate();
//        Sort sort = orderFilterHelperImpl.getSort();
//
//        Pageable pageable = PageRequest.of(page, size, sort);
//        return employeeCustomRepository.getEmployees(keyword, pageable);
//    }
//
//    /**
//     * create new employee record in employee table
//     * notice: password field is not used, just use for logging by admin so password will be set is DEFAULT_PASSWORD
//     *
//     * @return employee id after save it into database
//     * if cannot create return null
//     */
//    @Transactional
//    public EmployeeResponse createEmployee(EmployeeDto dto) {
//        // handle input data
//        dto.setFirstName(StringUtils.trim(dto.getFirstName()));
//        dto.setLastName(StringUtils.trim(dto.getLastName()));
//        dto.setProject(StringUtils.trim(dto.getProject()));
//        dto.setUsername(StringUtils.trim(dto.getUsername()));
//
//        // check inputted data is valid or not
//        if (StringUtils.isBlank(dto.getFirstName())) {
//            return EmployeeResponse.fail("First name is not valid");
//        }
//        if (StringUtils.isBlank(dto.getLastName())) {
//            return EmployeeResponse.fail("Last name is not valid");
//        }
//        if (StringUtils.isBlank(dto.getProject())) {
//            return EmployeeResponse.fail("Project is not valid");
//        }
//        if (StringUtils.isBlank(dto.getUsername()) || dto.getUsername().contains(" ")) {
//            return EmployeeResponse.fail("Username is not valid");
//        }
//
//        Employee sameUsernameEmployee = employeeRepository.findByUsernameIgnoreCase(dto.getUsername());
//        if (sameUsernameEmployee != null && !sameUsernameEmployee.getIsDeleted()) {
//            return EmployeeResponse.fail("This username already existed");
//        }
//
//        // if have a deleted employee with same username -> replace this employee with new employee which want to create
//        if (sameUsernameEmployee != null) {
//            sameUsernameEmployee.setFirstName(dto.getFirstName());
//            sameUsernameEmployee.setLastName(dto.getLastName());
//            sameUsernameEmployee.setProject(dto.getProject());
//            sameUsernameEmployee.setPassword(encoder.encode(randomPassword()));
//            sameUsernameEmployee.setIsDeleted(false);
//            sameUsernameEmployee.setRoles(new HashSet<>(Collections.singletonList(roleService.getDefaultRole())));
//
//            try {
//                employeeRepository.save(sameUsernameEmployee);
//                return EmployeeResponse.success(sameUsernameEmployee.getId());
//            } catch (Exception e) {
//                LOG.error(e.getMessage());
//                return EmployeeResponse.fail(e.getMessage());
//            }
//        }
//
//        // create new record in employee table
//        Employee newEmployee = new Employee();
//        newEmployee.setFirstName(dto.getFirstName());
//        newEmployee.setLastName(dto.getLastName());
//        newEmployee.setProject(dto.getProject());
//        newEmployee.setUsername(dto.getUsername());
//        newEmployee.setPassword(encoder.encode(randomPassword()));
//        newEmployee.setRoles(new HashSet<>(Collections.singletonList(roleService.getDefaultRole())));
//
//        try {
//            Employee createdEmployee = employeeRepository.save(newEmployee);
//            return EmployeeResponse.success(createdEmployee.getId());
//        } catch (Exception e) {
//            LOG.error(e.getMessage());
//            return EmployeeResponse.fail(e.getMessage());
//        }
//
//    }
//
//    @Transactional
//    public EmployeeResponse updateEmployee(EmployeeDto dto) {
//        // handle input data
//        dto.setFirstName(StringUtils.trim(dto.getFirstName()));
//        dto.setLastName(StringUtils.trim(dto.getLastName()));
//        dto.setProject(StringUtils.trim(dto.getProject()));
//        dto.setUsername(StringUtils.trim(dto.getUsername()));
//
//        // check inputted data is valid or not
//        if (StringUtils.isBlank(dto.getFirstName())) {
//            return EmployeeResponse.fail("First name is not valid");
//        }
//        if (StringUtils.isBlank(dto.getLastName())) {
//            return EmployeeResponse.fail("Last name is not valid");
//        }
//        if (StringUtils.isBlank(dto.getProject())) {
//            return EmployeeResponse.fail("Project is not valid");
//        }
//        if (StringUtils.isBlank(dto.getUsername()) || dto.getUsername().contains(" ")) {
//            return EmployeeResponse.fail("Username is not valid");
//        }
//
//        // check this user is valid: existed/deleted
//        Optional<Employee> employeeOpt = employeeRepository.findById(dto.getId());
//        if (employeeOpt.isEmpty()) {
//            return EmployeeResponse.fail("This employee does not exist");
//        }
//        if (employeeOpt.get().getIsDeleted()) {
//            return EmployeeResponse.fail("This employee already deleted");
//        }
//
//        Employee sameUsernameEmployee = employeeRepository.findByUsernameIgnoreCase(dto.getUsername());
//
//        // check this username is valid or not
//        if (sameUsernameEmployee != null && !sameUsernameEmployee.getId().equals(dto.getId())) {
//            return EmployeeResponse.fail("This username has existed already");
//        }
//
//        // update employee
//        Employee updatedEmp = employeeOpt.get();
//        updatedEmp.setFirstName(dto.getFirstName());
//        updatedEmp.setLastName(dto.getLastName());
//        updatedEmp.setProject(dto.getProject());
//        updatedEmp.setUsername(dto.getUsername());
//
//        try {
//            this.employeeRepository.save(updatedEmp);
//            return EmployeeResponse.success(dto.getId());
//        } catch (Exception e) {
//            LOG.error(e.getMessage());
//            return EmployeeResponse.fail(e.getMessage());
//        }
//
//    }
//
//    public ResponseEntity<Response> deleteEmployee(Long id) {
//        Optional<Employee> employeeOpt = employeeRepository.findById(id);
//        if (employeeOpt.isEmpty()) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Response.badRequest("This employee does not exist"));
//        }
//
//        Employee employee = employeeOpt.get();
//
//        if (employee.getIsDeleted()) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Response.badRequest("This employee is deleted already"));
//        }
//        EmployeeDetailDto employeeRole = employeeRepository.getEmployeeDetailsWithRoleUser(employee.getId(), RoleEnum.ADMIN.name());
//        if (employeeRole != null) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Response.badRequest("Cannot delete employee with role Admin"));
//        }
//
//        List<DeviceEmployee> deviceEmployees = deviceEmployeeRepository.findAllByEmployeeId(employee.getId());
//        if (deviceEmployees.size() != 0) {
//            if (deviceEmployees.stream().anyMatch(deviceEmployee -> deviceEmployee.getReturnedDate() == null)) {
//                return ResponseEntity
//                        .badRequest()
//                        .body(Response.badRequest("This employee cannot be deleted because the device has not been returned"));
//            } else {
//                deviceEmployees.forEach(deviceEmployee -> deviceEmployee.setIsDeleted(true));
//                try {
//                    deviceEmployeeRepository.saveAll(deviceEmployees);
//                } catch (Exception e) {
//                    return ResponseEntity
//                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                            .body(Response.internalError(e.getMessage()));
//                }
//
//            }
//        }
//
//        employee.setIsDeleted(true);
//
//        try {
//
//            this.employeeRepository.save(employee);
//            return ResponseEntity.ok(SuccessfulResponse.DELETED);
//        } catch (Exception e) {
//            return ResponseEntity
//                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Response.internalError(e.getMessage()));
//        }
//    }

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

