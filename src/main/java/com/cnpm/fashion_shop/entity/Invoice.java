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
public class Invoice{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Column(name = "id_invoice")
    private int id_invoice;

    @Column(name = "total_money")
    private Long totalMoney;

    @Column(name = "is_paid")
    private boolean is_paid;

  //  @Column(name = "id_for_each")
   //s private

   // @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
  //  private List<ProductCustomer> productCustomerList;

}
