<?php
require_once dirname(__FILE__) . "/file_data_reader/file_reader.php";
require_once dirname(__FILE__) . "/client_url.php";

error_reporting(E_ERROR);

$client = new client_url();
header("Access-Control-Allow-Origin: " . $client->url_1);
// var_dump($client->url_1);

$activity = $_POST["activity"];
if ($activity == "load_questions_list") {
  // echo $activity;
  $reader = new file_reader();
  echo json_encode($reader->data_handled);
}