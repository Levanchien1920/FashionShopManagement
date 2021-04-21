package com.cnpm.fashion_shop.api.salefigures.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


public class SaleFigureDto {
    @Getter
    @Setter
    private Long total;

    @Getter
    @Setter
    private Integer month;

    public SaleFigureDto(Long total, Integer month) {
        this.total = total;
        this.month = month;
    }
}
