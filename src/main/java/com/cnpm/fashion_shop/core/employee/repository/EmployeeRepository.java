package com.cnpm.fashion_shop.core.employee.repository;

import com.cnpm.fashion_shop.api.customer.dto.CustomerResponseDto;
import com.cnpm.fashion_shop.api.employee.dto.EmployeeDetailDto;
import com.cnpm.fashion_shop.api.employee.dto.EmployeeResponseDto;
import com.cnpm.fashion_shop.common.response.EmployeeResponse;
import com.cnpm.fashion_shop.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    String GET_EMP_WITH_ROLE_USER = "SELECT  e.id as id,\n" +
            "r.name as name\n" +
            "FROM employees e  \n" +
            "INNER JOIN employees_roles er\n" +
            "ON er.employee_id = e.id \n" +
            "INNER JOIN roles r\n" +
            "ON r.id= er.role_id\n" +
            "WHERE e.id = :id AND e.is_deleted= FALSE AND name LIKE %:keyword%\n" +
            "GROUP BY e.id, r.name";

    Employee findByUsername(String username);

    @Query(value = "SELECT * FROM employee e WHERE e.id = :id AND e.is_deleted = FALSE", nativeQuery = true)
    Optional<Employee> findById(@Param("id") Integer id);

    Employee findByUsernameIgnoreCase(String username);

    @Query(nativeQuery = true, value = GET_EMP_WITH_ROLE_USER)
    EmployeeDetailDto getEmployeeDetailsWithRoleUser(@Param("id") Integer employeeId, @Param("keyword") String role_name);

    @Query(value = "SELECT * FROM employee e WHERE LOWER(e.username) LIKE %:keyword% AND e.is_deleted = FALSE", nativeQuery = true)
    Page<EmployeeResponseDto> findAllByUsername(Pageable pageable, @Param("keyword") String keyword);
}