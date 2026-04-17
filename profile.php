<?php 

    
    $user_id = $_SESSION['user_id'];
    $username = '';
    $email = '';
    $role_name = '';
    $games = '';
    $playtime = '';
    $user_sql = "SELECT users.username as username, users.email as email, statistics.playtime as playtime, statistics.games as games, roles.name AS role_name 
    FROM `users` 
    JOIN `roles` ON roles.Id_r = users.role_id 
    JOIN `statistics` ON statistics.Id_u = users.Id_u
    WHERE users.Id_u = ?";
    
    if (!$db) {
        echo '<p>Error: Database connection failed</p>';
        return;
    }
    
    $user_stmt = $db->prepare($user_sql);
    if ($user_stmt === false) {
        echo '<p>Error: Could not prepare statement</p>';
        return;
    }
    $user_stmt->bind_param("s", $user_id);
    $user_stmt->execute();
    $user_stmt->bind_result($username, $email, $playtime, $games, $role_name);
    $found = $user_stmt->fetch();
    $user_stmt->close();
?>

<section id="profile-menu">
    <div class="profile-container">
    <div class="profile-header">
        <div class="profile-avatar">
            <img src="./assets/slon.png" alt="User Avatar" class="avatar-image">
        </div>
        <div class="profile-info">
            <h2 class="profile-username"><?php echo htmlspecialchars($username); ?></h2>
            <p class="profile-email"><?php echo htmlspecialchars($email); ?></p>
        </div>
    </div>
    <div class="profile-stats">
        <div class="stat-box">
            <h3 class="stat-label">Games</h3>
            <p class="stat-value"><?php echo htmlspecialchars($games); ?></p>
        </div>
        <div class="stat-box">
            <h3 class="stat-label">Playtime</h3>
            <p class="stat-value"><?php echo htmlspecialchars($playtime); ?></p>
        </div>
    </div>
    <div class="profile-settings">
        <h3 class="profile-settings-header">Settings</h3>
        <button class="profile-button edit-profile">Edit Username</button>
        <button class="profile-button change-password">Change Password</button>
        <form action="logout.php" method="post" class="logout-form">
            <button class="profile-button logout-btn">Log Out</button>
        </form>
    </div>
    <div class="edit-username-popup" id="edit-username-popup">
        <div class="popup-content">
            <div class="popup-header">
                <h2 class="popup-title">Change Username</h2>
                <button class="popup-close-btn" aria-label="Close popup">&times;</button>
            </div>
            <form class="username-form" method="post" action="change_username.php">
                    <div class="form-group">
                        <label for="new-username" class="form-label">New Username</label>
                        <input type="text" id="new-username" class="form-input" placeholder="Enter new username" required name="new_username_username">
                    </div>
                    <div class="form-group">
                        <label for="username-password" class="form-label">Password</label>
                        <input type="password" id="username-password" class="form-input" placeholder="Enter your password" required name="new_username_password">
                    </div>
                    <div class="popup-buttons">
                        <input type="submit" class="popup-submit-btn" value="Confirm">
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>