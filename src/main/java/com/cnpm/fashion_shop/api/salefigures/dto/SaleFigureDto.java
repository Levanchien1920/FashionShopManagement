package com.cnpm.fashion_shop.api.salefigures.dto;


import java.sql.Timestamp;

public interface SaleFigureDto {

    Long getTotal();

    Integer getMonth();

    Timestamp getDay();

}
