package com.cnpm.fashion_shop.core.product.service;

import com.cnpm.fashion_shop.api.color.dto.ColorDto;
import com.cnpm.fashion_shop.api.product.dto.ProductColor;
import com.cnpm.fashion_shop.api.product.dto.ProductDto;
import com.cnpm.fashion_shop.api.product.dto.ProductRes;
import com.cnpm.fashion_shop.api.product.dto.ProductResponseDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.brand.repository.BrandRepository;
import com.cnpm.fashion_shop.core.category.repository.CategoryRepository;
import com.cnpm.fashion_shop.core.image.repository.ImageRepository;
import com.cnpm.fashion_shop.core.product.repository.*;
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

    @Autowired
    private ColorProductRepository colorProductRepository;

    @Transactional
    public Page<ProductResponseDto> findAllProductDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "name",
                "price",
                "number",
                "Name_Size",
                "des",
                "Name_Brand",
                "Name_Category",
                "Name_Gender",
                "Name_Image",
                "link",
                "color"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return productRepository.findAllByName(pageable, search);
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
        image1 = imageRepository.findById(product.getIdImage());
        review = reviewRepository.findById_Product(product.getId_product());


        // lay cac id color cua 1 sp cu the size XXL
        List<ProductColor> idColorForXXLs;
        idColorForXXLs = productRepository.getAllIdColorForXXL(product.getName());
        ColorDto colorForXXL;

        List<ProductColor> idColorForXLs;
        idColorForXLs = productRepository.getAllIdColorForXL(product.getName());
        ColorDto colorForXL;

        List<ProductColor> idColorForLs;
        idColorForLs = productRepository.getAllIdColorForL(product.getName());
        ColorDto colorForL;

        List<ProductColor> idColorForMs;
        idColorForMs = productRepository.getAllIdColorForM(product.getName());
        ColorDto colorForM;

        category = optionalCategory.get();
        brand = optionalBrand.get();

        ProductRes productRes = new ProductRes();

        productRes.setId(product.getId_product());
        if (category.getId() != null) {
            productRes.setId_cate(category.getId());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This category is not exist"));
        }
        if (brand.getId() != null) {
            productRes.setId_brand(brand.getId());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This brand is not exist"));
        }
        productRes.setBrandName(brand.getName());
        productRes.setCategoryName(category.getName());
        productRes.setGenderName(gender.getName());
        productRes.setIamgeName(image1.getName());
        productRes.setName(product.getName());
        productRes.setPrice(product.getPrice());
        productRes.setDes(product.getDescription());
        if (image1.getId() != null) {
            productRes.setLink(image1.getLink());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Image of product is not exist"));
        }
        if (review != null) {
            productRes.setNumber_of_star(review.getNumberOfStar());
        } else {
            productRes.setNumber_of_star(0.0f);
        }

