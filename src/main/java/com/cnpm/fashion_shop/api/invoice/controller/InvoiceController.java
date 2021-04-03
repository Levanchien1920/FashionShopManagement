package com.cnpm.fashion_shop.api.invoice.controller;

import com.cnpm.fashion_shop.api.invoice.dto.InvoiceDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.core.invoice.service.InvoiceService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cnpm.fashion_shop.common.response.Response;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/invoice")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @ApiOperation(value = "Get all invoices", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping
    public PaginationResponse<InvoiceResponseDto> getInvoice(RequestParamsForGettingList requestParamsForGettingList) {
        Page<InvoiceResponseDto> data = invoiceService.findAllInvoiceDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }


//    xac nhan thanh toan cho khach hang
    @ApiOperation(value = "Create invoice")
    @PostMapping
    public ResponseEntity<Response> createInvoiceDto(
            @Valid @RequestBody InvoiceDto dto
    ) {
        return invoiceService.createInvoiceDto(dto);
    }
//thay doi trang thai cua hoa don ( da van chuyen, chua van chuyen)
    @ApiOperation(value = "Update Invoice", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{id_invoice}")
    public ResponseEntity<Response> updateInvoice(
            @PathVariable("id_invoice") Integer id,
            @Valid @RequestBody InvoiceDto dto
    ) {
        return this.invoiceService.updateInvoiceDto(id, dto);
    }

    @ApiOperation(value = "Delete Invoice", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{id_invoice}")
    public ResponseEntity<Response> deleteInvoice(@PathVariable("id_invoice") Integer id) {
        return this.invoiceService.deleteInvoiceDto(id);
    }

////    @ApiOperation(value = "Get brand by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
////    @GetMapping("/{id_brand}")
////    public ResponseEntity getOneBrand(@PathVariable("id_brand") Integer id) {
////        return brandService.getOne(id);
////    }
}
