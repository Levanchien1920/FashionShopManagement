package com.cnpm.fashion_shop.api.invoice.dto;

public interface InvoiceCustomerResponseDto {
    Integer getId();

    Long getTotal_Money();

    String getName_Customer();

    boolean getIs_paid();

    String getName_Product();

    Integer getPrice();

    Integer getNumber_Product();

    String getLinkImage();

}