//        set cac Color cua 1 sp size XXL
        String ColorXXL = "";
        String numberColorXXL = "";
        for (int i = 0; i < idColorForXXLs.size(); i++) {
            Integer idXXL = idColorForXXLs.get(i).getId_Color();
            colorForXXL = colorProductRepository.findNameByIdColor(idXXL);
            Integer numberXXL = idColorForXXLs.get(i).getNumber();
            numberColorXXL += numberXXL + " ";
            ColorXXL += colorForXXL.getName_Color() + " ";
        }

        String ColorXL = "";
        String numberColorXL = "";
        for (int i = 0; i < idColorForXLs.size(); i++) {
            Integer idXL = idColorForXLs.get(i).getId_Color();
            colorForXL = colorProductRepository.findNameByIdColor(idXL);
            Integer numberXL = idColorForXLs.get(i).getNumber();
            numberColorXL += numberXL + " ";
            ColorXL += colorForXL.getName_Color() + " ";
        }

        String ColorL = "";
        String numberColorL = "";
        for (int i = 0; i < idColorForLs.size(); i++) {
            Integer idL = idColorForLs.get(i).getId_Color();
            colorForL = colorProductRepository.findNameByIdColor(idL);
            Integer numberL = idColorForLs.get(i).getNumber();
            numberColorL += numberL + " ";
            ColorL += colorForL.getName_Color() + " ";
        }

        String ColorM = "";
        String numberColorM = "";
        for (int i = 0; i < idColorForMs.size(); i++) {
            Integer idM = idColorForMs.get(i).getId_Color();
            colorForM = colorProductRepository.findNameByIdColor(idM);
            Integer numberM = idColorForMs.get(i).getNumber();
            numberColorM += numberM + " ";
            ColorM += colorForM.getName_Color() + " ";
        }


        productRes.setXXL(ColorXXL);
        productRes.setXL(ColorXL);
        productRes.setL(ColorL);
        productRes.setM(ColorM);
        productRes.setXXL_Number(numberColorXXL);
        productRes.setXL_Number(numberColorXL);
        productRes.setL_Number(numberColorL);
        productRes.setM_Number(numberColorM);


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
        //Product existing_product = productRepository.findByNameAndNameSizeAndIdColor(StringUtils.trim(dto.getName()));
        if (StringUtils.trim(dto.getName()).equals("")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Product name and name size cannot be empty or contain only space"));
        }
        Optional<Category> optionalCategory = categoryRepository.findById(dto.getId_cate());
        Optional<Brand> optionalBrand = brandRepository.findById_brand(dto.getId_brand());
        Optional<Image> optionalImage = imageRepository.findByIdImage(dto.getId_image());
        Optional<Color> optionalColor = colorProductRepository.findById(dto.getId_color());
       Category category = optionalCategory.get();
        Brand brand = optionalBrand.get();
        Image image = optionalImage.get();
        Color color = optionalColor.get();
        product = new Product();

        if (category.getId() != null) {
            product.setIdCategory(dto.getId_cate());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This category is not exist"));
        }
        if (brand.getId() != null) {
            product.setIdBrand(dto.getId_brand());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This brand is not exist"));
        }
        product.setIdGender(dto.getId_gender());
        if (image.getId() != null) {
            product.setIdImage(dto.getId_image());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This image is not exist"));
        }
        product.setName(dto.getName().trim());
        product.setDescription(dto.getDes());
        product.setPrice(dto.getPrice());
        product.setName_size(dto.getName_size());
        if (color.getId() != null) {
            product.setIdColor(dto.getId_color());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This color is not exist"));
        }

        product.setNumber(dto.getNumber());


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
        Optional<Category> optionalCategory = categoryRepository.findById(dto.getId_cate());
        Optional<Brand> optionalBrand = brandRepository.findById_brand(dto.getId_brand());
        Optional<Image> optionalImage = imageRepository.findByIdImage(dto.getId_image());
        Optional<Color> optionalColor = colorProductRepository.findById(dto.getId_color());
        Category category = optionalCategory.get();
        Brand brand = optionalBrand.get();
        Image image = optionalImage.get();
        Color color = optionalColor.get();

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

        product = productOpt.get();
        if (category.getId() != null) {
            product.setIdCategory(dto.getId_cate());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This category is not exist"));
        }
        if (brand.getId() != null) {
            product.setIdBrand(dto.getId_brand());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This brand is not exist"));
        }
        product.setIdGender(dto.getId_gender());
        if (image.getId() != null) {
            product.setIdImage(dto.getId_image());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This image is not exist"));
        }
        product.setName(dto.getName().trim());
        product.setDescription(dto.getDes());
        product.setPrice(dto.getPrice());
        product.setName_size(dto.getName_size());
        if (color.getId() != null) {
            product.setIdColor(dto.getId_color());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This color is not exist"));
        }
        product.setNumber(dto.getNumber());

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
    public Optional<Product> findByIdOptional(Integer id) {
        return productRepository.findById(id);
    }


//    end admin


    @Transactional
    public Page<ProductResponseDto> findRelateProductDto(Integer id, Integer id_brand, Integer id_category, Integer id_gender, int size, int page, String sort, String search) {
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

    @Transactional
    public Page<ProductResponseDto> getNewProducts(int size, int page, String sort, String search) {
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
        return productRepository.findProducts(pageable, search);
    }

    @Transactional
    public Page<ProductResponseDto> getBestProducts(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "name",
                "price",
                "name_Color",
                "name_Size",
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
        return productRepository.findBestProducts(pageable, search);
    }
}
