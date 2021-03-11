package com.cnpm.fashion_shop.common.request;

import com.cnpm.fashion_shop.util.filterUtil.Implements.SearchHelperImpl;
import lombok.Getter;
import lombok.Setter;

import static com.cnpm.fashion_shop.common.constant.RequestParamConstants.PAGE_DEFAULT;
import static com.cnpm.fashion_shop.common.constant.RequestParamConstants.SEARCH_DEFAULT;
import static com.cnpm.fashion_shop.common.constant.RequestParamConstants.SIZE_DEFAULT;
import static com.cnpm.fashion_shop.common.constant.RequestParamConstants.SORT_DEFAULT;

public class RequestParamsForGettingList {
    @Getter
    @Setter
    private int page;

    @Getter
    @Setter
    private int size;

    @Getter
    @Setter
    private String sort;

    private String search;

    public RequestParamsForGettingList() {
        page = PAGE_DEFAULT;
        size = SIZE_DEFAULT;
        search = SEARCH_DEFAULT;
        sort = SORT_DEFAULT;
    }

    public String getSearch() {
        return search;
    }

    /**
     *
     * @param search
     * @apiNote custom set to parse by param
     */
    public void setSearch(String search) {
        this.search = cleanSearch(search);
    }

    private String cleanSearch(String input) {
        SearchHelperImpl searchHelper = new SearchHelperImpl(input);
        searchHelper.validate();
        return searchHelper.getSearch();
    }
}

