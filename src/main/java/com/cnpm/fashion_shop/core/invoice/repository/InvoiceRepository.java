package com.cnpm.fashion_shop.core.invoice.repository;


import com.cnpm.fashion_shop.api.invoice.dto.InvoiceCustomerResponseDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceEmployeeDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceEmployeeResponseDto;
import com.cnpm.fashion_shop.api.invoice.dto.InvoiceCustomerDto;
import com.cnpm.fashion_shop.entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    @Query(value = "SELECT i.id as Id,e.full_name as Name_Customer, info.number*p.price as Total_Money, i.is_paid as Is_paid, info.number as Number_Product,p.price as Price, p.name as Name_Product " +
            "FROM (((invoice i inner join user e on i.id_customer=e.id) " +
            "inner join info_for_each info on info.id_invoice=i.id) " +
            "inner join product p on p.id=info.id_product) " +
            "WHERE LOWER(e.full_name) LIKE %:keyword% AND i.is_deleted = FALSE", nativeQuery = true)
    Page<InvoiceCustomerResponseDto> findAllByIdCustomer(Pageable pageable, @Param("keyword") String keyword);

    @Query(value = "SELECT i.id as Id , i.is_paid as Is_paid, i.id_customer as idCustomer " +
            "FROM invoice i " +
            "WHERE i.is_deleted = FALSE", nativeQuery = true)
    Page<InvoiceCustomerDto> findAllStatusByIdCustomer(Pageable pageable, @Param("id") String id);

    @Query(value = "SELECT i.id as Id , i.is_paid as Is_paid, i.id_employee as idEmployee, u.full_name as Employee " +
            "FROM (invoice i " +
            "inner join user u on u.id = i.id_employee )"+
            "WHERE i.is_deleted = FALSE", nativeQuery = true)
    Page<InvoiceEmployeeDto> findAllStatusByIdEmployee(Pageable pageable, @Param("id") String id);

    @Query(value = "SELECT i.id as Id,e.full_name as Name_Customer, info.number*p.price as Total_Money, i.is_paid as Is_paid, info.number as Number_Product,p.price as Price, p.name as Name_Product " +
            "FROM (((invoice i inner join user e on i.id_customer=e.id) " +
            "inner join info_for_each info on info.id_invoice=i.id) " +
            "inner join product p on p.id=info.id_product) " +
            "WHERE LOWER(e.full_name) LIKE %:keyword% AND i.is_deleted = FALSE", nativeQuery = true)
    List<InvoiceCustomerResponseDto> findAllByIdCustomerWithoutDividingPage(@Param("keyword") String keyword);

    @Query(value = "SELECT * FROM invoice i WHERE i.id = :id AND i.is_deleted = FALSE", nativeQuery = true)
    Optional<Invoice> findById_invoice(@Param("id") Integer id);


    @Query(value = "SELECT i.id as Id,e.full_name as fullName_Employee, info.number*p.price as Total_Money, i.is_paid as Is_paid, info.number as Number_Product,p.price as Price, p.name as Name_Product " +
            "FROM (((invoice i inner join user e on i.id_employee=e.id) " +
            "inner join info_for_each info on info.id_invoice=i.id) " +
            "inner join product p on p.id=info.id_product) " +
            "WHERE LOWER(e.full_name) LIKE %:keyword% AND i.is_deleted = FALSE", nativeQuery = true)
    Page<InvoiceEmployeeResponseDto> findAllByIdEmployee(Pageable pageable, @Param("keyword") String keyword);

    @Query(value = "SELECT i.id as Id,e.full_name as fullName_Employee, info.number*p.price as Total_Money, i.is_paid as Is_paid, info.number as Number_Product,p.price as Price, p.name as Name_Product " +
            "FROM (((invoice i inner join user e on i.id_employee=e.id) " +
            "inner join info_for_each info on info.id_invoice=i.id) " +
            "inner join product p on p.id=info.id_product) " +
            "WHERE LOWER(e.full_name) LIKE %:keyword% AND i.is_deleted = FALSE", nativeQuery = true)
    List<InvoiceEmployeeResponseDto> findAllByIdEmployeeWithoutDividingPage(@Param("keyword") String keyword);


    @Query(value = "SELECT i.id as Id,e.full_name as Name_Customer, info.number*p.price as Total_Money, i.is_paid as Is_paid, info.number as Number_Product,p.price as Price, p.name as Name_Product " +
            "FROM (((invoice i inner join user e on i.id_customer=e.id) " +
            "inner join info_for_each info on info.id_invoice=i.id) " +
            "inner join product p on p.id=info.id_product) " +
            "WHERE LOWER(e.full_name) LIKE %:keyword% AND i.is_deleted = FALSE AND i.id= :id", nativeQuery = true)
    Page<InvoiceCustomerResponseDto> getOneByIdInvoice(Pageable pageable, @Param("keyword") String keyword, @Param("id") Integer id);

    @Query(value = "SELECT i.id as Id,e.full_name as Name_Customer, info.number*p.price as Total_Money, i.is_paid as Is_paid, info.number as Number_Product,p.price as Price, p.name as Name_Product " +
            "FROM (((invoice i inner join user e on i.id_customer=e.id) " +
            "inner join info_for_each info on info.id_invoice=i.id) " +
            "inner join product p on p.id=info.id_product) " +
            "WHERE LOWER(e.full_name) LIKE %:keyword% AND i.is_deleted = FALSE AND i.id_customer= :id", nativeQuery = true)
    List<InvoiceCustomerResponseDto> getOneByIdCustomer(@Param("keyword") String keyword, @Param("id") Integer id);


    @Query(value = "SELECT i.id as Id,e.full_name as Name_Customer, info.number*p.price as Total_Money, i.is_paid as Is_paid, info.number as Number_Product,p.price as Price, p.name as Name_Product " +
            "FROM (((invoice i inner join user e on i.id_employee=e.id) " +
            "inner join info_for_each info on info.id_invoice=i.id) " +
            "inner join product p on p.id=info.id_product) " +
            "WHERE LOWER(e.full_name) LIKE %:keyword% AND i.is_deleted = FALSE AND i.id= :id", nativeQuery = true)
    Page<InvoiceEmployeeResponseDto> getOneByIdEmployee(Pageable pageable, @Param("keyword") String keyword, @Param("id") Integer id);

}
