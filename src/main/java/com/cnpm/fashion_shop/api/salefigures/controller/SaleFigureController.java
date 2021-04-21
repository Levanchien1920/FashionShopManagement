package com.cnpm.fashion_shop.api.salefigures.controller;

import com.cnpm.fashion_shop.core.salefigure.service.SaleFigureService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/salefigure")
public class SaleFigureController {
    @Autowired
    private SaleFigureService saleFigureService;

    @ApiOperation(value = "Get all salefigure")
    @GetMapping()
    public ResponseEntity getSaleFigure() {
        return saleFigureService.get();
    }
}
