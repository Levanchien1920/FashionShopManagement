package com.cnpm.fashion_shop.core.customer.service;

import com.cnpm.fashion_shop.api.customer.dto.CustomerDto;
import com.cnpm.fashion_shop.api.customer.dto.CustomerResponseDto;
import com.cnpm.fashion_shop.common.response.Response;
import com.cnpm.fashion_shop.common.response.SuccessfulResponse;
import com.cnpm.fashion_shop.core.customer.repository.CustomerRepository;
import com.cnpm.fashion_shop.entity.Customer;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.invoke.MethodHandles;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Transactional
    public Page<CustomerResponseDto> findAllCustomerDetails(int size, int page, String sort, String search) {
        List<String> columnsAllow = Arrays.asList(
                "id",
                "username",
                "fullname",
                "address",
                "phone_number",
                "email"
        );
        OrderFilterHelperImpl orderFilterHelperImpl = new OrderFilterHelperImpl(sort, columnsAllow);
        orderFilterHelperImpl.validate();

        Pageable pageable = PageRequest.of(size, page, orderFilterHelperImpl.getSort());
        return customerRepository.findAllByName(pageable, search);
    }


    public ResponseEntity getOne(Integer id) {
        Optional<Customer> optionalCustomer = customerRepository.findById_customer(id);
        Customer customer;

        if (optionalCustomer.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Response.notFound("Cannot find this Customer with id = " + id));
        }

        customer = optionalCustomer.get();

        if (customer.getIsDeleted()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Response.conflict("Customer with id = " + id + " is deleted"));
        }
        return ResponseEntity.ok(new CustomerDto(customer.getId_cus(),customer.getUsername(),customer.getPassword(),customer.getFullname(),customer.getAddress(),customer.getEmail(),customer.getPhoneNumber()));
    }

    @Transactional
    public ResponseEntity<Response> createCustomer(CustomerDto dto) {
        Customer customer;
        Customer existingCustomer = customerRepository.findByEmail(StringUtils.trim(dto.getEmail()));
        if (StringUtils.trim(dto.getFullname()).equals("")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Customer name cannot be empty or contain only space"));
        }

        if (existingCustomer != null) {
            if (!existingCustomer.getIsDeleted()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT.value())
                        .body(Response.conflict("This Customer email existed already"));

            }

            existingCustomer.setIsDeleted(false);

            try {
                customerRepository.save(existingCustomer);
                return ResponseEntity.ok(SuccessfulResponse.CREATED);
            } catch (Exception e) {
                LOG.error(e.getMessage());
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Response.internalError(e.getMessage()));
            }
        }

        customer = new Customer();
        customer.setPassword(encoder.encode(dto.getPassword()));
        customer.setUsername(dto.getUsername());
        customer.setFullname(dto.getFullname().trim());
        customer.setAddress(dto.getAddress());
        customer.setEmail(dto.getEmail());
        customer.setPhoneNumber(dto.getPhone_number());

        try {
            customerRepository.save(customer);
            return ResponseEntity.ok(SuccessfulResponse.CREATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> updateCustomerDto(Integer id, CustomerDto dto) {
        Optional<Customer> customerOpt = customerRepository.findById_customer(id);
        Customer customer;
        Customer existing_customer = customerRepository.findByEmail(StringUtils.trim(dto.getEmail()));

        if (StringUtils.equals(StringUtils.trim(dto.getFullname()), "")) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Customer's name cannot be empty"));
        }

        if (customerOpt.isEmpty() || customerOpt.get().getIsDeleted()) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("Not found Customer to be updated"));
        }

        // Compare old and new name
        if (customerOpt.get().getEmail().equals(StringUtils.trim(dto.getEmail()))) {
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        }

        if (existing_customer != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Response.badRequest("This email customer already exists"));
        }

        customer = customerOpt.get();
        customer.setUsername(dto.getUsername());
        customer.setFullname(dto.getFullname().trim());
        customer.setAddress(dto.getAddress());
        customer.setEmail(dto.getEmail());
        customer.setPhoneNumber(dto.getPhone_number());
        customer.setPassword(encoder.encode(dto.getPassword()));

        try {
            customerRepository.save(customer);
            return ResponseEntity.ok(SuccessfulResponse.UPDATED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<Response> deleteCustomerDto(Integer id) {
        Customer customer;
        Optional<Customer> customerOpt = customerRepository.findById_customer(id);

        if (customerOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This customer does not exist"));
        }

        customer =customerOpt.get();

        if (customer.getIsDeleted()) {
            return ResponseEntity.badRequest()
                    .body(Response.badRequest("This customer has been deleted"));
        }

        customer.setIsDeleted(true);

        try {
            customerRepository.save(customer);
            return ResponseEntity.ok(SuccessfulResponse.DELETED);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Response.internalError(e.getMessage()));
        }
    }
    public Customer findByUsername(String username) {
        return this.customerRepository.findByUsername(username);
    }
    @Transactional
    public Optional<Customer> findByIdOptional(Integer id) {
        return customerRepository.findById_customer(id);
    }
}
