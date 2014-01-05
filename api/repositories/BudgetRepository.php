<?php

include_once 'AbstractRepository.php';

class BudgetRepository extends AbstractRepository {

    /**
     * @var string
     */
    protected $tableName = 'budget';

    /**
     *
     */
    public function createTable() {
        $statement = $this->pdo->prepare('
            CREATE TABLE IF NOT EXISTS
            ' . $this->tableName . '
            (
                id INT AUTO_INCREMENT,
                PRIMARY KEY (id),
                created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                userId INT,
                FOREIGN KEY (userId) REFERENCES user(id),
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                private BOOL NOT NULL DEFAULT 0
            ) ENGINE = InnoDB;
        ');
        $statement->execute();
    }

    /**
     * @return array
     */
    public function getBudgets() {
        $statement = $this->pdo->prepare('
            SELECT id, created, userId, name, description, private
            FROM ' . $this->tableName . '
            WHERE private = 0;
        ');
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_OBJ);
    }

    /**
     * @param $userId
     *
     * @return array
     */
    public function getBudgetsByUser($userId) {
        $statement = $this->pdo->prepare('
            SELECT id, created, userId, name, description, private
            FROM ' . $this->tableName . '
            WHERE userId = :userId;
        ');
        $statement->bindParam(':userId', $userId);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_OBJ);
    }

    /**
     * @param $userId
     * @param $name
     *
     * @return array
     */
    public function getBudgetByUserAndName($userId, $name) {
        $statement = $this->pdo->prepare('
            SELECT id, created, userId, name, description, private
            FROM ' . $this->tableName . '
            WHERE userId = :userId AND name = :name
            LIMIT 1;
        ');
        $statement->bindParam(':userId', $userId);
        $statement->bindParam(':name', $name);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_OBJ);
    }

    /**
     * @param $userId
     *
     * @return array
     */
    public function getPublicBudgetsByUser($userId) {
        $statement = $this->pdo->prepare('
            SELECT id, created, userId, name, description, private
            FROM ' . $this->tableName . '
            WHERE private = 0 AND userId = :userId;
        ');
        $statement->bindParam(':userId', $userId);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_OBJ);
    }

    /**
     * @param $userId
     * @param $name
     * @param $description
     * @param $private
     *
     * @return stdClass
     */
    public function createBudget($userId, $name, $description, $private) {
        $statement = $this->pdo->prepare('
            INSERT INTO ' . $this->tableName . '
            (userId, name, description, private)
            VALUES (:userId, :name, :description, :private);
        ');
        $statement->bindParam(':userId', $userId);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':description', $description);
        $statement->bindParam(':private', $private, PDO::PARAM_BOOL);
        $statement->execute();

        $budget = new stdClass();
        $budget->id = $this->pdo->lastInsertId();
        $budget->userId = $userId;
        $budget->name = $name;
        $budget->description = $description;
        $budget->private = $private;
        return $budget;
    }
} 