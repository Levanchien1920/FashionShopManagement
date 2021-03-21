package com.cnpm.fashion_shop.core.product.repository;

import com.cnpm.fashion_shop.entity.Image;
import com.cnpm.fashion_shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    @Query(value = "SELECT * FROM image p WHERE p.id = :id ", nativeQuery = true)
    Image findByName_image(@Param("id") Integer id);
}
