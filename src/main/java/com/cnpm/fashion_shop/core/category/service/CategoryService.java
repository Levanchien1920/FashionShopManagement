package com.cnpm.fashion_shop.core.category.service;

import com.cnpm.fashion_shop.api.category.dto.CategoryDto;
import com.cnpm.fashion_shop.api.category.dto.CategoryResponseDto;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.category.repository.CategoryRepository;
import com.cnpm.fashion_shop.entity.Category;
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
public class CategoryService {
    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public Page<CategoryResponseDto> findAllCategoryDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "name"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return categoryRepository.findAllByName(pageable, search);
    }

    @Transactional
    public List<CategoryResponseDto> findAllCategoryNoPageDetails(String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "name"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        return categoryRepository.findAllByNameCategory(search);
    }

    @Transactional
    public Page<ProductResponseDto> findAllProductbyCategory(Integer id, int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "name",
                "price",
                "number",
                "des",
                "Name_Brand",
                "Name_Category",
                "Name_Gender",
                "Name_Image",
                "link"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return categoryRepository.findAllByNameCategory(pageable, search,id);
    }

    public ResponseEntity getOne(Integer id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        Category category;

        if (optionalCategory.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Response.notFound("Cannot find this category with id = " + id));
        }

        category = optionalCategory.get();

        if (category.getIsDeleted()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Response.conflict("Category with id = " + id + " is deleted"));
        }
        return ResponseEntity.ok(new CategoryDto(category.getId(), category.getName()));
    }

    @Transactional
    public ResponseEntity<Response> createCategoryDto(CategoryDto dto) {
        Category category;
        Category existing_category = categoryRepository.findByName(StringUtils.trim(dto.getName()));
        if (StringUtils.trim(dto.getName()).equals("")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Category name cannot be empty or contain only space"));
        }

        if (existing_category != null) {
            if (!existing_category.getIsDeleted()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT.value())
                        .body(Response.conflict("This category name existed already"));

            }

            existing_category.setIsDeleted(false);

            try {
                categoryRepository.save(existing_category);
                return ResponseEntity.ok(SuccessfulResponse.CREATED);
            } catch (Exception e) {
                LOG.error(e.getMessage());
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Response.internalError(e.getMessage()));
            }
        }

        category = new Category();
        category.setName(dto.getName().trim());

        try {
            categoryRepository.save(category);
            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> updateCategoryDto(Integer id, CategoryDto dto) {
        Optional<Category> categoryOpt = categoryRepository.findById(id);
        Category category;
        Category existing_category = categoryRepository.findByName(StringUtils.trim(dto.getName()));

        if (StringUtils.equals(StringUtils.trim(dto.getName()), "")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Category's name cannot be empty"));
        }

        if (categoryOpt.isEmpty() || categoryOpt.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found category to be updated"));
        }

        // Compare old and new name
        if (categoryOpt.get().getName().equals(StringUtils.trim(dto.getName()))) {
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        }

        if (existing_category != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This category already exists"));
        }

        category = categoryOpt.get();
        category.setName(dto.getName().trim());

        try {
            categoryRepository.save(category);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> deleteCategoryDto(Integer id) {
        Category category;
        Optional<Category> categoryOpt = categoryRepository.findById(id);

        if (categoryOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This category does not exist"));
        }

        category = categoryOpt.get();

        if (category.getIsDeleted()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This category has been deleted"));
        }

        category.setIsDeleted(true);

        try {
            categoryRepository.save(category);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public Optional<Category> findByIdOptional(Integer id) {
        return categoryRepository.findById(id);
    }
}
