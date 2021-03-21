package com.cnpm.fashion_shop.core.invoice.repository;


import com.cnpm.fashion_shop.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
//    @Query(value = "SELECT * FROM brand b WHERE LOWER(b.name) LIKE %:keyword% AND b.is_deleted = FALSE", nativeQuery = true)
//    Page<InvoiceResponseDto> findAllByName(Pageable pageable, @Param("keyword") String keyword);
//
//    Invoice findByName(String name);
//
//    @Query(value = "SELECT * FROM brand b WHERE b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
//    Optional<Invoice> findById_invoice(@Param("id") Integer id);



    //fyfyfyfy   @Query(value = "SELECT p.id,p.name as Name,p.price,p.number,p.des,b.name as Name_Brand,c.name as Name_Category,g.name as Name_Gender,i.name as Name_Image,i.link " +
//            "FROM product as p inner join brand as b on p.id_brand=b.id " +
//            "inner join category as c on p.id_cate=c.id " +
//            "inner join image as i on p.id_image=i.id " +
//            "inner join gender as g on p.id_gender=g.id WHERE LOWER(b.name) LIKE %:keyword% AND b.id = :id AND b.is_deleted = FALSE", nativeQuery = true)
//    Page<ProductResponseDto> findAllByNameBrand(Pageable pageable, @Param("keyword") String keyword, @Param("id") Integer id);
}
