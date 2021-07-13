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

        $mark = $reader->mark_the_submitted_form($submitted_data);
        $result = [
            "marked" => $mark,
            // "got_top" => ($mark >= 0) ? true : false /// THis line is used for debugging
            "got_top" => ($mark >= 9) ? true : false /// THis line must work
        ];
        return $result;
    }

    /**
     * For the activity: "add_new_candidate"
     * @param array $submitted_data actually it is the $_POST array
     * @return string enscrypted token for new candidate
     */
    public function add_new_candidate(array $submitted_data)
    {
        $candidate_infos = array_filter($submitted_data, function ($key) {
            return $key != "activity";
        }, ARRAY_FILTER_USE_KEY);
        $model = new model();
        $token_of_new_candidate = $model->create_tokens_for_new_candidate();
        $candidate_infos["auth_token"] = $token_of_new_candidate;
        $model->create_candidate($candidate_infos);
        return $token_of_new_candidate;
    }

    /**
     * For the activity: "load_top_list"
     * @return array[array] list of exelent candidates. The subarray is the candidate infos
     */
    public function load_top_list()
    {
        $model = new model();
        $list_candidates = $model->read_all();
        return $list_candidates;
    }

    /**
     * For the activity: "lookup_candidate"
     * @param array $submitted_data actually it is the $_POST array, it only have 2 property "activity" and "candidate_id"
     * @return array info of candidate look up
     */
    public function lookup_candidate(array $submitted_data)
    {
        $candidate_lookup_request = array_filter($submitted_data, function ($key) {
            return $key != "activity";
        }, ARRAY_FILTER_USE_KEY);
        $model = new model();
        // var_dump($candidate_lookup_request);
        $candidate_infos = $model->read_by_column("id", $candidate_lookup_request["candidate_id"])[0];
        return $candidate_infos;
    }

    /**
     * For the activity: "update_candidate"
     * @param array $submitted_data actually it is the $_POST array, 
     * @return void or an error string
     */
    public function update_candidate(array $submitted_data)
    {
        $candidate_infos = array_filter($submitted_data, function ($key) {
            return $key != "activity";
        }, ARRAY_FILTER_USE_KEY);
        $model = new model();
        if ($this->token_is_true($candidate_infos, $candidate_infos['auth_token'])) {
            $model->update_by_column_name($candidate_infos, "id");
        } else {
            echo "Token wrong!! Candidate updating FAILED";
        }
        // var_dump($candidate_infos);
    }

    /**
     * For the activity: "delete_candidate"
     * @param array $submitted_data actually it is the $_POST array, 
     * @return void or an error string
     */
    public function delete_candidate(array $submitted_data)
    {
        $candidate_infos = array_filter($submitted_data, function ($key) {
            return $key != "activity";
        }, ARRAY_FILTER_USE_KEY);
        $model = new model();
        if ($this->token_is_true($candidate_infos, $candidate_infos['auth_token'])) {
            $model->delete_by_token($submitted_data["auth_token"]);
        } else {
            echo "Token wrong!! Candidate deleting FAILED";
        }
    }


    //// PRIVATE FIELDS
    private function token_is_true(array $candidate_checked, string $token)
    {
        $model = new model();
        $candidate_by_token = $model->read_by_column("auth_token", $token);
        // var_dump($candidate_checked);
        $is_true = $candidate_by_token[0]['id'] == $candidate_checked['id'];
        return ($is_true) ? 1 : 0;
    }
}