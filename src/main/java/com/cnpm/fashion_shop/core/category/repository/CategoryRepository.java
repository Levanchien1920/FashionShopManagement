package com.cnpm.fashion_shop.core.category.repository;

import com.cnpm.fashion_shop.api.brand.dto.BrandResponseDto;
import com.cnpm.fashion_shop.api.category.dto.CategoryResponseDto;
import com.cnpm.fashion_shop.entity.Brand;
import com.cnpm.fashion_shop.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "SELECT * FROM category b WHERE LOWER(b.name) LIKE %:keyword% AND b.is_deleted = FALSE", nativeQuery = true)
    Page<CategoryResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);

    Category findByName(String name);

    @Query(value = "SELECT * FROM category b WHERE b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
    Optional<Category> findById(@Param("id") Integer id);
}

