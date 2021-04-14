package com.cnpm.fashion_shop.api.invoice.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@NoArgsConstructor
public class InvoiceDto {
    @Getter
    @Setter
    private Integer id;

    @Getter
    @Setter
    private Integer id_user;

    @Getter
    @Setter
    private Integer id_employee;

    @Getter
    @Setter
    @NotNull
    private Long totalMoney;

    @Getter
    @Setter
    private boolean is_paid;

    @Getter
    @Setter
    private Integer id_product;

    @Getter
    @Setter
    private Integer number;

    @Getter
    @Setter
    private boolean is_paid;


}
