<?php


//Validate
function validateX($xVal): bool
{
    if(isset($xVal) and is_numeric($xVal)){
        $x_nums = [-2,-1.5,-1,-0.5,0,0.5,1,1.5,2];
        return in_array($xVal,$x_nums,);
    }
    return false;
}

function validateY($yVal): bool
{
    $y_min = -3;
    $y_max = 5;
    $numY = str_replace(',', '.', $yVal);
    if(isset($numY) and is_numeric($numY)){
        return $y_min <= $numY && $y_max >= $numY;
    }
    return false;
}

function validateR($rVal): bool
{
    $r_min = 2;
    $r_max = 5;
    $numR = str_replace(',', '.', $rVal);
    if(isset($numR) and is_numeric($numR)){
        return $r_min <= $numR && $r_max >= $numR;
    }
    return false;
}

function validate($xVal,$yVal,$rVal): bool
{
    return validateX($xVal) && validateY($yVal) && validateR($rVal);
}

//Check Point
function checkTriangle($xVal,$yVal,$rVal): bool
{
    return $xVal <= 0 && $yVal <=0 && $xVal >= -$rVal/2 && $yVal >= -$rVal/2 && ($rVal/2 * $rVal/2)/2 >= abs($yVal) + abs($xVal);
}

function checkRectangle($xVal,$yVal,$rVal): bool
{
    return $xVal >= 0 && $yVal >= 0 && $xVal <= $rVal/2 && $yVal <= $rVal;
}

function checkCircle($xVal, $yVal, $rVal): bool
{
    return $xVal <= 0 && $yVal >= 0 && sqrt($xVal*$xVal + $yVal*$yVal) <= $rVal;
}

function checkPoint($xVal, $yVal, $rVal): bool
{
    return checkTriangle($xVal, $yVal,$rVal) || checkRectangle($xVal, $yVal,$rVal) || checkCircle($xVal, $yVal,$rVal);
}

session_start();
if(!isset($_SESSION['datas'])){
    $_SESSION['datas'] = array();
}

$xVal = $_GET['xVal'];
$yVal = $_GET['yVal'];
$rVal = $_GET['rVal'];

$timezoneOffset = $_GET['timezone'];

$validation = validate($xVal,$yVal,$rVal);

if($validation){
    $result = checkPoint($xVal, $yVal, $rVal);
    date_default_timezone_set('UTC');
    $current_time = date('d-m-y h:i:s',time()-$timezoneOffset*60);
    $executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'],7);

    $jsonArray = array($xVal,$yVal,$rVal,$current_time,$executionTime,$result,$validation);
    $jsonData = json_encode($jsonArray);
    array_push($_SESSION['datas'],$jsonArray);
    echo $jsonData;
}
else{
    $result = false;
}



