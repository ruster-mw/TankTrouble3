<?php
ini_set('session.use_only_cookies', 1);
session_start();
define('SPRITESSHETS', ['Retro','Neon']);
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true ||
    !isset($_SESSION['role_name']) || !in_array($_SESSION['role_name'], ['admin', 'moderator'])) {
    header("Location: adminlogin.php");
    exit;
}

$db = require "../database.php";

if ($db->connect_error){
    die('blad polaczania z baza: '.$db->connect_error);
}

require_once 'user.php';
$user_object = new User($db);

function redirect($url) {
    header("Location: $url");
    exit();
}


// function call_api(string $method, string $url, array $body = []): array {
//     $ch = curl_init($url);

//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
//     curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

//     if (!empty($body)) {
//         curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
//     }

//     $response = curl_exec($ch);
//     $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
//     curl_close($ch);

//     return ['status' => $status, 'data' => json_decode($response, true)];
// }





if (isset($_GET['delete_id'])) {
    try {
        $user_object->delete(intval($_GET['delete_id'])); 
        $_SESSION['success'] = "delete";
        redirect('index.php');
    } catch (Exception $e) {
        $_SESSION['error'] = "delete";
        redirect('index.php');
    }
}

if (isset($_POST['add-user'])) {
    $username = !empty($_POST['add-username']) ? trim($_POST['add-username']) : false;
    $password = !empty($_POST['add-password']) ? trim($_POST['add-password']) : false;
    $email    = !empty($_POST['add-email'])    ? trim($_POST['add-email'])    : false;
    $role_id  = !empty($_POST['add-role'])     ? intval($_POST['add-role'])   : false;

    if ($username && $password && $email && $role_id) {
        try {
            $user_object->insert($username, $password, $email, $role_id);
            $_SESSION['success'] = "add";
            redirect('index.php');
        } catch (Exception $e) {
            $_SESSION['error'] = "add";
            redirect('index.php');
        }
    }
}

if (isset($_POST['update-user'])) {
    $id       = !empty($_POST['update-id'])       ? intval($_POST['update-id'])  : false;
    $username = !empty($_POST['update-username']) ? trim($_POST['update-username']) : false;
    $password = !empty($_POST['update-password']) ? trim($_POST['update-password']) : null; 
    $email    = !empty($_POST['update-email'])    ? trim($_POST['update-email'])  : false;
    $role_id  = !empty($_POST['update-role'])     ? intval($_POST['update-role']) : false;

    if ($id && $username && $email && $role_id) {
        try {
            $user_object->update($username, $email, $role_id, $id, $password); 
            $_SESSION['success'] = "update";
            redirect('index.php');
        } catch (Exception $e) {
            $_SESSION['error'] = "update";
            redirect('index.php');
        }
    }
}

if (isset($_POST['delete-user'])) {
    $id = !empty($_POST['delete-id']) ? intval($_POST['delete-id']) : false;
    if ($id) {
        try {
            $user_object->delete($id);
            $_SESSION['success'] = "delete";
            redirect('index.php');
        } catch (Exception $e) {
            $_SESSION['error'] = "delete";
            redirect('index.php');
        }
    }
}

require_once 'theme.php';
$theme_object = new Theme($db);

