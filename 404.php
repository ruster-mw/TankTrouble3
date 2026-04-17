<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <style>
        :root {
            --color1: #020206;
            --color2: #ffffff;
            --color3: #00ffff;
            --color4: #090913;
            --color5: #00ffff80;
            --font1: 'Press Start 2P', sans-serif;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: var(--font1), sans-serif;
            background-color: var(--color1);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: var(--color3);
        }
        .container {
            text-align: center;
            background-color: var(--color4);
            padding: 40px 30px;
            border: 3px solid var(--color3);
            box-shadow: 0 0 20px var(--color5), inset 0 0 20px var(--color5);
            max-width: 600px;
            width: 90%;
            text-shadow: 0 0 10px var(--color5);
        }
        h1 {
            font-size: clamp(3rem, 10vw, 6rem);
            margin-bottom: 20px;
            color: var(--color3);
            text-shadow: 0 0 15px var(--color5), 0 0 30px var(--color5);
            animation: flicker 0.15s infinite;
        }
        p {
            font-size: clamp(0.8rem, 2vw, 1.2rem);
            margin-bottom: 30px;
            color: var(--color2);
            text-shadow: 0 0 10px var(--color5);
            line-height: 1.6;
        }
        a {
            display: inline-block;
            padding: 15px 30px;
            background-color: transparent;
            color: var(--color3);
            text-decoration: none;
            border: 2px solid var(--color3);
            font-size: clamp(0.6rem, 1.5vw, 1rem);
            font-family: var(--font1), sans-serif;
            transition: all 0.1s;
            box-shadow: 0 0 10px var(--color5);
            text-shadow: 0 0 10px var(--color5);
        }
        a:hover {
            background-color: var(--color3);
            color: var(--color1);
            transform: scale(1.05);
            box-shadow: 0 0 20px var(--color3), inset 0 0 20px var(--color3);
            text-shadow: none;
        }
        a:active {
            transform: scale(0.95);
        }
        @keyframes flicker {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.9;
            }
        }
        </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <p>SOMETHING WENT WRONG<br>PAGE NOT FOUND</p>
        <a href="../PanzerArger/index.php">RETURN TO BASE</a>
    </div>
</body>
</html>
