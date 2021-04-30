package com.cnpm.fashion_shop.api.image.controller;

import com.cnpm.fashion_shop.api.image.dto.ImageDto;
import com.cnpm.fashion_shop.api.image.dto.ImageResponseDto;
import com.cnpm.fashion_shop.common.constant.SecurityConstants;
import com.cnpm.fashion_shop.common.request.RequestParamsForGettingList;
import com.cnpm.fashion_shop.common.response.PaginationResponse;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.core.image.service.ImageService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/v1/image")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @ApiOperation(value = "Get all images")
    @GetMapping()
    public PaginationResponse<ImageResponseDto> getImage(RequestParamsForGettingList requestParamsForGettingList) {
        Page<ImageResponseDto> data = imageService.findAllImageDetails(requestParamsForGettingList.getPage(),
                requestParamsForGettingList.getSize(),
                requestParamsForGettingList.getSort(),
                requestParamsForGettingList.getSearch());
        return new PaginationResponse<>(data);
    }


    @ApiOperation(value = "Create image", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PostMapping
    public ResponseEntity<Response> createImage(
            @Valid @RequestBody ImageDto dto
    ) {
        return imageService.createImage(dto);
    }

    @ApiOperation(value = "Update image", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @PatchMapping("/{id_image}")
    public ResponseEntity<Response> updateImage(
            @PathVariable("id_image") Integer id,
            @Valid @RequestBody ImageDto dto
    ) {
        return this.imageService.updateImage(id, dto);
    }

    @ApiOperation(value = "Delete brand", authorizations = {@Authorization(value = SecurityConstants.SECURITY_JWT_NAME)})
    @DeleteMapping("/{id_brand}")
    public ResponseEntity<Response> deleteImage(@PathVariable("id_brand") Integer id) {
        return this.imageService.deleteImage(id);
    }

    @ApiOperation(value = "Get brand by id")
    @GetMapping("/{id_image}")
    public ResponseEntity getOneImage(@PathVariable("id_image") Integer id) {
        return imageService.getOne(id);
    }

}
