package com.cnpm.fashion_shop.core.product.repository;

import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.entity.Brand;
import com.cnpm.fashion_shop.entity.Product;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM product b WHERE LOWER(b.name) LIKE %:keyword% AND b.is_deleted = FALSE", nativeQuery = true)
    Page<ProductResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);

    Product findByName(String name);

    @Query(value = "SELECT * FROM product b WHERE b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
    Optional<Product> findById(@Param("id") Integer id);
}
