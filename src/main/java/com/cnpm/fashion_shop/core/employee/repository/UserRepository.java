package com.cnpm.fashion_shop.core.employee.repository;

import com.cnpm.fashion_shop.api.user.dto.UserDetailDto;
import com.cnpm.fashion_shop.api.user.dto.UserResponseDto;
import com.cnpm.fashion_shop.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    String GET_EMP_WITH_ROLE_USER = "SELECT  e.id as id,\n" +
            "r.name as name\n" +
            "FROM user e  \n" +
            "INNER JOIN users_roles er\n" +
            "ON er.id_user = e.id \n" +
            "INNER JOIN role r\n" +
            "ON r.id= er.id_role\n" +
            "WHERE e.id = :id AND e.is_deleted= FALSE AND name LIKE %:keyword%\n" +
            "GROUP BY e.id, r.name";

    User findByUsername(String username);

    @Query(value = "SELECT * FROM user e WHERE e.id = :id AND e.is_deleted = FALSE", nativeQuery = true)
    Optional<User> findById(@Param("id") Integer id);

    @Query(value = "SELECT * FROM user e WHERE e.id = :id AND e.is_deleted = FALSE AND e.id_role=2", nativeQuery = true)
    Optional<User> findByIdEmployee(@Param("id") Integer id);

    User findByUsernameIgnoreCase(String username);

    @Query(nativeQuery = true, value = GET_EMP_WITH_ROLE_USER)
    UserDetailDto getUserDetailsWithRoleUser(@Param("id") Integer employeeId, @Param("keyword") String role_name);

    @Query(value = "SELECT e.id as id, e.username as UserName, e.address as address, e.full_name as fullName, e.phone_number as phoneNumber, e.email as email FROM user e WHERE LOWER(e.username) LIKE %:keyword% AND e.is_deleted = FALSE AND e.id_role =2 ", nativeQuery = true)
    Page<UserResponseDto> findAllByUsername(Pageable pageable, @Param("keyword") String keyword);
}