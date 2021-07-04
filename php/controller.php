<?php
require_once dirname(__FILE__) . "/file_data_reader/file_reader.php";
require_once dirname(__FILE__) . "/client_url.php";
require_once dirname(__FILE__) . "/action/model.php";

error_reporting(E_ERROR);

$client = new client_url();
header("Access-Control-Allow-Origin: " . $client->url_1);
// var_dump($client->url_1);

$activity = $_POST["activity"];
if ($activity == "load_questions_list") {
  // echo $activity;
  $action = new action();
  echo json_encode($action->load_question_list());
} else if ($activity == "handle_quiz_submitted") {
  $action = new action();
  echo $action->handle_quiz_submitted($_POST);
}