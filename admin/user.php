<?php
class User {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    private function run_query($sql, $params = [], $types = '') {
        $stmt = $this->db->prepare($sql);
        if ($stmt === false) {
            throw new RuntimeException('blad zapytania: ' . $this->db->error);
        }
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }
        $stmt->execute();
        return $stmt->get_result();
    }

    public function insert($username, $password, $email, $role_id) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO `users` (username, password, email, role_id, created_at) VALUES (?,?,?,?,?)";
        $stmt = $this->db->prepare($sql);
        $current_time = date('Y-m-d H:i:s');
        $stmt->bind_param("sssis", $username, $hashed_password, $email, $role_id, $current_time);
        $stmt->execute();
    
        $user_id = $this->db->insert_id;
    
        $stats_sql = "INSERT INTO `statistics` (`Id_u`, `playtime`, `games`) VALUES (?, '00:00:00', 0)";
        $this->run_query($stats_sql, [$user_id], "i");
        $random_binary = random_bytes(32);
        $token = bin2hex($random_binary);
        $token_sql = "Update `users` Set login_token=? where Id_u=?";
        $this->run_query($token_sql, [$token, $user_id], "si");
        
        return true;
    }

    public function update($username, $email, $role_id, $id, $password = null) {
        if ($password !== null) {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $sql = "UPDATE `users` SET username=?, password=?, email=?, role_id=? WHERE Id_u=?";
            $this->run_query($sql, [$username, $hashed_password, $email, $role_id, $id], "sssii");
        } else {
            $sql = "UPDATE `users` SET username=?, email=?, role_id=? WHERE Id_u=?";
            $this->run_query($sql, [$username, $email, $role_id, $id], "ssii");
        }
        return true;
    }

    public function delete($id) {
        $sql = "DELETE FROM `users` WHERE Id_u=?";
        $this->run_query($sql, [$id], "i");
        return true;
    }
    public function update_stats($id, $playtime, $games){
        $sql = "UPDATE `statistics` SET playtime=ADDTIME(playtime, ?), games=games+? WHERE Id_u=?";
        $this->run_query($sql, [$playtime, $games, $id], "sii");
        return true;
    }
}
?>