if (isset($_POST['add-theme'])) {
    $theme_data = [
        $_POST['add-theme-name'] ?? false,
        $_POST['add-theme-name'] ?? false,
        $_POST['add-spritesheet'] ?? false,
        $_POST['add-color1'] ?? false,
        $_POST['add-color2'] ?? false,
        $_POST['add-color3'] ?? false,
        $_POST['add-color4'] ?? false,
        $_POST['add-color5'] ?? false,
        $_POST['add-explosion-color'] ?? false,
        $_POST['add-power-color'] ?? false
    ];

    if (!in_array(false, $theme_data)) {
        try {
            $theme_object->insert($theme_data);
            $_SESSION['success'] = "theme-add";
            redirect('index.php');
        } catch (Exception $e) {
            $_SESSION['error'] = "theme-add";
            redirect('index.php');
        }
    } else {
            $_SESSION['error'] = "theme-add";
            redirect('index.php');
    }
}
if (isset($_POST['update-theme'])) {
    $id = !empty($_POST['update-theme-id']) ? intval($_POST['update-theme-id']) : false;
    $theme_data = [
        $_POST['update-theme-name'] ?? false,
        $_POST['update-spritesheet'] ?? false,
        $_POST['update-color1'] ?? false,
        $_POST['update-color2'] ?? false,
        $_POST['update-color3'] ?? false,
        $_POST['update-color4'] ?? false,
        $_POST['update-color5'] ?? false,
        $_POST['update-explosion-color'] ?? false,
        $_POST['update-power-color'] ?? false,
        $_POST['update-theme-name'] ?? false,
    ];

    if ($id && !in_array(false, $theme_data)) {
        try {
            $theme_object->update($theme_data, $id);
            $_SESSION['success'] = "theme-update";
            redirect('index.php');
        } catch (Exception $e) {
            $_SESSION['error'] = "theme-update";
            redirect('index.php');
        }
    } else {
            $_SESSION['error'] = "theme-update";
            redirect('index.php');
    }
}
if ( isset($_POST['delete-theme']) ) {
    $id = !empty($_POST['delete-theme-id']) ? intval($_POST['delete-theme-id']) : false;
    if ($id) {
        try {
            $theme_object->delete($id);
            $_SESSION['success'] = "theme-delete";
            redirect('index.php');
        } catch (Exception $e) {
            $_SESSION['error'] = "theme-delete";
            redirect('index.php');
        }
    }
}


if (isset($_GET['delete_theme_id'])) {
    try {
        $theme_object->delete(intval($_GET['delete_theme_id'])); 
        $_SESSION['success'] = "delete";
        redirect('index.php?yes');
    } catch (Exception $e) {
        $_SESSION['error'] = "delete";
        redirect('index.php?no');
    }
}

?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Panel</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="admin.css">

</head>

