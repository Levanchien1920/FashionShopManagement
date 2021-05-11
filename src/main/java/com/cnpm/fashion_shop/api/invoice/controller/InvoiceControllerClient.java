package com.cnpm.fashion_shop.api.invoice.controller;


import com.cnpm.fashion_shop.api.invoice.dto.InvoiceCustomerDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceCustomerResponseDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.invoice.service.InvoiceService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/client/invoice")
public class InvoiceControllerClient {
    @Autowired
    private InvoiceService invoiceService;

    @ApiOperation(value = "Create invoice", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createInvoiceDto(
            @Valid @RequestBody InvoiceDto dto
    ) {
        return invoiceService.createInvoiceDto(dto);
    }



    @ApiOperation(value = "Get invoice by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/{id_customer}")
    public List<InvoiceCustomerResponseDto> getOneInvoiceByIdCustomer(RequestParamsForGettingList requestParamsForGettingList, @PathVariable("id_customer") Integer id) {
        List<InvoiceCustomerResponseDto> data = invoiceService.getOneByIdCustomer(
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch(), id);

        return data;
    }
    @ApiOperation(value = "Get all invoices with id and status", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/ByCustomer/status")
    public PaginationResponse<InvoiceCustomerDto> getInvoiceStatusByCustomer(RequestParamsForGettingList requestParamsForGettingList) {
        Page<InvoiceCustomerDto> data = invoiceService.findAllInvoiceIdAndStatusByCustomer(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }
}
