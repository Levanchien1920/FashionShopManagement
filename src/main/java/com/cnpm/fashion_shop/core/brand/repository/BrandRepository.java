package com.cnpm.fashion_shop.core.brand.repository;

import com.cnpm.fashion_shop.api.brand.dto.BrandResponseDto;
import com.cnpm.fashion_shop.entity.Brand;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    @Query(value = "SELECT * FROM brand b WHERE LOWER(b.name) LIKE %:keyword% AND b.is_deleted = FALSE", nativeQuery = true)
    Page<BrandResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);
    Brand findByName(String name);
    @Query(value = "SELECT * FROM brand b WHERE b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
    Optional<Brand> findById_brand(@Param("id") Integer id);
}
