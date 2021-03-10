package com.cnpm.fashion_shop.util.filterUtil;

import org.springframework.data.domain.Sort;


public interface OrderFilterHelper extends FilterHelper {
    Sort getSort();
}

