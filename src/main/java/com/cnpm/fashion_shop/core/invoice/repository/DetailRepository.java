package com.cnpm.fashion_shop.core.invoice.repository;

import com.cnpm.fashion_shop.entity.InformationProductForEachInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailRepository extends JpaRepository<InformationProductForEachInvoice, Long> {
    @Query(value = "SELECT * FROM info_for_each i WHERE i.id_product = :id  order by i.id DESC limit 1", nativeQuery = true)
    InformationProductForEachInvoice findByIdInfoForEach(@Param("id") Integer id);
}
