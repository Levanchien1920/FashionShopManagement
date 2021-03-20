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

    @Query(value = "SELECT p.id,p.name as Name,p.price,p.number,p.des,b.name as Name_Brand,c.name as Name_Category,g.name as Name_Gender,i.name as Name_Image,i.link " +
            "FROM product as p inner join brand as b on p.id_brand=b.id " +
            "inner join category as c on p.id_cate=c.id " +
            "inner join image as i on p.id_image=i.id " +
            "inner join gender as g on p.id_gender=g.id", nativeQuery = true)
    Page<ProductResponseDto> findAll(Pageable pageable, @Param("keyword") String keyword);

    Product findByName(String name);

    @Query(value = "SELECT * FROM product b WHERE b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
    Optional<Product> findById(@Param("id") Integer id);
}
