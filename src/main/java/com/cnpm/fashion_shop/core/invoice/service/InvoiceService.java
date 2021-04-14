package com.cnpm.fashion_shop.core.invoice.service;

import com.cnpm.fashion_shop.api.invoice.dto.InvoiceDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceResponseDto;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.invoice.repository.InvoiceRepository;
import com.cnpm.fashion_shop.entity.Invoice;
import com.cnpm.fashion_shop.entity.Post;
import com.cnpm.fashion_shop.entity.info_for_each;
import com.cnpm.fashion_shop.util.filterUtil.Implements.OrderFilterHelperImpl;
import org.apache.commons.lang3.StringUtils;
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

//    public ResponseEntity getOne(Integer id) {
//        //lay ra id, content va id_image
//        Optional<Post> optionalPost = postRepository.findById(id);
//        Post post;
//
//
//        if (optionalPost.isEmpty()) {
//            return ResponseEntity
//                    .status(HttpStatus.NOT_FOUND)
//                    .body(Response.notFound("Cannot find this post with id = " + id));
//        }
//
//        post = optionalPost.get();
//
//        if (post.getIsDeleted()) {
//            return ResponseEntity
//                    .status(HttpStatus.CONFLICT)
//                    .body(Response.conflict("post with id = " + id + " is deleted"));
//        }
//        return ResponseEntity.ok(new PostDto(post.getId(),post.getContent() ,post.getId_image()));
//    }

    @Transactional
    public ResponseEntity<Response> createInvoiceDto(InvoiceDto dto) {
        Invoice invoice;
        info_for_each details;
//        Post existing_post = postRepository.findByContent(StringUtils.trim(dto.getContent()));
//        if (StringUtils.trim(dto.get).equals("")) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Response.badRequest("Post content cannot be empty or contain only space"));
//        }

//        if (existing_post != null) {
//            if (!existing_post.getIsDeleted()) {
//                return ResponseEntity
//                        .status(HttpStatus.CONFLICT.value())
//                        .body(Response.conflict("This post content existed already"));
//
//            }
//
//            existing_post.setIsDeleted(false);
//
//            try {
//                postRepository.save(existing_post);
//                return ResponseEntity.ok(SuccessfulResponse.CREATED);
//            } catch (Exception e) {
//                LOG.error(e.getMessage());
//                return ResponseEntity
//                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                        .body(Response.internalError(e.getMessage()));
//            }
//        }

        invoice = new Invoice();
        invoice.setTotalMoney(dto.getTotalMoney());
        invoice.setId_employee(dto.getId_employee());
        invoice.setId_user(dto.getId_user());
        invoice.set_paid(false);

        details= new info_for_each();
        details.setId_product();
        details.setId_invoice();
        details.setNumber();


        try {
            invoiceRepository.save(invoice);
            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> updateInvoiceDto(Integer id, InvoiceDto dto) {
        Optional<Invoice> invoiceOpt = invoiceRepository.findById_invoice(id);
        Invoice invoice;
//        Invoice existing_post = postRepository.findByContent(StringUtils.trim(dto.getContent()));

//        if (StringUtils.equals(StringUtils.trim(dto.getContent()), "")) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Response.badRequest("Post's content cannot be empty"));
//        }

        if (invoiceOpt.isEmpty() || invoiceOpt.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found invoice to be updated"));
        }

        // Compare old and new name
//        if (postOpt.get().getContent().equals(StringUtils.trim(dto.getContent()))) {
//            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
//        }

//        if (existing_post != null) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Response.badRequest("This post already exists"));
//        }

        invoice = invoiceOpt.get();
        invoice.setTotalMoney(dto.getTotalMoney());
        invoice.setId_employee(dto.getId_employee());
        invoice.setId_user(dto.getId_user());
        invoice.set_paid(true);


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

//    @Transactional
//    public Optional<Post> findByIdOptional(Integer id) {
//        return invoiceRepository.findById(id);
//    }
}
