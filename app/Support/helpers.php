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

if(! function_exists('is_true')) {
    function is_true($val, $return_null=false){
        $boolval = ( is_string($val) ? filter_var($val, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) : (bool) $val );
        return ( $boolval === null && !$return_null ? false : $boolval );
    }
}
?>