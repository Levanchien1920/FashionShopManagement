package com.cnpm.fashion_shop.core.customer.repository;

import com.cnpm.fashion_shop.api.customer.dto.CustomerResponseDto;
import com.cnpm.fashion_shop.entity.Customer;
import com.cnpm.fashion_shop.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface  CustomerRepository extends JpaRepository<Customer, Long> {
    @Query(value = "SELECT * FROM customer b WHERE LOWER(b.fullname) LIKE %:keyword% AND b.is_deleted = FALSE", nativeQuery = true)
    Page<CustomerResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);

    Customer findByEmail(String email);
    Customer findByUsername(String username);

    @Query(value = "SELECT * FROM customer b WHERE b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
    Optional<Customer> findById_customer(@Param("id") Integer id);
}
