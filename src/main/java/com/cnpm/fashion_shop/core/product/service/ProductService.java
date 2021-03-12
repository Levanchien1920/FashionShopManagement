package com.cnpm.fashion_shop.core.product.service;

import com.cnpm.fashion_shop.api.brand.dto.BrandDto;
import com.cnpm.fashion_shop.api.brand.dto.BrandResponseDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.brand.repository.BrandRepository;
import com.cnpm.fashion_shop.core.product.repository.ProductRepository;
import com.cnpm.fashion_shop.entity.Brand;
import com.cnpm.fashion_shop.entity.Product;
import org.springframework.stereotype.Service;
import com.cnpm.fashion_shop.util.filterUtil.Implements.OrderFilterHelperImpl;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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
public class ProductService {
//    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
//    @Autowired
//    private ProductRepository productRepository;
//
//    @Transactional
//    public Page<ProductResponseDto> findAllBrandDetails(int size, int page, String sort, String search) {
//        List<String> columnsAllow = Arrays.asList(
//                "id_brand",
//                "name"
//        );
//        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
//        orderFilterHelperImpl.validate();
//
//        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
//        return productRepository.findAllByName(pageable, search);
//    }
//
//    public ResponseEntity getOne(Long id) {
//        Optional<Brand> optionalBrand = productRepository.findById(id);
//        Brand brand;
//
//        if (optionalBrand.isEmpty()) {
//            return ResponseEntity
//                    .status(HttpStatus.NOT_FOUND)
//                    .body(Response.notFound("Cannot find this brand with id = " + id));
//        }
//
//        brand = optionalBrand.get();
//
//        if (brand.getIsDeleted()) {
//            return ResponseEntity
//                    .status(HttpStatus.CONFLICT)
//                    .body(Response.conflict("Brand with id = " + id + " is deleted"));
//        }
//        return ResponseEntity.ok(new BrandDto(brand.getId_brand(), brand.getName()));
//    }
//
//    @Transactional
//    public ResponseEntity<Response> createBrandDto(BrandDto dto) {
//        Brand brand;
//        Brand existing_brand = brandRepository.findByName(StringUtils.trim(dto.getName()));
//        if (StringUtils.trim(dto.getName()).equals("")) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Response.badRequest("Brand name cannot be empty or contain only space"));
//        }
//
//        if (existing_brand != null) {
//            if (!existing_brand.getIsDeleted()) {
//                return ResponseEntity
//                        .status(HttpStatus.CONFLICT.value())
//                        .body(Response.conflict("This brand name existed already"));
//
//            }
//
//            existing_brand.setIsDeleted(false);
//
//            try {
//                brandRepository.save(existing_brand);
//                return ResponseEntity.ok(SuccessfulResponse.CREATED);
//            } catch (Exception e) {
//                LOG.error(e.getMessage());
//                return ResponseEntity
//                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                        .body(Response.internalError(e.getMessage()));
//            }
//        }
//
//        brand = new Brand();
//        brand.setName(dto.getName().trim());
//
//        try {
//            brandRepository.save(brand);
//            return ResponseEntity.ok(SuccessfulResponse.CREATED);
//        } catch (Exception e) {
//            LOG.error(e.getMessage());
//            return ResponseEntity
//                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Response.internalError(e.getMessage()));
//        }
//    }
//
//    @Transactional
//    public ResponseEntity<Response> updateBrandDto(Long id, BrandDto dto) {
//        Optional<Brand> brandOpt = brandRepository.findById(id);
//        Brand brand;
//        Brand existing_brand = brandRepository.findByName(StringUtils.trim(dto.getName()));
//
//        if (StringUtils.equals(StringUtils.trim(dto.getName()), "")) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Response.badRequest("Brand's name cannot be empty"));
//        }
//
//        if (brandOpt.isEmpty() || brandOpt.get().getIsDeleted()) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Response.badRequest("Not found brand to be updated"));
//        }
//
//        // Compare old and new name
//        if (brandOpt.get().getName().equals(StringUtils.trim(dto.getName()))) {
//            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
//        }
//
//        if (existing_brand != null) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(Response.badRequest("This brand already exists"));
//        }
//
//        brand = brandOpt.get();
//        brand.setName(dto.getName().trim());
//
//        try {
//            brandRepository.save(brand);
//            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
//        } catch (Exception e) {
//            LOG.error(e.getMessage());
//            return ResponseEntity
//                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Response.internalError(e.getMessage()));
//        }
//    }
//
//    @Transactional
//    public ResponseEntity<Response> deleteBrandDto(Long id) {
//        Brand brand;
//        Optional<Brand> brandOpt = brandRepository.findById(id);
//
//        if (brandOpt.isEmpty()) {
//            return ResponseEntity.badRequest()
//                    .body(Response.badRequest("This brand does not exist"));
//        }
//
//        brand = brandOpt.get();
//
//        if (brand.getIsDeleted()) {
//            return ResponseEntity.badRequest()
//                    .body(Response.badRequest("This brand has been deleted"));
//        }
//
//        brand.setIsDeleted(true);
//
//        try {
//            brandRepository.save(brand);
//            return ResponseEntity.ok(SuccessfulResponse.DELETED);
//        } catch (Exception e) {
//            LOG.error(e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Response.internalError(e.getMessage()));
//        }
//    }
//
//    @Transactional
//    public Optional<Brand> findByIdOptional(Long id) {
//        return brandRepository.findById(id);
//    }
}