package com.cnpm.fashion_shop.core.product.service;

import com.cnpm.fashion_shop.api.product.dto.ProductDto;
import com.cnpm.fashion_shop.api.product.dto.ProductRes;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.brand.repository.BrandRepository;
import com.cnpm.fashion_shop.core.category.repository.CategoryRepository;
import com.cnpm.fashion_shop.core.product.repository.GenderRepository;
import com.cnpm.fashion_shop.core.product.repository.ImageRepository;
import com.cnpm.fashion_shop.core.product.repository.ProductRepository;
import com.cnpm.fashion_shop.core.review.repository.ReviewRepository;
import com.cnpm.fashion_shop.entity.*;
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
public class ProductService {
    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private GenderRepository genderRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Transactional
    public Page<ProductResponseDto> findAllProductDetails(int size, int page, String sort, String search) {
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
        return productRepository.findAll(pageable, search);
    }

    public ResponseEntity getOne(Integer id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        Product product;
        Brand brand;
        Category category;
        Gender gender;
        Image image1;
        Review review;


        if (optionalProduct.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Response.notFound("Cannot find this product with id = " + id));
        }

        product = optionalProduct.get();
        Optional<Category> optionalCategory = categoryRepository.findById(product.getIdCategory());
        Optional<Brand> optionalBrand = brandRepository.findById_brand(product.getIdBrand());
        gender = genderRepository.findById_gender(product.getIdGender());
        image1 = imageRepository.findByName_image(product.getIdImage());
        review = reviewRepository.findById_Product(product.getId_product());

        category=optionalCategory.get();
        brand=optionalBrand.get();


        ProductRes productRes= new ProductRes();
        productRes.setId(product.getId_product());
        productRes.setBrandName(brand.getName());
        productRes.setCategoryName(category.getName());
        productRes.setGenderName(gender.getName());
        productRes.setIamgeName(image1.getName());
        productRes.setName(product.getName());
        productRes.setPrice(product.getPrice());
        productRes.setDes(product.getDescription());
        productRes.setNumber(product.getNumber());
        productRes.setLink(image1.getLink());
        productRes.setNumber_of_star(review.getNumberOfStar());


        if (productRes.getIsDeleted()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Response.conflict("Product with id = " + id + " is deleted"));
        }
        return ResponseEntity.ok(productRes);
    }

    @Transactional
    public ResponseEntity<Response> createProductDto(ProductDto dto) {
        Product product;
        Product existing_product = productRepository.findByName(StringUtils.trim(dto.getName()));
        if (StringUtils.trim(dto.getName()).equals("")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Product name cannot be empty or contain only space"));
        }

        if (existing_product != null) {
            if (!existing_product.getIsDeleted()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT.value())
                        .body(Response.conflict("This product name existed already"));

            }

            existing_product.setIsDeleted(false);

            try {
                productRepository.save(existing_product);
                return ResponseEntity.ok(SuccessfulResponse.CREATED);
            } catch (Exception e) {
                LOG.error(e.getMessage());
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Response.internalError(e.getMessage()));
            }
        }

        product = new Product();
        product.setIdCategory(dto.getId_cate());
        product.setIdBrand(dto.getId_brand());
        product.setIdGender(dto.getId_gender());
        product.setIdImage(dto.getId_image());
        product.setNumber(dto.getNumber());
        product.setName(dto.getName().trim());
        product.setDescription(dto.getDes());
        product.setPrice(dto.getPrice());


        try {
            productRepository.save(product);
            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> updateProductDto(Integer id, ProductDto dto) {
        Optional<Product> productOpt = productRepository.findById(id);
        Product product;
        Product existing_product = productRepository.findByName(StringUtils.trim(dto.getName()));

        if (StringUtils.equals(StringUtils.trim(dto.getName()), "")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Product's name cannot be empty"));
        }

        if (productOpt.isEmpty() || productOpt.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found product to be updated"));
        }

        // Compare old and new name
        if (productOpt.get().getName().equals(StringUtils.trim(dto.getName()))) {
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        }

        if (existing_product != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This product already exists"));
        }

        product = productOpt.get();
        product.setIdCategory(dto.getId_cate());
        product.setIdBrand(dto.getId_brand());
        product.setIdGender(dto.getId_gender());
        product.setIdImage(dto.getId_image());
        product.setNumber(dto.getNumber());
        product.setName(dto.getName().trim());
        product.setDescription(dto.getDes());
        product.setPrice(dto.getPrice());

        try {
            productRepository.save(product);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> deleteProductDto(Integer id) {
        Product product;
        Optional<Product> productOpt = productRepository.findById(id);

        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This product does not exist"));
        }

        product = productOpt.get();

        if (product.getIsDeleted()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This product has been deleted"));
        }

        product.setIsDeleted(true);

        try {
            productRepository.save(product);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }


    public Product getOne_pro(Integer id) {
        return productRepository.getOne_pro(id);
    }

    @Transactional
    public Optional<Product>  findByIdOptional(Integer id) {
        return productRepository.findById(id);
    }


//    end admin


    @Transactional
    public Page<ProductResponseDto> findRelateProductDto(Integer id,Integer id_brand, Integer id_category, Integer id_gender,int size, int page, String sort, String search) {
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
        return productRepository.findAllRelate(pageable, search, id, id_brand, id_category, id_gender);
    }
}
