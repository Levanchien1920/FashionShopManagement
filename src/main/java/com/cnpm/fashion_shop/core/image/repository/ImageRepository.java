package com.cnpm.fashion_shop.core.image.repository;

import com.cnpm.fashion_shop.api.image.dto.ImageResponseDto;
import com.cnpm.fashion_shop.entity.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    @Query(value = "SELECT * FROM image i WHERE LOWER(i.name) LIKE %:keyword% AND i.is_deleted = FALSE", nativeQuery = true)
    Page<ImageResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);

    Image findByName(String name);

    @Query(value = "SELECT * FROM image b WHERE b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
    Optional<Image> findByIdImage(@Param("id") Integer id);

    @Query(value = "SELECT * FROM image b WHERE b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
    Image findById(@Param("id") Integer id);

}
