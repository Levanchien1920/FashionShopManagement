package com.cnpm.fashion_shop.core.salefigure.service;

import com.cnpm.fashion_shop.api.salefigures.dto.SaleFigureEmployeeDto;
import com.cnpm.fashion_shop.core.salefigure.repository.SaleFigureEmployeeRepository;
import com.cnpm.fashion_shop.util.filterUtil.Implements.OrderFilterHelperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class SaleFigureEmployeeService {
    @Autowired
    private SaleFigureEmployeeRepository saleFigureEmployeeRepository;

    @Transactional
    public Page<SaleFigureEmployeeDto> findAllSaleFigureByEmployee(int size, int page, String sort) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "fullName",
                "total_money",
                "month"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return saleFigureEmployeeRepository.findSaleFigureEmployee(pageable);
    }

}
