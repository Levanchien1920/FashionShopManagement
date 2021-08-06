package com.cnpm.fashion_shop.core.invoice.service;

import com.cnpm.fashion_shop.api.invoice.dto.InvoiceCustomerResponseDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceEmployeeDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceEmployeeResponseDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceCustomerDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.invoice.repository.DetailRepository;
import com.cnpm.fashion_shop.core.invoice.repository.InvoiceRepository;
import com.cnpm.fashion_shop.core.product.repository.ProductRepository;
import com.cnpm.fashion_shop.entity.InformationProductForEachInvoice;
import com.cnpm.fashion_shop.entity.Invoice;
import com.cnpm.fashion_shop.entity.Product;
import com.cnpm.fashion_shop.util.filterUtil.Implements.OrderFilterHelperImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {
    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private DetailRepository detailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Page<InvoiceCustomerResponseDto> findAllInvoiceDetailsByCustomer(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "total_money",
                "name_customer",
                "is_paid",
                "name_product",
                "price",
                "number_product",
                "linkImage",
                "nameSize",
                "nameColor"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return invoiceRepository.findAllByIdCustomer(pageable, search);
    }

    public List<InvoiceCustomerResponseDto> findAllInvoiceDetailsByCustomer(String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "total_money",
                "name_customer",
                "is_paid",
                "name_product",
                "price",
                "number_product",
                "nameSize",
                "nameColor",
                "linkImage"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        return invoiceRepository.findAllByIdCustomerWithoutDividingPage(search);
    }

    @Transactional
    public Page<InvoiceEmployeeResponseDto> findAllInvoiceDetailsByEmployee(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "total_money",
                "fullName_Employee",
                "is_paid",
                "name_product",
                "nameSize",
                "nameColor",
                "linkImage",
                "number_product"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return invoiceRepository.findAllByIdEmployee(pageable, search);
    }

    @Transactional
    public List<InvoiceEmployeeResponseDto> findAllInvoiceDetailsByEmployee(String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "total_money",
                "fullName_Employee",
                "is_paid",
                "name_product",
                "number_product",
                "nameColor",
                "nameSize",
                "linkImage"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        return invoiceRepository.findAllByIdEmployeeWithoutDividingPage(search);
    }

    @Transactional
    public Page<InvoiceCustomerDto> findAllInvoiceIdAndStatusByCustomer(int size, int page, String sort, String id) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "is_paid",
                "id_customer",
                "name_customer"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return invoiceRepository.findAllStatusByIdCustomer(pageable, id);
    }

    @Transactional
    public Page<InvoiceEmployeeDto> findAllInvoiceIdAndStatusByEmployee(int size, int page, String sort, String id) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "is_paid",
                "id_employee"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return invoiceRepository.findAllStatusByIdEmployee(pageable, id);
    }

    @Transactional
    public ResponseEntity<Response> createInvoiceDto(InvoiceDto dto) {
        try {
            Invoice invoice;
            InformationProductForEachInvoice details;
            Optional<Product> productOpt;
            Product product;

            invoice = new Invoice();
            invoice.setTotalMoney(dto.getTotalMoney());
            invoice.setId_employee(dto.getId_employee());
            invoice.setId_customer(dto.getId_user());
            invoice.set_paid(false);
            invoiceRepository.save(invoice);


            List<Integer> allId = new ArrayList<Integer>();
            for (int i = 0; i < dto.listProducts.size(); i++) {
                if (!allId.contains(dto.listProducts.get(i).getId())) {
                    details = new InformationProductForEachInvoice();
                    details.setId_product(dto.listProducts.get(i).getId());
                    details.setId_invoice(invoice.getId());
                    details.setNumber(dto.listProducts.get(i).getNumber());
                    detailRepository.save(details);
                    allId.add(dto.listProducts.get(i).getId());

//              cap nnhat lai number cua san pham trong kho
                    productOpt = productRepository.findById(dto.listProducts.get(i).getId());
                    product = productOpt.get();
                    product.setNumber(product.getNumber() - dto.listProducts.get(i).getNumber());

                    productRepository.save(product);
                } else {
                    //tim ra details do
                    details = detailRepository.findByIdInfoForEach(dto.listProducts.get(i).getId());
                    details.setNumber(dto.listProducts.get(i).getNumber() + details.getNumber());
                    details.setId_product(details.getId_product());
                    details.setId_invoice(details.getId_invoice());
                    detailRepository.save(details);

//              cap nnhat lai number cua san pham trong kho
                    productOpt = productRepository.findById(dto.listProducts.get(i).getId());
                    product = productOpt.get();
                    product.setNumber(product.getNumber() - dto.listProducts.get(i).getNumber());

                }
            }

            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> updateInvoiceDto(Integer id) {
        Optional<Invoice> invoiceOpt = invoiceRepository.findById_invoice(id);
        Invoice invoice;
        if (invoiceOpt.isEmpty() || invoiceOpt.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found invoice to be updated"));
        }

        invoice = invoiceOpt.get();
        invoice.set_paid(true);
//        invoice.setId_customer();
        try {
            invoiceRepository.save(invoice);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> deleteInvoiceDto(Integer id) {
        Invoice invoice;
        Optional<Invoice> invoiceOpt = invoiceRepository.findById_invoice(id);

        if (invoiceOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This invoice does not exist"));
        }

        invoice = invoiceOpt.get();

        if (invoice.getIsDeleted()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This invoice has been deleted"));
        }

        invoice.setIsDeleted(true);

        try {
            invoiceRepository.save(invoice);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }


    @Transactional
    public Page<InvoiceCustomerResponseDto> getOne(int size, int page, String sort, String search, int id) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "total_money",
                "name_customer",
                "is_paid",
                "name_product",
                "price",
                "number_product",
                "linkImage",
                "nameSize",
                "nameColor"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return invoiceRepository.getOneByIdInvoice(pageable, search, id);
    }

    @Transactional
    public List<InvoiceCustomerResponseDto> getOneByIdCustomer(String sort, String search, int id) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "total_money",
                "name_customer",
                "is_paid",
                "name_product",
                "price",
                "number_product",
                "linkImage",
                "nameSize",
                "nameColor"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        return invoiceRepository.getOneByIdCustomer(search ,id);
    }

}
