<div class="login-section" >
                    <h1 class="login-header">Log In</h1> 
                    <form action="login.php" method="post" class="login-form">
                        <label for="login_username" class="login-label">username</label>
                        <input type="text" name="login_username" class="login-username">
                        <label for="login_password" class="login-label">password</label>
                        <div class="login-password-container">
                            <input type="password" name="login_password" id="" class="login-password">
                            <button class="login-toggle-visibility" type="button">
                                <i class="fa-solid fa-eye-slash"></i>
                            </button>
                        </div>
                            
                        <input type="submit" value="Log in" class="login">   
                    </form>
                </div>
<div class="signup-section">
                    <h1 class="signup-header">Sign up</h1>
                    <form action="register.php" method="post" class="signup-form">
                        <label for="signup_username" class="signup-label">username</label>
                        <input type="text" name="signup_username" class="signup-username">
                        <label for="signup_password" class="signup-label">password</label>
                        <div class="signup-password-container">
                            <input type="password" name="signup_password" id="" class="signup-password">
                            <button class="signup-toggle-visibility" type="button">
                                <i class="fa-solid fa-eye-slash"></i>
                            </button>
                        </div>
                        <label for="signup_email" class="signup-label">email</label>
                        <input type="email" name="signup_email" class="signup-email">
                        <input type="submit" value="Sign up" class="signup">   
                    </form>
</div>