<body>

  

  <div id="shell">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="brand">Tank Trouble</div>
        <div class="brand-sub">Admin Panel</div>
      </div>

      <div class="sidebar-section">
        <div class="section-label">Navigation</div>

        <button class="nav-btn active" data-tab="statistics">
          <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="1" y="9" width="3" height="6" rx="0.5" />
            <rect x="6" y="5" width="3" height="10" rx="0.5" />
            <rect x="11" y="2" width="3" height="13" rx="0.5" />
          </svg>
          Statistics
        </button>

        <button class="nav-btn" data-tab="users">
          <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="6" cy="5" r="3" />
            <path d="M1 14c0-3 2-5 5-5s5 2 5 5" />
            <path d="M11 3c1.5.5 2.5 1.8 2.5 3.3s-1 2.8-2.5 3.2" />
            <path d="M13.5 10.5c1 .5 2 1.5 2 3.5" />
          </svg>
          Users
        </button>

        <button class="nav-btn" data-tab="themes">
          <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="8" cy="8" r="3" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3" />
          </svg>
          Themes
        </button>

        <button class="nav-btn" data-tab="settings">
          <svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="8" cy="8" r="2.5" />
            <path d="M8 1.5A6.5 6.5 0 0 1 14.5 8 6.5 6.5 0 0 1 8 14.5 6.5 6.5 0 0 1 1.5 8 6.5 6.5 0 0 1 8 1.5z" stroke-dasharray="2 2" />
          </svg>
          Settings
        </button>
      </div>

      <div class="sidebar-footer">
        <div class="user-chip">
          <div class="avatar">AD</div>
          <div class="user-info">
        <div class="user-name"><?php echo $_SESSION['username']?></div>
        <div class="user-role">role: <?php echo $_SESSION['role_name']?></div>
          </div>
          <form action="../logout.php" method="post">
              <button class="logout-btn" id="logout-btn" title="Sign out" type="submit">
                <svg width="25" height="25" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
                  <path d="M11 11l4-3-4-3M15 8H6" />
                </svg>
              </button>
          </form>
        </div>
      </div>
    </aside>

    <main class="main">
      <div class="topbar">
        <span class="topbar-title">Admin</span>
        <span class="topbar-sep">/</span>
        <span class="topbar-title" id="breadcrumb"><span>Statistics</span></span>
      </div>

        <div class="tab-pane active" id="tab-statistics">
            <div class="card">
                    <div class="header">
                        <div>
                            <p class="label">New users per day</p>
                            <p class="total" id="totalLabel">— total from last 30 days</p>
                        </div>
                        <div class="legend">
                            <span class="legend-dot"></span> Daily signups
                        </div>
                    </div>
 
                    <div class="chart-wrap">
                        <canvas id="usersChart"
                        role="img"
                        aria-label="Area chart showing daily new user signups over 30 days.">
                        Daily signups ranged from 1 to 17 over 30 days.
                        </canvas>
                    </div>
 
                    <div id="tooltip">
                        <div class="tip-date" id="tip-date"></div>
                        <div class="tip-val"  id="tip-val"></div>
                    </div>
            </div>
            <div class="statistics-table-wrapper">
                <table class="statistics-table">
                <thead class="statistics-headers">
                <tr>
                    <th>Id</th>
                    <th>username</th>
                    <th>playtime</th>
                </tr>
              </thead>
              <tbody class="statistics-data-cells">
                   <?php
                        $playtime_stats_sql = "SELECT users.Id_u, users.username, `playtime` FROM `statistics` join users on users.Id_u = statistics.Id_u ORDER BY `playtime` DESC limit 10";
                        $result_playtime = $db->query($playtime_stats_sql);
                        if($result_playtime->num_rows > 0){
                        foreach($result_playtime as $row){
                            echo "<tr>
                                    <td> <span>".$row['Id_u']."</span></td>
                                    <td>".$row['username']."</td>
                                    <td>".$row['playtime']."</td>
                                </tr>";
                        }
                    }
                    ?>              
              </tbody>
                </table>
                <table class="statistics-table">
                <thead class="statistics-headers">
                <tr>
                    <th>Id</th>
                    <th>username</th>
                    <th>playtime</th>
                </tr>
              </thead>
              <tbody class="statistics-data-cells">
                   <?php
                        $games_stats_sql = "SELECT users.Id_u, users.username, `games` FROM `statistics` join users on users.Id_u = statistics.Id_u ORDER BY `games` DESC limit 10";
                        $result_games = $db->query($games_stats_sql);
                        if($result_games->num_rows > 0){
                        foreach($result_games as $row){
                            echo "<tr>
                                    <td>".$row['Id_u']."</td>
                                    <td>".$row['username']."</td>
                                    <td>".$row['games']."</td>
                                </tr>";
                        }
                    }
                    ?>              
              </tbody>
                </table>
            </div>
            
        </div>

        <div class="tab-pane" id="tab-users">
          <?php 
              if(isset($_SESSION['success'])){
                  $success = $_SESSION["success"];
                  echo "<div class='message'>";
                  switch($success){
                      case "add":
                        echo "Succesfully added!";
                        break;
                      case "update":
                        echo "Succesfully updated!";
                        break;
                      case "delete":
                        echo "Succesfully deleted!";
                        break;
                      default:
                        echo "incorrect value";
                  }
                  echo "</div>";
                  unset($_SESSION['success']);
              } else if (isset($_SESSION['error'])){
                $error = $_SESSION["error"];
                  echo "<div class='message'>";
                  switch($error){
                      case "add":
                        echo "Oopss.. something went wrong with adding";
                        break;
                      case "update":
                        echo "Oopss.. something went wrong with updating";
                        break;
                      case "delete":
                        echo "Oopss.. something went wrong with deleting";
                        break;
                      default:
                        echo "incorrect value";
                  }
                  echo "</div>";
                  unset($_SESSION['error']);
              }
          ?>
          <div class="table-wrapper">
            <table class="users-table">
              <thead class="users-headers">
                <tr>
                  <th>Id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>role</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody class="users-data-cells">
                <?php
                  $showusers_sql = "SELECT Id_u, username, email, roles.name as role_name FROM `users` join `roles` on roles.Id_r = users.role_id";
                  $result = $db->query($showusers_sql);
                  if($result->num_rows > 0){
                      foreach($result as $row){
                          echo "<tr><td>".$row['Id_u']."</td><td>".$row['username']."</td><td>".$row['email']."</td><td>".$row['role_name']."</td><td><a href='index.php?delete_id=".$row['Id_u']."' class='important'>delete</a> </td></tr>";
                      }
                  }
                ?>
              </tbody>
            </table>
          </div>
          <section class="user-section add-users-section">
              <h2>Add New User <span class="users-hint">fields marked with * are required</span></h2>
              <form action="" method="post" class="add-users-form">
                <label for="add-username"><span class="important">*</span>Username:</label><input type="text" name="add-username" placeholder="superGamerz12" id="add-username" required>
                <label for="add-password"><span class="important">*</span>Password:</label><input type="password" name="add-password" placeholder="Str0ngP4ssw0rd" id="add-password" required>
                <label for="add-email"><span class="important">*</span>Email:</label><input type="email" name="add-email" placeholder="johndoe@gmail.com" id="add-email" required>
                <label for="add-role"><span class="important">*</span>Role</label>
                <select name="add-role" id="add-role">
                    <?php 
                        $roles_sql = "SELECT Id_r, name FROM `roles`";
                        $result = $db->query($roles_sql);
                        if($result->num_rows > 0){
                            foreach($result as $row){
                                echo "<option value='".$row['Id_r']."'>".$row['name']."</option>";
                            }
                        }
                    ?>
                </select>
                <input type="submit" name="add-user" id="add-user" value="Confirm">
              </form>
          </section>
          <section class="user-section update-users-section">
              <h2>Update user <span class="users-hint">fields marked with * are required</span></h2>
              <form action="" method="post" class="update-users-form">
                <label for="update-id"><span class="important">*</span>user Id:</label><input type="number" name="update-id" placeholder="31" id="update-id" required>
                <label for="update-username">Username:</label><input type="text" name="update-username" placeholder="superGamerz12" id="update-username">
                <label for="update-password">Password:</label><input type="password" name="update-password" placeholder="Str0ngP4ssw0rd" id="update-password">
                <label for="update-email">Email:</label><input type="email" name="update-email" placeholder="johndoe@gmail.com" id="update-email">
                <label for="update-role">New Role</label>
                <select name="update-role" id="update-role">
                    <?php 
                        $roles_sql = "SELECT Id_r, name FROM `roles`";
                        $result = $db->query($roles_sql);
                        if($result->num_rows > 0){
                            foreach($result as $row){
                                echo "<option value='".$row['Id_r']."'>".$row['name']."</option>";
                            }
                        }
                    ?>
                </select>
                <input type="submit" name="update-user" id="update-user" value="Confirm">
              </form>
          </section>
           <section class="user-section delete-users-section">
              <h2>Delete user <span class="users-hint">fields marked with * are required</span></h2>
              <form action="" method="post" class="delete-users-form">
                <label for="delete-id"><span class="important">*</span>user Id:</label><input type="number" name="delete-id" placeholder="31" id="delete-id" required>
                <input type="submit" name="delete-user" id="delete-user" value="Confirm">
              </form>
          </section>
        </div>

        <div class="tab-pane" id="tab-themes">
          <?php 
              if(isset($_SESSION['success'])){
                  $success = $_SESSION["success"];
                  echo "<div class='message'>";
                  switch($success){
                      case "theme-add":
                        echo "Succesfully added!";
                        break;
                      case "theme-update":
                        echo "Succesfully updated!";
                        break;
                      case "theme-delete":
                        echo "Succesfully deleted!";
                        break;
                      default:
                        echo "incorrect value";
                  }
                  echo "</div>";
                  unset($_SESSION['success']);
              } else if (isset($_SESSION['error'])){
                $error = $_SESSION["error"];
                  echo "<div class='message'>";
                  switch($error){
                      case "theme-add":
                        echo "Oopss.. something went wrong with adding";
                        break;
                      case "theme-update":
                        echo "Oopss.. something went wrong with updating";
                        break;
                      case "theme-delete":
                        echo "Oopss.. something went wrong with deleting";
                        break;
                      default:
                        echo "incorrect value";
                  }
                  echo "</div>";
                  unset($_SESSION['error']);
              }
          ?>
            <div class="themes-table-wrapper">
            <table class="themes-table">
                <thead class="themes-headers">
                <tr>
                    <th>Id</th>
                    <th>title</th>
                    <th>Colors</th>
                    <th>Spritesheet</th>
                    <th>delete</th>
                </tr>
              </thead>
              <tbody class="themes-data-cells">
                   <?php
                        $showthemes_sql = "SELECT Id_t,config FROM `themes`";
                        $result_themes = $db->query($showthemes_sql);
                        if($result_themes->num_rows > 0){
                        foreach($result_themes as $row){
                            $json = $row['config'];
                            $array = json_decode($json, true);
                            echo "<tr>
                                    <td>".$row['Id_t']."</td>
                                    <td>".$array['title']."</td>
                                    <td style='display:flex'>
                                        <div class='color-preview' style='background-color: ".$array['colors'][0]."'></div>
                                        <div class='color-preview' style='background-color: ".$array['colors'][1]."'></div>
                                        <div class='color-preview' style='background-color: ".$array['colors'][2]."'></div>
                                        <div class='color-preview' style='background-color: ".$array['colors'][3]."'></div>
                                        <div class='color-preview' style='background-color: ".$array['colors'][4]."'></div>
                                        <div class='color-preview' style='background-color: ".$array['powerColor']."'></div>
                                        <div class='color-preview' style='background-color: ".$array['explosionParticle']."'></div>
                                    </td>
                                    <td>".$array['tankSprites']."</td>
                                    <td><a href='index.php?delete_theme_id=".$row['Id_t']."' class='important'>delete</a> </td>
                                </tr>";
                        }
                    }
                    ?>              
              </tbody>
            </table>
            </div>
          <section class="theme-section add-theme-section">
              <h2>Add New Theme <span class="users-hint">fields marked with * are required</span></h2>
              <form action="" method="post" class="add-theme-form">
                <label for="add-theme-name"><span class="important">*</span>Theme Name:</label>
                <input type="text" name="add-theme-name" placeholder="Dark Mode" id="add-theme-name" required>
                
                <div class="colors-grid">
                  <div class="color-picker-group">
                    <label for="add-color1">Color 1:</label>
                    <input type="text" name="add-color1" class="color-input" id="add-color1" value="#020206" placeholder="#RRGGBB or #RRGGBBAA" required>
                  </div>
                  <div class="color-picker-group">
                    <label for="add-color2">Color 2:</label>
                    <input type="text" name="add-color2" class="color-input" id="add-color2" value="#ffffff" placeholder="#RRGGBB or #RRGGBBAA" required>
                  </div>
                  <div class="color-picker-group">
                    <label for="add-color3">Color 3:</label>
                    <input type="text" name="add-color3" class="color-input" id="add-color3" value="#00ffff" placeholder="#RRGGBB or #RRGGBBAA" required>
                  </div>
                  <div class="color-picker-group">
                    <label for="add-color4">Color 4:</label>
                    <input type="text" name="add-color4" class="color-input" id="add-color4" value="#090913" placeholder="#RRGGBB or #RRGGBBAA" required>
                  </div>
                  <div class="color-picker-group">
                    <label for="add-color5">Color 5:</label>
                    <input type="text" name="add-color5" class="color-input" id="add-color5" value="#00ffff80" placeholder="#RRGGBB or #RRGGBBAA" required>
                  </div>
                </div>

                <div class="colors-grid">
                  <div class="color-picker-group">
                    <label for="add-power-color">Power Color:</label>
                    <input type="text" name="add-power-color" class="color-input" id="add-power-color" value="#00dddd" placeholder="#RRGGBB or #RRGGBBAA" required>
                  </div>
                  <div class="color-picker-group">
                    <label for="add-explosion-color">Explosion Color:</label>
                    <input type="text" name="add-explosion-color" class="color-input" id="add-explosion-color" value="#00ffff4d" placeholder="#RRGGBB or #RRGGBBAA" required>
                  </div>
                </div>

                <label for="add-spritesheet"><span class="important">*</span>Spritesheet:</label>
                <select name="add-spritesheet" id="add-spritesheet" required>
                  <?php  
                   foreach(SPRITESSHETS as $sheet){
                    echo "<option value='$sheet'>$sheet</option>";
                   }
                   ?>
                </select>
                <input type="submit" name="add-theme" id="add-theme" value="Confirm">
              </form>
          </section>

          <section class="theme-section update-theme-section">
              <h2>Update Theme <span class="users-hint">fields marked with * are required</span></h2>
              <form action="" method="post" class="update-theme-form">
                <label for="update-theme-id"><span class="important">*</span>Theme Id:</label>
                <input type="number" name="update-theme-id" placeholder="1" id="update-theme-id" required>
                
                <label for="update-theme-name">Theme Name:</label>
                <input type="text" name="update-theme-name" placeholder="Dark Mode" id="update-theme-name">
                
                <div class="colors-grid">
                  <div class="color-picker-group">
                    <label for="update-color1">Color 1:</label>
                    <input type="text" name="update-color1" class="color-input" id="update-color1" value="#020206" placeholder="#RRGGBB or #RRGGBBAA">
                  </div>
                  <div class="color-picker-group">
                    <label for="update-color2">Color 2:</label>
                    <input type="text" name="update-color2" class="color-input" id="update-color2" value="#ffffff" placeholder="#RRGGBB or #RRGGBBAA">
                  </div>
                  <div class="color-picker-group">
                    <label for="update-color3">Color 3:</label>
                    <input type="text" name="update-color3" class="color-input" id="update-color3" value="#00ffff" placeholder="#RRGGBB or #RRGGBBAA">
                  </div>
                  <div class="color-picker-group">
                    <label for="update-color4">Color 4:</label>
                    <input type="text" name="update-color4" class="color-input" id="update-color4" value="#090913" placeholder="#RRGGBB or #RRGGBBAA">
                  </div>
                  <div class="color-picker-group">
                    <label for="update-color5">Color 5:</label>
                    <input type="text" name="update-color5" class="color-input" id="update-color5" value="#00ffff80" placeholder="#RRGGBB or #RRGGBBAA">
                  </div>
                </div>

                <div class="colors-grid">
                  <div class="color-picker-group">
                    <label for="update-power-color">Power Color:</label>
                    <input type="text" name="update-power-color" class="color-input" id="update-power-color" value="#00dddd" placeholder="#RRGGBB or #RRGGBBAA">
                  </div>
                  <div class="color-picker-group">
                    <label for="update-explosion-color">Explosion Color:</label>
                    <input type="text" name="update-explosion-color" class="color-input" id="update-explosion-color" value="#00ffff4d" placeholder="#RRGGBB or #RRGGBBAA">
                  </div>
                </div>

                <label for="update-spritesheet">Spritesheet:</label>
                <select name="update-spritesheet" id="update-spritesheet">
                   <?php  
                   foreach(SPRITESSHETS as $sheet){
                    echo "<option value='$sheet'>$sheet</option>";
                   }
                   ?>
                </select>
                <input type="submit" name="update-theme" id="update-theme" value="Confirm">
              </form>
          </section>

          <section class="theme-section delete-theme-section">
              <h2>Delete Theme <span class="users-hint">fields marked with * are required</span></h2>
              <form action="" method="post" class="delete-theme-form">
                <label for="delete-theme-id"><span class="important">*</span>Theme Id:</label>
                <input type="number" name="delete-theme-id" placeholder="1" id="delete-theme-id" required>
                <input type="submit" name="delete-theme" id="delete-theme" value="Confirm">
              </form>
          </section>
        </div>

        <div class="tab-pane" id="tab-settings">
            <div class="settings-container">
              <header class="settings-header">
                <h2>System Configuration</h2>
                <p class="settings-hint">Global parameters for the Tank Trouble environment</p>
              </header>

              <div class="settings-form">
                <div class="settings-group">
                  <h3 class="group-title">General</h3>

                  <div class="setting-item">
                    <div class="setting-info">
                      <label>Light Mode</label>
                      <span>set light mode for the panel </span>
                    </div>
                    <label class="switch">
                      <input type="checkbox" name="maintenance_mode" id="light-mode">
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>

                <div class="settings-group">
                  <h3 class="group-title">Security</h3>
                  <div class="setting-input-row">
                    <label for="api-key">Free Claude Code API Key</label>
                    <div class="input-with-action">
                      <input type="password" name="api_key" id="api-key" value="youwish" readonly>
                      <button type="button" class="action-link" id="api-btn">Show</button>
                    </div>
                  </div>
                </div>

                <!-- <div class="settings-actions">
                  <button type="submit" name="save-settings" class="save-btn">Save Changes</button>
                  <button type="reset" class="reset-btn">Discard</button>
                </div> -->
                </div>
            </div>
        </div>

    </main>

  </div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<script src="admin.js"></script>
</body>

</html>

<?php 
    $db->close();
?>