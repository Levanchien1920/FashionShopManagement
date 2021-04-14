package com.cnpm.fashion_shop.core.invoice.service;

import com.cnpm.fashion_shop.api.invoice.dto.InvoiceResponseDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.invoice.repository.InvoiceRepository;
import com.cnpm.fashion_shop.entity.Invoice;
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
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {
    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Transactional
    public Page<InvoiceResponseDto> findAllInvoiceDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "name_user",
                "total_money",
                "is_paid",
                "name_product",
                "number_product",
                "full_name_employee"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return invoiceRepository.findAllByName( pageable, search);
    }

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

}
