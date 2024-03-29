package com.cnpm.fashion_shop.core.product.repository;

import com.cnpm.fashion_shop.api.color.dto.ColorDto;
import com.cnpm.fashion_shop.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ColorProductRepository extends JpaRepository<Color, Long> {
    @Query(value = "SELECT c.name as Name_Color FROM color c WHERE c.id =:id", nativeQuery = true)
    ColorDto findNameByIdColor(@Param("id") Integer id);

    Optional<Color> findById(Integer integer);


}
