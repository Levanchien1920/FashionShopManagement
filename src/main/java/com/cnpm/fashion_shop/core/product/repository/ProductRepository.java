package com.cnpm.fashion_shop.core.product.repository;

import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {//phai tao repository cho moi Entity==>sai ngu mat thoi gian

    @Query(value = "SELECT p.id,p.name as Name,p.price,p.number,p.des,b.name as Name_Brand,c.name as Name_Category,g.name as Name_Gender,i.name as Name_Image,i.link " +
            "FROM product as p inner join brand as b on p.id_brand=b.id " +
            "inner join category as c on p.id_cate=c.id " +
            "inner join image as i on p.id_image=i.id " +
            "inner join gender as g on p.id_gender=g.id", nativeQuery = true)
    Page<ProductResponseDto> findAll(Pageable pageable, @Param("keyword") String keyword);

    Product findByName(String name);

    @Query(value = "SELECT * FROM product p WHERE p.id = :id AND p.is_deleted = FALSE", nativeQuery = true)
    Optional<Product> findById(@Param("id") Integer id);

    @Query(value = "SELECT * FROM product p WHERE p.id = :id AND p.is_deleted = FALSE", nativeQuery = true)
    Product getOne_pro(@Param("id") Integer id);

//    @Query(value = "SELECT p.name FROM gender p WHERE p.id = :id ", nativeQuery = true)
//    Gender findById_gender(@Param("id") Integer id);

//    @Query(value = "SELECT * FROM image p WHERE p.id = :id ", nativeQuery = true)
//    Image findById_image(@Param("id") Integer id);
//
//    @Query(value = "SELECT * FROM image p WHERE p.id = :id ", nativeQuery = true)
//    Image findByName_image(@Param("id") Integer id);


    @Query(value = "SELECT p.id,p.name as Name,p.price,p.number,p.des,b.name as Name_Brand,c.name as Name_Category,g.name as Name_Gender,i.name as Name_Image,i.link " +
            "FROM product as p inner join brand as b on p.id_brand=b.id " +
            "inner join category as c on p.id_cate=c.id " +
            "inner join image as i on p.id_image=i.id " +
            "inner join gender as g on p.id_gender=g.id Where p.id_brand=:id_brand and p.id_cate=:id_category and p.id_gender=:id_gender and p.id <> :id and LOWER(p.name) LIKE %:keyword%", nativeQuery = true)
    Page<ProductResponseDto> findAllRelate(Pageable pageable, @Param("keyword") String keyword,@Param("id") Integer id, @Param("id_brand") Integer id_brand, @Param("id_category") Integer id_category, @Param("id_gender") Integer id_gender);
}
