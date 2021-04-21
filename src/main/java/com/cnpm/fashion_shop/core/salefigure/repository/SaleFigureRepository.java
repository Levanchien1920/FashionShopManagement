package com.cnpm.fashion_shop.core.salefigure.repository;

import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.api.salefigures.dto.SaleFigureDto;
import com.cnpm.fashion_shop.entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleFigureRepository extends JpaRepository<Invoice, Long> {
    @Query(value = "SELECT sum(p.total_money), MONTH(p.updated_at) as Month FROM invoice as p GROUP BY MONTH(p.updated_at)", nativeQuery = true)
    List<SaleFigureDto> findSaleFigure();
}
