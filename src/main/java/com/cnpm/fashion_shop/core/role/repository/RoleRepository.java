package com.cnpm.fashion_shop.core.role.repository;

import com.cnpm.fashion_shop.api.role.dto.RoleResponseDto;
import com.cnpm.fashion_shop.api.user.dto.UserResponseDto;
import com.cnpm.fashion_shop.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query(value = "SELECT * FROM role b WHERE LOWER(b.name) LIKE %:keyword% AND b.is_deleted = FALSE", nativeQuery = true)
    Page<RoleResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);

    Role findByName(String name);

    @Query(value = "SELECT * FROM role b WHERE b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
    Optional<Role> findById(@Param("id") Integer id);

    @Query(value = "SELECT p.id, p.username as Username, p.full_name as FullName, p.address as Address, p.phone_number as PhoneNumber\n" +
            "FROM user as p\n " +
            "inner join role as b on p.id_role=b.id " +
            "WHERE  b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
    Page<UserResponseDto> findAllByNameRole(Pageable pageable, @Param("id") Integer id);
}
