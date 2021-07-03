<?php

class file_reader
{
  public $data_raw = "";
  public $data_handled = null;

  /**
   * Class constructor.
   */
  public function __construct()
  {
    $this->data_raw .= file_get_contents(dirname(__FILE__, 3) . "/quiz.txt");
    // var_dump();
    $this->data_handled = $this->handle_raw_data($this->data_raw);
    // var_dump($printable);
  }
  ///// PRivate functions is located here
  private function handle_raw_data()
  {
    $data_raw = $this->data_raw;
    $data_handle_1 = preg_split("/Câu [0-9]*:/", $data_raw);
    // var_dump($data_handle_1);
    $data_handle_2 = [];
    foreach ($data_handle_1 as $k => $datas) {
      $new_data = explode("Lời giải:", $datas);
      if (count($new_data) < 2) {
        // var_dump(count($new_data) . "/////");
        continue;
      }
      $result["question"] = $new_data[0];
      $result["answer"] = $new_data[1];
      $result["final_res"] = trim($new_data[1])[strlen(trim($new_data[1])) - 1];
      $result["question_id"] = $k;
      array_push($data_handle_2, $result);
    }
    return ($data_handle_2);
  }

  private function get_random_number(int $num_of_question)
  {
    $list_number = [];
    for ($i = 0; $i < $num_of_question; $i++) {
      $num = (int) floor(rand(1, count($this->data_handled)));
      if (!in_array($num, $list_number)) {
        array_push($list_number, $num);
      } else {
        $i--;
      }
    }
    return $list_number;
  }

  private function test_the_anwser(string $reply, int $question_id)
  {
    foreach ($this->data_handled as $k => $data) {
      if ($data["question_id"] == $question_id) {
        return ($reply == $data["final_res"]);
      }
    }
    return null;
  }
  ///////////// end Private field

  public function load_questions_only()
  {
    $list_questions_only = array_map(function ($question_details) {
      return [$question_details["question_id"], $question_details["question"]];
    }, $this->data_handled);
    // return ($list_questions_only);
    $list_indexes_30 = $this->get_random_number(30);
    $list_question_only_30 = array_filter($list_questions_only, function ($question_key) use ($list_indexes_30) {
      return in_array($question_key, $list_indexes_30);
    },  ARRAY_FILTER_USE_KEY);
    // var_dump(($list_indexes_30));
    return $list_question_only_30;
  }

  public function mark_the_submitted_form(array $submitted_formdata)
  {
    $mark = 0;
    foreach ($submitted_formdata as $k => $fdata) {
      if ($k == "activity") {
        continue;
      } else {
        $question_id = explode("_", $k)[1];
        $reply = $fdata;
        $mark += ($this->test_the_anwser($reply, $question_id)) ? 1 : 0;
      }
    }
    return $mark / (count($submitted_formdata) - 1) * 10;
  }
}
