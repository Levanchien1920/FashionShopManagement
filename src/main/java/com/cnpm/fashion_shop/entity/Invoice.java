package com.cnpm.fashion_shop.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "invoice")
public class Invoice extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Column(name = "id")
    private Integer id;

    @Column(name = "total_money")
    private Long totalMoney;

    @Column(name = "is_paid")
    private boolean is_paid;

    @Column(name = "id_user")
    private Integer id_user;

    @Column(name = "id_employee")
    private Integer id_employee;

  //  @Column(name = "id_for_each")
   //s private

   // @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
  //  private List<ProductCustomer> productCustomerList;

}
