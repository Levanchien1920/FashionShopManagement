package com.cnpm.fashion_shop.core.salefigure.service;

import com.cnpm.fashion_shop.api.salefigures.dto.SaleFigureDto;
import com.cnpm.fashion_shop.core.salefigure.repository.SaleFigureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SaleFigureService {
    @Autowired
    private SaleFigureRepository saleFigureRepository;

//    public ResponseEntity get() {
//        //List<SaleFigureDto> saleFigureDtos = saleFigureRepository.findSaleFigure();
//
//        return ResponseEntity.ok(new SaleFigureDto(saleFigureDto.getTotal(),saleFigureDto.getMonth()));
//    }
}
