<?php
require_once dirname(__FILE__) . "/file_data_reader/file_reader.php";
require_once dirname(__FILE__) . "/client_url.php";
require_once dirname(__FILE__) . "/action/action.php";

error_reporting(E_ERROR);

$client = new client_url();
header("Access-Control-Allow-Origin: " . $client->url_1);
// var_dump($client->url_1);

$activity = $_POST["activity"];
if ($activity == "load_questions_list") {
  // echo $activity;
  $num_of_questions = $_POST["numOfQuestions"];
  $action = new action();
  echo json_encode($action->load_question_list($num_of_questions));
} else if ($activity == "handle_quiz_submitted") {
  $action = new action();
  // var_dump($_POST);
  echo json_encode($action->handle_quiz_submitted($_POST));
} else if ($activity == "add_new_candidate") {
  $action = new action();
  $token_of_new_candidate = $action->add_new_candidate($_POST);
  echo $token_of_new_candidate;
} else if ($activity == "load_top_list") {
  $action = new action();
  $list = $action->load_top_list();
  echo json_encode($list);
} else if ($activity == "lookup_candidate") {
  $action = new action();
  $candidate_info = $action->lookup_candidate($_POST);
  echo json_encode($candidate_info);
  // var_dump($_POST);
} else if ($activity == "update_candidate") {
  $action = new action();
  $action->update_candidate($_POST);
}