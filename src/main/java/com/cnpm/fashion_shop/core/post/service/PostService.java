package com.cnpm.fashion_shop.core.post.service;

import com.cnpm.fashion_shop.api.post.dto.PostDto;
import com.cnpm.fashion_shop.api.post.dto.PostResponseDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.post.repository.PostRepository;
import com.cnpm.fashion_shop.entity.Post;
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
public class PostService {
    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    @Autowired
    private PostRepository postRepository;

    @Transactional
    public Page<PostResponseDto> findAllPostDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "title",
                "content",
                "name",
                "link"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return postRepository.findAll(pageable, search);
    }

    public ResponseEntity getOne(Integer id) {
        //lay ra id, content va id_image
        Optional<Post> optionalPost = postRepository.findById(id);
        Post post;


        if (optionalPost.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Response.notFound("Cannot find this post with id = " + id));
        }

        post = optionalPost.get();

        if (post.getIsDeleted()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Response.conflict("post with id = " + id + " is deleted"));
        }
        return ResponseEntity.ok(new PostDto(post.getId(), post.getTitle(), post.getContent(), post.getId_image()));
    }

    @Transactional
    public ResponseEntity<Response> createPost(PostDto dto) {
        Post post;
        Post existing_post = postRepository.findByContent(StringUtils.trim(dto.getTitle()));
        if (StringUtils.trim(dto.getTitle()).equals("")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Post content cannot be empty or contain only space"));
        }

        if (existing_post != null) {
            if (!existing_post.getIsDeleted()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT.value())
                        .body(Response.conflict("This post content existed already"));

            }

            existing_post.setIsDeleted(false);

            try {
                postRepository.save(existing_post);
                return ResponseEntity.ok(SuccessfulResponse.CREATED);
            } catch (Exception e) {
                LOG.error(e.getMessage());
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Response.internalError(e.getMessage()));
            }
        }

        post = new Post();
        post.setTitle(dto.getTitle().trim());
        post.setContent(dto.getContent().trim());
        post.setId(dto.getId());
        if (dto.getId_image() != null) {
            post.setId_image(dto.getId_image());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Cannot find any images, please create new one"));
        }

        try {
            postRepository.save(post);
            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> updatePost(Integer id, PostDto dto) {
        Optional<Post> postOpt = postRepository.findById(id);
        Post post;
        Post existing_post = postRepository.findByContent(StringUtils.trim(dto.getContent()));

        if (StringUtils.equals(StringUtils.trim(dto.getContent()), "")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Post's content cannot be empty"));
        }

        if (postOpt.isEmpty() || postOpt.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found post to be updated"));
        }

        // Compare old and new name
        if (postOpt.get().getContent().equals(StringUtils.trim(dto.getContent()))) {
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        }

        if (existing_post != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This post already exists"));
        }

        post = postOpt.get();
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent().trim());
        if (dto.getId_image() != null) {
            post.setId_image(dto.getId_image());
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Cannot find any images, please create new one"));
        }

        try {
            postRepository.save(post);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> deletePost(Integer id) {
        Post post;
        Optional<Post> postOpt = postRepository.findById(id);

        if (postOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This post does not exist"));
        }

        post = postOpt.get();

        if (post.getIsDeleted()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This post has been deleted"));
        }

        post.setIsDeleted(true);

        try {
            postRepository.save(post);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public Optional<Post> findByIdOptional(Integer id) {
        return postRepository.findById(id);
    }
}
