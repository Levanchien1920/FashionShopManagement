package com.cnpm.fashion_shop.core.color.repository;

import com.cnpm.fashion_shop.api.color.dto.ColorResponse;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.entity.Brand;
import com.cnpm.fashion_shop.entity.Color;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {
    @Query(value = "SELECT * FROM color b WHERE LOWER(b.name) LIKE %:keyword% AND b.is_deleted = FALSE", nativeQuery = true)
    Page<ColorResponse> findAllByName(Pageable pageable, @Param("keyword") String keyword);

    Color findByName(String name);

    @Query(value = "SELECT * FROM color b WHERE b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
    Optional<Color> findById_Color(@Param("id") Integer id);


    @Query(value = "SELECT p.id,p.name as Name,p.price,p.number,p.des,b.name as Name_Brand,c.name as Name_Category,g.name as Name_Gender,i.name as Name_Image,i.link " +
            "FROM product as p inner join color as b on p.id_color=b.id " +
            "inner join category as c on p.id_cate=c.id " +
            "inner join image as i on p.id_image=i.id " +
            "inner join gender as g on p.id_gender=g.id WHERE LOWER(b.name) LIKE %:keyword% AND b.id = :id AND b.is_deleted = FALSE AND p.is_deleted = FALSE", nativeQuery = true)
    Page<ProductResponseDto> findAllByNameColor(Pageable pageable, @Param("keyword") String keyword,@Param("id") Integer id);
}
