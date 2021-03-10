//package com.cnpm.fashion_shop.util.filterUtil.Implements;
//
//import com.cnpm.fashion_shop.common.exception.BadRequestException;
//import com.cnpm.fashion_shop.util.filterUtil.OrderFilterHelper;
//import org.springframework.data.domain.Sort;
//
//import java.util.List;
//
//
//
//
//public class OrderFilterHelperImpl implements OrderFilterHelper {
////    private boolean isColumnValid = false;
////    private final List<String> sortColumnsAllow;
////    private final String sortColumn;
////    private final Sort.Direction direction;
////
////    public OrderFilterHelperImpl(String order, List<String> sortColumnsAllow) {
////        /*
////         * Case: FE let ...&sort=&.... will get empty string
////         * Let sort column to be empty to when validate will not match column validate
////         */
////        this.sortColumnsAllow = sortColumnsAllow;
////        if (order.equals("")) {
////            sortColumn = SORT_DEFAULT;
////            direction = Sort.Direction.DESC;
////            return;
////        }
////        char directionCharacter = order.charAt(0);
////
////        if (directionCharacter == '-') {
////            sortColumn = order.substring(1);
////            direction = Sort.Direction.DESC;
////        }
////        else {
////            sortColumn = order;
////            direction = Sort.Direction.ASC;
////        }
////    }
////
////    public Sort getSort() {
////        return Sort.by(direction, sortColumn);
////    }
////
////    @Override
////    public void validate() {
////        for (String currentCol : sortColumnsAllow) {
////            if (currentCol.equals(sortColumn)) {
////                isColumnValid = true;
////                break;
////            }
////        }
////
////        if (!isColumnValid) {
////            throw new BadRequestException(sortColumn + " is not valid to be sorted. It should be " + sortColumnsAllow.toString());
////        }
////    }
//}
//
