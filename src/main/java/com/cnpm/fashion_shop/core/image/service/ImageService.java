package com.cnpm.fashion_shop.core.image.service;

import com.cnpm.fashion_shop.api.image.dto.ImageDto;
import com.cnpm.fashion_shop.api.image.dto.ImageResponseDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.image.repository.ImageRepository;
import com.cnpm.fashion_shop.entity.Image;
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
public class ImageService {
    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    @Autowired
    private ImageRepository imageRepository;

    @Transactional
    public Page<ImageResponseDto> findAllImageDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "name",
                "link"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return imageRepository.findAllByName(pageable, search);
    }

    public ResponseEntity getOne(Integer id) {
        Optional<Image> optionalImage = imageRepository.findByIdImage(id);
        Image image;

        if (optionalImage.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Response.notFound("Cannot find this image with id = " + id));
        }

        image = optionalImage.get();

        if (image.getIsDeleted()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Response.conflict("Image with id = " + id + " is deleted"));
        }
        return ResponseEntity.ok(new ImageDto(image.getId(), image.getName(), image.getLink()));
    }
@Transactional
    public ResponseEntity<Response> createImage(ImageDto dto) {
        Image image;
        Image existingImage = imageRepository.findByName(StringUtils.trim(dto.getName()));
        if (StringUtils.trim(dto.getName()).equals("")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Image name cannot be empty or contain only space"));
        }

        if (existingImage != null) {
            if (!existingImage.getIsDeleted()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT.value())
                        .body(Response.conflict("This image name existed already"));

            }

            existingImage.setIsDeleted(false);

            try {
                imageRepository.save(existingImage);
                return ResponseEntity.ok(SuccessfulResponse.CREATED);
            } catch (Exception e) {
                LOG.error(e.getMessage());
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Response.internalError(e.getMessage()));
            }
        }

        image = new Image();
        image.setName(dto.getName().trim());
        image.setLink(dto.getLink().trim());

        try {
            imageRepository.save(image);
            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> updateImage(Integer id, ImageDto dto) {
        Optional<Image> imageOptional = imageRepository.findByIdImage(id);
        Image image;
        Image existingImage = imageRepository.findByName(StringUtils.trim(dto.getName()));
        image=imageOptional.get();


        if (StringUtils.equals(StringUtils.trim(dto.getName()), "")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Image's name cannot be empty"));
        }

        if (imageOptional.isEmpty() || imageOptional.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found image to be updated"));
        }

        // Compare old and new name
        if (imageOptional.get().getName().equals(StringUtils.trim(dto.getName()))) {
            image.setLink(dto.getLink());
            imageRepository.save(image);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        }

        if (existingImage != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This image already exists"));
        }

        image.setName(dto.getName().trim());
        image.setLink(dto.getLink().trim());

        try {
            imageRepository.save(image);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> deleteImage(Integer id) {
        Image image;
        Optional<Image> imageOptional = imageRepository.findByIdImage(id);

        if (imageOptional.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This image does not exist"));
        }

        image = imageOptional.get();

        if (image.getIsDeleted()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This image has been deleted"));
        }

        image.setIsDeleted(true);

        try {
            imageRepository.save(image);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

}
