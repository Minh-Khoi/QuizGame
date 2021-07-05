<?php
// require_once dirname(__FILE__) . "/pdo.php";
require_once dirname(__FILE__) . "/model.php";
require_once dirname(__FILE__, 2) . "/file_data_reader/file_reader.php";

class action
{
    /** For the request "activity" : load_question_list */
    public function load_question_list($num_of_questions)
    {
        $reader = new file_reader();
        return (array_values($reader->load_questions_only($num_of_questions)));
    }

    /** 
     * for the request "activity" : handle_quiz_submitted 
     * @param array $submitted_data actually it is the $_POST array
     * @return array with the 2 keys: "marked" and "got_top"
     */
    public function handle_quiz_submitted(array $submitted_data)
    {
        $reader = new file_reader();
        $model = new model();

        $mark = $reader->mark_the_submitted_form($submitted_data);
        $result = [
            "marked" => $mark,
            "got_top" => ($mark >= 9) ? true : false
        ];
        return $result;
    }
}