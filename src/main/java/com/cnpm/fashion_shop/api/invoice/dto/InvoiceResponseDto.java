package com.cnpm.fashion_shop.api.invoice.dto;

public interface InvoiceResponseDto {
    Integer getId();

    String getName_User();

    Long getTotal_Money();

    boolean getIs_paid();

    String getName_Product();

    Integer getNumber_Product();

    String getFullName_Employee();

}
