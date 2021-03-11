package com.cnpm.fashion_shop.core.product.repository;
import com.cnpm.fashion_shop.api.brand.dto.BrandResponseDto;
import com.cnpm.fashion_shop.entity.Brand;
import com.cnpm.fashion_shop.entity.Product;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

//    @Query(value = "SELECT * FROM brands b WHERE LOWER(b.name) LIKE %:keyword% AND b.is_deleted = FALSE", nativeQuery = true)
//    Page<BrandResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);
//    Brand findByName(String name);
}
