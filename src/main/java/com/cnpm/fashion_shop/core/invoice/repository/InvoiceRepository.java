package com.cnpm.fashion_shop.core.invoice.repository;


import com.cnpm.fashion_shop.api.invoice.dto.InvoiceResponseDto;
import com.cnpm.fashion_shop.entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    @Query(value = "SELECT i.id as Id,e.full_name as Name_User, p.number*p.price as Total_Money, i.is_paid as Is_paid, info.number as Number_Product, e.full_name as FullName_Employee, p.name as Name_Product " +
            "FROM invoice i inner join employee e on i.id_employee=e.id " +
            "inner join info_for_each info on info.id_invoice=i.id inner join product p on p.id=info.id_product " +
            "inner join customer c on i.id_user=c.id WHERE LOWER(c.fullname) LIKE %:keyword% AND i.is_deleted = FALSE", nativeQuery = true)
    Page<InvoiceResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);

//    Invoice findByName(String name);
//
    @Query(value = "SELECT * FROM invoice i WHERE i.id = :id AND i.is_deleted = FALSE", nativeQuery = true)
    Optional<Invoice> findById_invoice(@Param("id") Integer id);



//    @Query(value = "SELECT p.id,p.name as Name,p.price,p.number,p.des,b.name as Name_Brand,c.name as Name_Category,g.name as Name_Gender,i.name as Name_Image,i.link " +
//            "FROM product as p inner join brand as b on p.id_brand=b.id " +
//            "inner join category as c on p.id_cate=c.id " +
//            "inner join image as i on p.id_image=i.id " +
//            "inner join gender as g on p.id_gender=g.id WHERE LOWER(b.name) LIKE %:keyword% AND b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
//    Page<ProductResponseDto> findAllByNameBrand(Pageable pageable, @Param("keyword") String keyword, @Param("id") Integer id);
}
