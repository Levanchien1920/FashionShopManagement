package com.cnpm.fashion_shop.api.invoice.dto;

public interface InvoiceEmployeeResponseDto {
    Integer getId();

    Long getTotal_Money();

    String getFullName_Employee();

    boolean getIs_paid();

    String getName_Product();

    Integer getNumber_Product();

    String getNameSize();

    String getNameColor();

    String getLinkImage();


}
