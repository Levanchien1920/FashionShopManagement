package com.cnpm.fashion_shop.api.invoice.controller;

import com.cnpm.fashion_shop.api.invoice.dto.InvoiceCustomerResponseDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceEmployeeDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceEmployeeResponseDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceCustomerDto;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/invoice")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @ApiOperation(value = "Get all invoices", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/ByCustomer")
    public PaginationResponse<InvoiceCustomerResponseDto> getInvoiceByCustomer(RequestParamsForGettingList requestParamsForGettingList) {
        Page<InvoiceCustomerResponseDto> data = invoiceService.findAllInvoiceDetailsByCustomer(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
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

    @ApiOperation(value = "Get all invoices with id and status", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/ByEmployee/status")
    public PaginationResponse<InvoiceEmployeeDto> getInvoiceStatusByEmployee(RequestParamsForGettingList requestParamsForGettingList) {
        Page<InvoiceEmployeeDto> data = invoiceService.findAllInvoiceIdAndStatusByEmployee(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }


    @ApiOperation(value = "Get all invoices", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/ByCustomer/all")
    public List<InvoiceCustomerResponseDto> getInvoiceByCustomerWithoutPage(RequestParamsForGettingList requestParamsForGettingList) {
        List<InvoiceCustomerResponseDto> data = invoiceService.findAllInvoiceDetailsByCustomer(
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return data;
    }
    @GetMapping("/ByEmployee")
    public PaginationResponse<InvoiceEmployeeResponseDto> getInvoiceByEmployee(RequestParamsForGettingList requestParamsForGettingList) {
        Page<InvoiceEmployeeResponseDto> data = invoiceService.findAllInvoiceDetailsByEmployee(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return new PaginationResponse<>(data);
    }

    @GetMapping("/ByEmployee/all")
    public List<InvoiceEmployeeResponseDto> getInvoiceByEmployeeWithoutPage(RequestParamsForGettingList requestParamsForGettingList) {
        List<InvoiceEmployeeResponseDto> data = invoiceService.findAllInvoiceDetailsByEmployee(
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());

        return data;
    }


//    xac nhan thanh toan cho khach hang
    @ApiOperation(value = "Create invoice", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
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
            @PathVariable("id_invoice") Integer id
    ) {
        return this.invoiceService.updateInvoiceDto(id);
    }

    @ApiOperation(value = "Delete Invoice", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{id_invoice}")
    public ResponseEntity<Response> deleteInvoice(@PathVariable("id_invoice") Integer id) {
        return this.invoiceService.deleteInvoiceDto(id);
    }

    @ApiOperation(value = "Get invoice by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/ByIdInvoice/{id_invoice}")
    public PaginationResponse<InvoiceCustomerResponseDto> getOneInvoice(RequestParamsForGettingList requestParamsForGettingList, @PathVariable("id_invoice") Integer id) {
        Page<InvoiceCustomerResponseDto> data = invoiceService.getOne(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch(), id);

        return new PaginationResponse<>(data);
    }
    @ApiOperation(value = "Get invoice by id", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @GetMapping("/ByIdCustomer/{id_customer}")
    public List<InvoiceCustomerResponseDto> getOneByIdCustomer(RequestParamsForGettingList requestParamsForGettingList, @PathVariable("id_customer") Integer id) {
        List<InvoiceCustomerResponseDto> data = invoiceService.getOneByIdCustomer(
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch(),id);

        return data;
    }


}
