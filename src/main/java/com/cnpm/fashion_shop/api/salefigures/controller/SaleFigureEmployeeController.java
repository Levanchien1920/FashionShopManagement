package com.cnpm.fashion_shop.api.salefigures.controller;

import com.cnpm.fashion_shop.api.salefigures.dto.SaleFigureEmployeeDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.core.salefigure.service.SaleFigureEmployeeService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/saleFigureEmployee")
public class SaleFigureEmployeeController {
    @Autowired
    private SaleFigureEmployeeService saleFigureEmployeeService;
    @ApiOperation(value = "Get all sales figures by employee", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping
    public PaginationResponse<SaleFigureEmployeeDto> getSaleFigureEmployee(
            RequestParamsForGettingList requestParamsForGettingList
    ) {
        Page<SaleFigureEmployeeDto> data = saleFigureEmployeeService
                .findAllSaleFigureByEmployee(requestParamsForGettingList.getPage(),
                        requestParamsForGettingList.getSize(),
                        requestParamsForGettingList.getSort());

        return new PaginationResponse<>(data);
    }

}
