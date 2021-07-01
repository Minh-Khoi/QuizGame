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
      array_push($data_handle_2, $result);
    }
    return ($data_handle_2);
  }
}
