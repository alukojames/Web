<?php
session_set_cookie_params(0);
session_start();

if(isset($_SESSION['datas'])){
    $id = count($_SESSION['datas']);
    foreach (array_reverse($_SESSION['datas']) as $data){

        echo "<tr>";
        echo "<td>" . $data[0] . "</td>";
        echo "<td>" . $data[1] . "</td>";
        echo "<td>" . $data[2] . "</td>";
        echo "<td>" . $data[3]  . "</td>";
        echo "<td>" . $data[4]  . "</td>";
        if($data[5]){
            echo "<td class='true'>True</td>";
        }
        else{
            echo "<td class='false'>False</td>";
        }
        echo "</tr>";
    }
}
