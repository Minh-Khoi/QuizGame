<?php
require_once(dirname(__FILE__) . "/file_data_reader/file_reader.php");
require_once(dirname(__FILE__) . "/action/pdo.php");
require_once(dirname(__FILE__) . "/action/model.php");

// $reader = new file_reader();
// // $reader->get_random_number();
// $printable = array_values($reader->load_questions_only());
// var_dump(($printable));
// $db = new db_connector();
$model = new model();
// $new_candidate = [
//     "fullname" => "Jesong the Great",
//     "birth" => "10/03/1995",
//     "cmnd" => "191871124",
//     "address" => "01 Nguyen Duc Tinh St., Xuan Phu ward, Hue city, Thua Thien Hue province",
//     "job" => "Programmer",
// ];
// $model->get_all_tokens();