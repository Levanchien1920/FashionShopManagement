package com.cnpm.fashion_shop.core.customer.repository;

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
public interface  CustomerRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM user b WHERE LOWER(b.full_name) LIKE %:keyword% AND b.is_deleted = FALSE AND b.id_role = 3", nativeQuery = true)
    Page<UserResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);

    User findByEmail(String email);
    User findByUsername(String username);

    @Query(value = "SELECT * FROM customer b WHERE b.id = :id AND b.is_deleted = FALSE AND b.id_role =3", nativeQuery = true)
    Optional<User> findById_customer(@Param("id") Integer id);
}
