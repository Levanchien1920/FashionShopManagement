package com.cnpm.fashion_shop.core.color.service;

import com.cnpm.fashion_shop.api.color.dto.ColorResponse;
import com.cnpm.fashion_shop.api.color.dto.Color_Dto;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.color.repository.ColorRepository;
import com.cnpm.fashion_shop.entity.Color;
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
public class ColorService {
    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    @Autowired
    private ColorRepository colorRepository;

    @Transactional
    public Page<ColorResponse> findAllColorDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "name"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return colorRepository.findAllByName(pageable, search);
    }

//    @Transactional
//    public Page<ProductResponseDto> findAllProductbyColor(Integer id,int size, int page, String sort, String search) {
//        List<String> columnsAllow = Arrays.asList(
//                "id",
//                "name",
//                "price",
//                "number",
//                "des",
//                "Name_Color",
//                "Name_Category",
//                "Name_Gender",
//                "Name_Image",
//                "link"
//        );
//        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
//        orderFilterHelperImpl.validate();
//
//        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
//        return colorRepository.findAllByNameColor(pageable, search,id);
//    }

    public ResponseEntity getOne(Integer id) {
        Optional<Color> optionalColor = colorRepository.findById_Color(id);
        Color color;

        if (optionalColor.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Response.notFound("Cannot find this color with id = " + id));
        }

        color = optionalColor.get();

        if (color.getIsDeleted()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Response.conflict("Color with id = " + id + " is deleted"));
        }
        return ResponseEntity.ok(new Color_Dto(color.getId(), color.getName()));
    }

    @Transactional
    public ResponseEntity<Response> createColor(Color_Dto dto) {
        Color color;
        Color existingColor = colorRepository.findByName(StringUtils.trim(dto.getName()));
        if (StringUtils.trim(dto.getName()).equals("")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Color name cannot be empty or contain only space"));
        }

        if (existingColor != null) {
            if (!existingColor.getIsDeleted()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT.value())
                        .body(Response.conflict("This brand name existed already"));

            }

            existingColor.setIsDeleted(false);

            try {
                colorRepository.save(existingColor);
                return ResponseEntity.ok(SuccessfulResponse.CREATED);
            } catch (Exception e) {
                LOG.error(e.getMessage());
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Response.internalError(e.getMessage()));
            }
        }

        color = new Color();
        color.setName(dto.getName().trim());

        try {
            colorRepository.save(color);
            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> updateColor(Integer id, Color_Dto dto) {
        Optional<Color> colorOptional = colorRepository.findById_Color(id);
        Color color;
        Color existingColor = colorRepository.findByName(StringUtils.trim(dto.getName()));

        if (StringUtils.equals(StringUtils.trim(dto.getName()), "")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Color's name cannot be empty"));
        }

        if (colorOptional.isEmpty() || colorOptional.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found color to be updated"));
        }

        // Compare old and new name
        if (colorOptional.get().getName().equals(StringUtils.trim(dto.getName()))) {
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        }

        if (existingColor != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This color already exists"));
        }

        color = colorOptional.get();
        color.setName(dto.getName().trim());

        try {
            colorRepository.save(color);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> deleteColor(Integer id) {
        Color color;
        Optional<Color> colorOptional = colorRepository.findById_Color(id);

        if (colorOptional.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This color does not exist"));
        }

        color = colorOptional.get();

        if (color.getIsDeleted()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This color has been deleted"));
        }

        color.setIsDeleted(true);

        try {
            colorRepository.save(color);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public Optional<Color> findByIdOptional(Integer id) {
        return colorRepository.findById_Color(id);
    }
}
