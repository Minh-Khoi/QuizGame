<?php
require_once dirname(__FILE__) . "/pdo.php";

class model
{
    private $conn;
    /**
     * Class constructor.
     */
    public function __construct()
    {
        $conn = new db_connector();
        $this->conn = $conn->get_conn();
    }

    /***
     *  recieve a new Candidate array and save its info to  database
     *  @param array $candidate_infos array infos of new candidate
     */
    public function create_candidate(array $candidate_infos)
    {
        $SQL = "Insert into candidate(fullname, birth, cmnd, address, job,auth_token, mark) 
                values  (:fullname, :birth, :cmnd, :address, :job, :auth_token, :mark)";
        $stmt = $this->conn->prepare($SQL);
        $stmt->bindParam(":fullname", $candidate_infos["fullname"]);
        $stmt->bindParam(":birth", $candidate_infos["birth"]);
        $stmt->bindParam(":cmnd", $candidate_infos["cmnd"]);
        $stmt->bindParam(":address", $candidate_infos["address"]);
        $stmt->bindParam(":job", $candidate_infos["job"]);
        $stmt->bindParam(":mark", $candidate_infos["mark"]);
        $stmt->bindParam(":auth_token", $candidate_infos["auth_token"]);
        $stmt->execute();
    }

    /*** The name say every thing */
    public function create_tokens_for_new_candidate()
    {
        $raw_token = "";
        $enscrypted_token = null;
        do {
            for ($i = 0; $i < 10; $i++) {
                $rand_num = (int) rand(0, 100);
                $raw_token .= (string) ($rand_num);
            }
            $enscrypted_token = md5($raw_token);
        } while ($this->tokens_existing($enscrypted_token));
        return $enscrypted_token;
    }

    /*** Change info of the candidate */
    public function update_by_column_name(array $candidate_infos, string $column_name)
    {
        $SQL = "Update candidate SET fullname = :fullname,
                                        birth = :birth,
                                        cmnd = :cmnd,
                                        address = :address,
                                        job = :job
                                WHERE " . $column_name . " = :data";
        $stmt = $this->conn->prepare($SQL);
        $stmt->bindParam(":fullname", $candidate_infos["fullname"]);
        $stmt->bindParam(":birth", $candidate_infos["birth"]);
        $stmt->bindParam(":cmnd", $candidate_infos["cmnd"]);
        $stmt->bindParam(":address", $candidate_infos["address"]);
        $stmt->bindParam(":job", $candidate_infos["job"]);
        $stmt->bindParam(":data", $candidate_infos[$column_name]);
        ($stmt->execute());
    }

    /** Delete candidate */
    public function delete_by_token(string $tokens)
    {
        $SQL = "Delete  from candidate 
                                WHERE auth_token = :auth_token";
        $stmt = $this->conn->prepare($SQL);
        $stmt->bindParam(":auth_token", $tokens);
        $stmt->execute();
    }

    /** return a List as array[array] of all candidate in database */
    public function read_all()
    {
        $SQL = "Select id, fullname, birth, cmnd, address, job, mark from candidate";
        $stmt = $this->conn->prepare($SQL);
        $stmt->execute();
        $result_set = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result_set;
    }

    /** 
     * return a List as array[array] of candidate by column name
     * @param string $column_name
     * @param mixed $value value used as indicator for searching
     */
    public function read_by_column(string $column_name,  $value)
    {
        // var_dump($column_name);
        $SQL = "Select id, fullname, birth, cmnd, address, job, mark from candidate where " . $column_name . " = '" . $value . "'";
        $stmt = $this->conn->prepare($SQL);
        // var_dump($SQL);
        $stmt->execute();
        $result_set = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result_set;
    }


    /// PRIVATE FIELDS
    /*** Return the array of tokens of all candidates in database */
    private function get_all_tokens()
    {
        $SQL = "Select auth_token from candidate";
        $stmt = $this->conn->prepare($SQL);
        $stmt->execute();
        $result_set = $stmt->fetchAll(PDO::FETCH_COLUMN);
        return ($result_set);
    }

    /*** Check if a new token created is suitable to provide to new candidate */
    private function tokens_existing(string $token)
    {
        $list_tokens = $this->get_all_tokens();
        return (in_array($token, $list_tokens));
    }
}
