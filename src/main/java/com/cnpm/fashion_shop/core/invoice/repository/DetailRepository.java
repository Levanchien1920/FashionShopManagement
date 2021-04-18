package com.cnpm.fashion_shop.core.invoice.repository;

import com.cnpm.fashion_shop.entity.InformationProductForEachInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailRepository extends JpaRepository<InformationProductForEachInvoice, Long> {

}
