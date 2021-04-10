package com.cnpm.fashion_shop.core.product.repository;

import com.cnpm.fashion_shop.api.size.dto.SizeDto;
import com.cnpm.fashion_shop.entity.Image;
import com.cnpm.fashion_shop.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {
//    @Query(value = "SELECT s.name FROM size s WHERE s.id_product = :id ", nativeQuery = true)
//    List<SizeDto> findNameById(@Param("id") Integer id);

    @Query(value = "SELECT s.name FROM size s WHERE s.id_product = :id ", nativeQuery = true)
    SizeDto findSizeById_product(@Param("id") Integer id);


}
