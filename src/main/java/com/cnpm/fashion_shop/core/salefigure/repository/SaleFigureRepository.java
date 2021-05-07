package com.cnpm.fashion_shop.core.salefigure.repository;

import com.cnpm.fashion_shop.api.salefigures.dto.SaleFigureDto;
import com.cnpm.fashion_shop.entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleFigureRepository extends JpaRepository<Invoice, Long> {
    @Query(value = "SELECT sum(p.total_money) AS total, MONTH(p.updated_at) AS Month FROM invoice AS p WHERE p.is_deleted = false GROUP BY MONTH(p.updated_at)", nativeQuery = true)
    Page<SaleFigureDto> findSaleFigure(Pageable pageable);

    @Query(value = "SELECT sum(p.total_money) AS total, p.updated_at AS Day FROM invoice AS p WHERE p.is_deleted = false GROUP BY DAY(p.updated_at)", nativeQuery = true)
    Page<SaleFigureDto> findSaleFigureByDay(Pageable pageable);

}
