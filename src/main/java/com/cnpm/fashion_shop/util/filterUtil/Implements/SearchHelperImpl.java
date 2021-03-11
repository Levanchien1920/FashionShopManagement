package com.cnpm.fashion_shop.util.filterUtil.Implements;

import com.cnpm.fashion_shop.util.filterUtil.SearchFilterHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.invoke.MethodHandles;

public class SearchHelperImpl implements SearchFilterHelper {
    private String input;
    private boolean flag = false;
    private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    private static final String REGEX_SPECIAL_CHAR = "(?=[]\\[+&|!(){}^\"~*?:\\\\-_$%])";

    public SearchHelperImpl(String input) {
        this.input = input;
    }

    public String getSearch() {
        if (!flag) {
            LOG.warn("You should validate before get search");
        }
        return input.toLowerCase();
    }

    @Override
    public void validate() {
        String trimmedInput = input.trim();

        // Validate full of space then not trim
        if (!trimmedInput.equals(input) && trimmedInput.equals("")) {
            return;
        }

        input = trimmedInput;
        flag = true;
        input = input.replaceAll(REGEX_SPECIAL_CHAR, "\\\\");
    }
}

