package com.cnpm.fashion_shop.core.product.repository;

import com.cnpm.fashion_shop.entity.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GenderRepository extends JpaRepository<Gender, Long> {
    @Query(value = "SELECT * FROM gender p WHERE p.id = :id ", nativeQuery = true)
    Gender findById_gender(@Param("id") Integer id);
}
