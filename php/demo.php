<?php
require_once(dirname(__FILE__) . "/file_data_reader/file_reader.php");
require_once(dirname(__FILE__) . "/action/pdo.php");
require_once(dirname(__FILE__) . "/action/model.php");
require_once(dirname(__FILE__) . "/action/action.php");


// $reader = new file_reader();
// // $reader->get_random_number();
// $printable = array_values($reader->load_questions_only());
// var_dump(($printable));
// $db = new db_connector();
// $model = new model();
$reader = new file_reader();
$model = new model();
$action = new action();
// $new_candidate = [
//     "fullname" => "Jesong the Great",
//     "birth" => "10/03/1995",
//     "cmnd" => "191871124",
//     "address" => "01 Nguyen Duc Tinh St., Xuan Phu ward, Hue city, Thua Thien Hue province",
//     "job" => "Programmer",
// ];
// var_dump($action->lookup_candidate());
$data = [
    'id' => "1",
    'fullname' => "Jesong đại đế",
    'birth' => "15/05/1492",
    'cmnd' => "651651515616",
    'address' => "Pongyang, korea",
    'job' => "King"
];

var_dump($action->token_is_true($data, "HHHHHHHHHHHHHHlfsdkjfoijdosfjp"));