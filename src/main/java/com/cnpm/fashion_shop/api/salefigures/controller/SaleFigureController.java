package com.cnpm.fashion_shop.api.salefigures.controller;

import com.cnpm.fashion_shop.api.salefigures.dto.SaleFigureDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.core.salefigure.service.SaleFigureService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/saleFigure")
public class SaleFigureController {
    @Autowired
    private SaleFigureService saleFigureService;
    @ApiOperation(value = "Get all sales figures", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/ByMonth")
    public PaginationResponse<SaleFigureDto> getSaleFigures(
            RequestParamsForGettingList requestParamsForGettingList
    ) {
        Page<SaleFigureDto> data = saleFigureService
                .findAllSaleFigureDetails(requestParamsForGettingList.getPage(),
                        requestParamsForGettingList.getSize(),
                        requestParamsForGettingList.getSort());

        return new PaginationResponse<>(data);
    }
    @ApiOperation(value = "Get all sales figures", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/ByDay")
    public PaginationResponse<SaleFigureDto> getSaleFiguresByDay(
            RequestParamsForGettingList requestParamsForGettingList
    ) {
        Page<SaleFigureDto> data = saleFigureService
                .findAllSaleFigureDetailsByDay(requestParamsForGettingList.getPage(),
                        requestParamsForGettingList.getSize(),
                        requestParamsForGettingList.getSort());

        return new PaginationResponse<>(data);
    }

    @ApiOperation(value = "Get number of products", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/getTotalProductSold")
    public int getTotalProducts() {
        return saleFigureService.getTotalProducts();
    }
}
