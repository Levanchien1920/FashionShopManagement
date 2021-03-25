package com.cnpm.fashion_shop.core.customer.repository;

import com.cnpm.fashion_shop.api.customer.dto.CustomerResponseDto;
import com.cnpm.fashion_shop.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface  CustomerRepository extends JpaRepository<Customer, Long> {
    @Query(value = "SELECT * FROM customer b WHERE LOWER(b.fullname) LIKE %:keyword% AND b.is_deleted = FALSE", nativeQuery = true)
    Page<CustomerResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);

    Customer findByEmail(String email);

    @Query(value = "SELECT * FROM customer b WHERE b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
    Optional<Customer> findById_customer(@Param("id") Integer id);
//
//
//    @Query(value = "SELECT p.id,p.name as Name,p.price,p.number,p.des,b.name as Name_Brand,c.name as Name_Category,g.name as Name_Gender,i.name as Name_Image,i.link " +
//            "FROM product as p inner join brand as b on p.id_brand=b.id " +
//            "inner join category as c on p.id_cate=c.id " +
//            "inner join image as i on p.id_image=i.id " +
//            "inner join gender as g on p.id_gender=g.id WHERE LOWER(b.name) LIKE %:keyword% AND b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
//    Page<CustomerResponseDto> findAllByNameBrand(Pageable pageable, @Param("keyword") String keyword, @Param("id") Integer id);
}
