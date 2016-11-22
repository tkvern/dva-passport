<?php
if (!function_exists('null_or_value')) {
    /*
     * 将空值转化为null, 非空值不变
     */
    function null_or_value($value)
    {
        if (empty($value)) {
            return null;
        } else {
            return $value;
        }
    }
}
?>