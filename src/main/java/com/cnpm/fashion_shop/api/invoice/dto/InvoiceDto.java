package com.cnpm.fashion_shop.api.invoice.dto;
import com.cnpm.fashion_shop.api.product.dto.ProductInCart;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;


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
    public List<ProductInCart> listProducts;

}
