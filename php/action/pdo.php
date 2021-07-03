<?php

class db_connector
{
    private $conn;

    /**
     * Class constructor.
     */
    public function __construct()
    {
        try {
            $this->conn = new PDO("mysql:host=localhost:3306;dbname=quiz_game", "root", "");
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // echo "Connected successfully<br>";
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function get_conn()
    {
        return $this->conn;
    }
}