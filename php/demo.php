<?php
require_once(dirname(__FILE__) . "/file_data_reader/file_reader.php");
require_once(dirname(__FILE__) . "/action/pdo.php");

// $reader = new file_reader();
// // $reader->get_random_number();
// $printable = array_values($reader->load_questions_only());
// var_dump(($printable));
$db = new db_connector();