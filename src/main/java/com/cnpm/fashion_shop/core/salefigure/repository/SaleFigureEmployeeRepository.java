package com.cnpm.fashion_shop.core.salefigure.repository;

import com.cnpm.fashion_shop.api.salefigures.dto.SaleFigureEmployeeDto;
import com.cnpm.fashion_shop.entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleFigureEmployeeRepository extends JpaRepository<Invoice, Long> {

    @Query(value = "SELECT i.id_employee AS id, e.full_name AS fullName ,sum(total_money) AS total, MONTH(i.updated_at) AS month FROM invoice i JOIN employee e ON i.id_employee = e.id GROUP BY i.id_employee", nativeQuery = true)
    Page<SaleFigureEmployeeDto> findSaleFigureEmployee(Pageable pageable);
}
