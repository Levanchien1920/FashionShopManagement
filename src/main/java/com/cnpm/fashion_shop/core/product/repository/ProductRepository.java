package com.cnpm.fashion_shop.core.product.repository;

import com.cnpm.fashion_shop.api.product.dto.ProductColor;
import com.cnpm.fashion_shop.api.product.dto.ProductDto;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.api.product.dto.ProductStarResponseDto;
import com.cnpm.fashion_shop.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {//phai tao repository cho moi Entity==>sai ngu mat thoi gian

    @Query(value = "SELECT product.id,product.name,product.price,product.number,product.name_size,product.des,brand.name AS Name_Brand,category.name AS Name_Category,gender.name AS Name_Gender,image.name AS Name_Image,image.link, color.name AS Name_Color \n" +
            "FROM ((((( product\n" +
            "INNER JOIN brand ON product.id_brand = brand.id) \n" +
            "INNER JOIN category ON product.id_cate = category.id)\n" +
            "INNER JOIN image ON product.id_image = image.id) \n" +
            "INNER JOIN gender ON product.id_gender = gender.id)  \n" +
            "INNER JOIN color ON product.id_color = color.id)  \n" +
            "WHERE LOWER(product.name) LIKE %:keyword% AND product.is_deleted= false AND image.is_deleted = false AND brand.is_deleted = false AND category.is_deleted = false AND color.is_deleted = false", nativeQuery = true)
    Page<ProductResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);

    @Query(value = "SELECT product.id,product.name,product.price,product.number,product.name_size,product.des,brand.name AS Name_Brand,category.name AS Name_Category,gender.name AS Name_Gender,image.name AS Name_Image,image.link, color.name AS Name_Color\n" +
            "FROM ((((( product\n" +
            "INNER JOIN brand ON product.id_brand = brand.id) \n" +
            "INNER JOIN category ON product.id_cate = category.id)\n" +
            "INNER JOIN image ON product.id_image = image.id) \n" +
            "INNER JOIN gender ON product.id_gender = gender.id)  \n" +
            "INNER JOIN color ON product.id_color = color.id)  \n" +
            "WHERE LOWER(product.name) LIKE %:keyword% AND product.is_deleted= false AND image.is_deleted = false AND brand.is_deleted = false AND category.is_deleted = false AND color.is_deleted = false", nativeQuery = true)
    List<ProductResponseDto> findAllByName(@Param("keyword") String keyword);

    @Query(value = "SELECT * FROM product p WHERE p.id = :id AND p.is_deleted = FALSE", nativeQuery = true)
    Optional<Product> findById(@Param("id") Integer id);

    @Query(value = "SELECT * FROM product p WHERE p.id = :id AND p.is_deleted = FALSE", nativeQuery = true)
    Product getOne_pro(@Param("id") Integer id);

    @Query(value = "SELECT p.id_color as Id_Color, p.number as Number FROM product p WHERE p.name = :name AND p.is_deleted = FALSE AND p.name_size='XXL' ", nativeQuery = true)
    List<ProductColor> getAllIdColorForXXL(@Param("name") String name);


    @Query(value = "SELECT p.id_color as Id_Color, p.number as Number FROM product p WHERE p.name = :name AND p.is_deleted = FALSE AND p.name_size='XL' ", nativeQuery = true)
    List<ProductColor> getAllIdColorForXL(@Param("name") String name);

    @Query(value = "SELECT p.id_color as Id_Color, p.number as Number FROM product p WHERE p.name = :name AND p.is_deleted = FALSE AND p.name_size='L' ", nativeQuery = true)
    List<ProductColor> getAllIdColorForL(@Param("name") String name);

    @Query(value = "SELECT p.id_color as Id_Color, p.number as Number FROM product p WHERE p.name = :name AND p.is_deleted = FALSE AND p.name_size='M' ", nativeQuery = true)
    List<ProductColor> getAllIdColorForM(@Param("name") String name);


    @Query(value = "SELECT  p.id,p.name as Name,p.price,p.number,p.des,b.name as Name_Brand,c.name as Name_Category,g.name as Name_Gender,i.name as Name_Image,i.link " +
            "FROM ((((product p\n" +
            "INNER JOIN brand AS b ON p.id_brand=b.id)\n " +
            "INNER JOIN category AS c ON p.id_cate=c.id) \n " +
            "INNER JOIN image AS i ON p.id_image=i.id)\n " +
            "INNER JOIN gender AS g ON p.id_gender=g.id)\n " +
            "WHERE p.id_brand=:id_brand AND p.id_cate=:id_category AND p.id_gender=:id_gender AND p.id <> :id AND LOWER(p.name) LIKE %:keyword% AND p.is_deleted =false ", nativeQuery = true)
    Page<ProductResponseDto> findAllRelate(Pageable pageable, @Param("keyword") String keyword, @Param("id") Integer id, @Param("id_brand") Integer id_brand, @Param("id_category") Integer id_category, @Param("id_gender") Integer id_gender);

    @Query(value = "SELECT product.id,product.name as Name,product.price,product.number,product.des,brand.name as Name_Brand,category.name as Name_Category,gender.name as Name_Gender,image.name as Name_Image,image.link \n" +
            "FROM ((((product \n" +
            "INNER JOIN brand on product.id_brand = brand.id) \n" +
            "INNER JOIN category on product.id_cate = category.id) \n" +
            "INNER JOIN image on product.id_image = image.id) \n" +
            "INNER JOIN gender on product.id_gender = gender.id )\n"+
            "where product.is_deleted = false", nativeQuery = true)
    Page<ProductResponseDto> findProducts(Pageable pageable, @Param("keyword") String keyword);

    @Query(value = "select * from (SELECT product.id,product.name as Name,product.number as number,review.number_of_star as numberOfStar, product.price, product.name_size, color.name as NameColor,sum(info.number) as Sold_Out,product.des,brand.name as Name_Brand,category.name as Name_Category,gender.name as Name_Gender,image.name as Name_Image,image.link , color.name as name_Color\n" +
            "FROM (((((((product \n" +
            "INNER JOIN brand on product.id_brand = brand.id) \n" +
            "INNER JOIN category on product.id_cate = category.id) \n" +
            "INNER JOIN image on product.id_image = image.id) \n" +
            "INNER JOIN gender on product.id_gender = gender.id )\n"+
            "INNER JOIN info_for_each as info on info.id_product = product.id )\n"+
            "INNER JOIN color on color.id = product.id_color )\n"+
            "INNER JOIN review on product.id = review.id_product )\n"+
            "Where product.is_deleted = false AND brand.is_deleted = false AND category.is_deleted = false AND image.is_deleted = false  GROUP By product.id Order by sum(info.number) DESC limit 4) as c1", nativeQuery = true)
    Page<ProductResponseDto> findBestProducts(Pageable pageable, @Param("keyword") String keyword);


    @Query(value = "SELECT product.id,avg(review.number_of_star) as numberOfStar\n" +
            "FROM (product \n" +
            "INNER JOIN review on product.id = review.id_product )\n"+
            "Where product.is_deleted = false and review.is_deleted =false group by review.id_product", nativeQuery = true)
    Page<ProductStarResponseDto> findNumberOfStarForProducts(Pageable pageable);
}
