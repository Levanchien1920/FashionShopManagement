package com.cnpm.fashion_shop.core.employee.repository;

import com.cnpm.fashion_shop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

//    String GET_EMP_WITH_ROLE_USER="SELECT  e.id as id,\n" +
//            "r.name as name\n" +
//            "FROM employees e  \n" +
//            "INNER JOIN employees_roles er\n" +
//            "ON er.employee_id = e.id \n" +
//            "INNER JOIN roles r\n" +
//            "ON r.id= er.role_id\n" +
//            "WHERE e.id = :id AND e.is_deleted= FALSE AND name LIKE %:keyword%\n" +
//            "GROUP BY e.id, r.name";

    Employee findByUsername(String username);

    Employee findByUsernameIgnoreCase(String username);

//    @Query(nativeQuery = true, value = GET_EMP_WITH_ROLE_USER)
//    EmployeeDetailDto getEmployeeDetailsWithRoleUser(@Param("id") Long employeeId, @Param("keyword") String role_name);

}