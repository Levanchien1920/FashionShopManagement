package com.cnpm.fashion_shop.api.brand.controller;
import com.cnpm.fashion_shop.api.brand.dto.BrandDto;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.core.brand.service.BrandService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<List<BrandDto>> listAllUser(){
        List<BrandDto> listUser= brandService.getListUser();
        if(listUser.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<BrandDto>>(listUser, HttpStatus.OK);
    }



//    @ApiOperation(value = "Create brand", authorizations = {@Authorization(value = SECURITY_JWT_NAME)})
//    @PostMapping
//    public ResponseEntity<Response> createBrandDto(
//            @Valid @RequestBody BrandDto dto
//    ) {
//        return brandService.createBrandDto(dto);
//    }
//
//    @ApiOperation(value = "Update brand", authorizations = {@Authorization(value = SECURITY_JWT_NAME)})
//    @PatchMapping("/{brand_id}")
//    public ResponseEntity<Response> updateBrand(
//            @PathVariable("brand_id") Long id,
//            @Valid @RequestBody BrandDto dto
//    ) {
//        return this.brandService.updateBrandDto(id, dto);
//    }
//
//    @ApiOperation(value = "Delete brand", authorizations = {@Authorization(value = SECURITY_JWT_NAME)})
//    @DeleteMapping("/{brand_id}")
//    public ResponseEntity<Response> deleteBrand(@PathVariable("brand_id") Long id) {
//        return this.brandService.deleteBrandDto(id);
//    }
//
//    @ApiOperation(value = "Get brand by id", authorizations = {@Authorization(value = SECURITY_JWT_NAME)})
//    @GetMapping("/{brand_id}")
//    public ResponseEntity getOneBrand(@PathVariable("brand_id") Long id) {
//        return brandService.getOne(id);
//    }
}
