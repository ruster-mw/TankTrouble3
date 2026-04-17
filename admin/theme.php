<?php
class Theme {
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
            $paramRefs = [];
            foreach ($params as &$param) {
                $paramRefs[] = &$param;
            }
            $stmt->bind_param($types, ...$paramRefs);
        }
        $stmt->execute();
        return $stmt;
    }

    public function insert($theme_data) {
        $sql = "INSERT INTO themes (title, config)
                VALUES 
                (
                  ?,                  
                  JSON_OBJECT(
                    'title', ?,
                    'tankSprites', ?,
                    'colors', JSON_ARRAY(
                      ?,
                      ?,
                      ?,
                      ?,
                      ?
                    ),
                    'explosionParticle', ?,
                    'powerColor', ?
                  )
                )";
        $this->run_query($sql, $theme_data, "ssssssssss");
        return true;
    }

    public function update($theme_data, $id) {
        $sql = "UPDATE themes SET config = JSON_OBJECT(
                    'title', ?,
                    'tankSprites', ?,
                    'colors', JSON_ARRAY(
                      ?,
                      ?,
                      ?,
                      ?,
                      ?
                    ),
                    'explosionParticle', ?,
                    'powerColor', ?
                  ), `title` = ? WHERE Id_t = ?";
        $this->run_query($sql, [...$theme_data, $id], "ssssssssssi");
        return true;
    }

    public function delete($id) {
        $sql = "DELETE FROM `themes` WHERE Id_t=?";
        $this->run_query($sql, [$id], "i");
        return true;
    }
}
?>