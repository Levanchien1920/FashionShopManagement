package com.cnpm.fashion_shop.core.salefigure.service;

import com.cnpm.fashion_shop.api.salefigures.dto.SaleFigureDto;
import com.cnpm.fashion_shop.core.salefigure.repository.SaleFigureRepository;
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
public class SaleFigureService {
    @Autowired
    private SaleFigureRepository saleFigureRepository;
    @Transactional
    public Page<SaleFigureDto> findAllSaleFigureDetails(int size, int page, String sort) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "total_money",
                "month"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return saleFigureRepository.findSaleFigure(pageable);
    }

    @Transactional
    public Page<SaleFigureDto> findAllSaleFigureDetailsByDay(int size, int page, String sort) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "total_money",
                "day"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return saleFigureRepository.findSaleFigureByDay(pageable);
    }
    public Integer getTotalProducts() {
        return this.saleFigureRepository.findAllProductSoldOut();
    }

}
