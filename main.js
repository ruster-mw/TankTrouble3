// hello traveler , im sure you have your reasons as to why you are looking down here
// maybe to learn, inspire or just laugh at my code,
// but i must warn you first, while i started this project only I knew what was the vision behind my code
// now that i finished it, i know that only God knows what this code does. So good luck 👍





// const overlay = document.querySelector('.overlay');

// const portraitQuery = window.matchMedia("(orientation: portrait)");

// function updateOverlay(e) {
//   overlay.classList.toggle('overlay-hidden', !e.matches);
// }

// portraitQuery.addEventListener('change', updateOverlay);
// updateOverlay(portraitQuery);


const defaultControls = [
    {
        up: 'w',
        down: 's',
        left: 'a',
        right: 'd',
        shoot: 'q'
    },
    {
        up: 'i',
        down: 'k',
        left: 'j',
        right: 'l',
        shoot: 'u'
    },
    {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
        shoot: 'Shift'
    },
    {
        up: '5',
        down: '2',
        left: '1',
        right: '3',
        shoot: '4'
    }
]
const Controls = [
    {
        up: 'w',
        down: 's',
        left: 'a',
        right: 'd',
        shoot: 'q'
    },
    {
        up: 'i',
        down: 'k',
        left: 'j',
        right: 'l',
        shoot: 'u'
    },
    {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
        shoot: 'Shift'
    },
    {
        up: '5',
        down: '2',
        left: '1',
        right: '3',
        shoot: '4'
    }
]
const Themes = [
    {
        title: 'classic',
        tankSprites: ['./assets/RetroP1.png', './assets/RetroP2.png', './assets/RetroP3.png', './assets/RetroP4.png'],
        colors: ['hsl(240, 60%, 3%)', '#ffffff', '#00ffff', '#090913', '#00ffff80'],
        backgroundUrl: './assets/image.png',
        explosionParticle: "#00ffff4d"
    },
    {
        title: 'retro',
        tankSprites: ['./assets/RetroP1.png', './assets/RetroP2.png', './assets/RetroP3.png', './assets/RetroP4.png'],
        colors: ['#e7e7e7', '#030303', '#070707', '#bdbcbc', '#07070780'],
        backgroundUrl: './assets/image.png',
        explosionParticle: "#0000004d"
    },
    {
        title: 'hell',
        tankSprites: ['./assets/tank1.svg', './assets/tank2.svg', './assets/tank3.svg', './assets/tank4.svg'],
        colors: ['#060202', '#ff0000', '#ff0000', '#130909', '#ff000080'],
        backgroundUrl: './assets/image.png',
        explosionParticle: "#ff00004d"
    },
    {
        title: 'yellow',
        tankSprites: ['./assets/PlayerOne.png', './assets/PlayerTwo.png', './assets/PlayerThree.png', './assets/PlayerFour.png'],
        colors: ['#020206', '#ffffff', 'hsl(61, 100%, 50%)', 'hsl(61, 36%, 6%)', 'hsla(61, 100%, 10%, 0.50)'],
        backgroundUrl: './assets/image.png',
        explosionParticle: "#fbff004d"
    }
]
const CFG = {
    shakemaxTime: 0.3,
    maxShakeStrength: 14,
    radianRatio: Math.PI / 180,
    newRoundTime: 2500,
    wallThickness: 2,
    // particle
    dthBigprtRadius: 14,
    dthBigprtSpeed: 80,
    dthBigprtLifeTime: 0.5,
    dthBigprtAmount: 6,
    dthSmallprtRadius: 3,
    dthSmallprtSpeed: 40,
    dthSmallprtLifeTime: 1,
    dthSmallprtAmount: 6,
    pwrupPrtRadius: 14,
    pwrupPrtSpeed: 30,
    pwrupPrtLifeTime: 4,
    pwrupPrtAmount: 12, 
    // tank
    tankWidth: 35,
    tankHeight: 42,
    tankMaxCoolDown: 0.18,
    tankMagazine: 9,
    tankReloadTime: 0.8,
    tankMaxVelocity: 200,
    tankAcceleration: 1000,
    tankFriction: 2000,
    tankRotationSpeed: 270,
    tankBarrelHeight: 12,
    // projectile
    projectiles: {
        1: {
            speed: 300,
            radius: 4,
            lifeTime: 9,
            gracePeriod: 0.1
        },
        2: {
            speed: 1500,
            radius: 25,
            lifeTime: 10,
            gracePeriod: 0.3
        }
    },
    // power up
    pwrupSize: 40,
    pwrupCooldown: 3,
}




document.getElementById('currentYear').textContent = new Date().getFullYear();

const barButtons = document.querySelectorAll('.bar-button');
const menus = document.querySelectorAll('.menu')

barButtons.forEach(button => {
    button.addEventListener('click', () => {
        menus.forEach(menu => {
            if(button.dataset.type === menu.dataset.type)
                menu.classList.add('active');
            else
                menu.classList.remove('active');
        })
    })
})  

//-------------
// settings
//-------------
const settingsList = document.querySelector('.settings-list')
const settingCategories = document.querySelectorAll('.setting-category')
const settings = document.querySelectorAll('.settings')
const keybindsCloseButton = document.querySelector('#keybinds-close-button')
const keybindsDiv = document.querySelector('.keybinds-div')
const playerSettingsNames = document.querySelectorAll('.player-setting-name')
const playerSettingsValues = document.querySelectorAll('.player-setting-value')
const keybindInput = document.querySelector('#keybind-input')
const graphicsButton = document.querySelector('#high-graphics')
const remeberThemeButton = document.querySelector('#remember-theme-button')
const resetControls = document.querySelector("#reset-controls")
let keybindValue;
let optionsConfig = {
    graphics: false,
    rememberTheme: true,
}
// todo add checking for duplicate keybinds
resetControls.addEventListener('click', () => {
    localStorage.removeItem('keyBinds')
    Object.assign(Controls, defaultControls)
    loadControlSettings()
})
if (localStorage.getItem('keyBinds')){
    let ControlsLS = JSON.parse(localStorage.getItem('keyBinds'))
    Object.assign(Controls,ControlsLS)
}

if (!localStorage.getItem('optionsConfig')) {
    localStorage.setItem('optionsConfig', JSON.stringify(optionsConfig));
} else {
    let optionsConfigLS = JSON.parse(localStorage.getItem('optionsConfig'));
    Object.assign(optionsConfig, optionsConfigLS)
}

graphicsButton.addEventListener('click',() => {
    optionsConfig.graphics  = !optionsConfig.graphics;
    graphicsButton.innerText = optionsConfig.graphics
    localStorage.setItem('optionsConfig', JSON.stringify(optionsConfig));
})
remeberThemeButton.addEventListener('click', () => {
    optionsConfig.rememberTheme = !optionsConfig.rememberTheme
    remeberThemeButton.innerText = optionsConfig.rememberTheme
    localStorage.setItem('optionsConfig', JSON.stringify(optionsConfig));
    localStorage.removeItem('themeName')
    localStorage.removeItem('themeID')
    if (!optionsConfig.rememberTheme)
        selectedTheme = Themes[0]
})

settingsList.addEventListener('click', (e) => {
    const item = e.target.closest('.setting-category');
    if (!item) return;
    loadSettings(item)
})
function loadSettings(newCategory){
     settingCategories.forEach(category => {
            if(category.dataset.setting === newCategory.dataset.setting)
                category.classList.add('selected-category');
            else
                category.classList.remove('selected-category');
        })
        settings.forEach(setting => {
                if(setting.dataset.setting === newCategory.dataset.setting)
                    setting.classList.add('active-setting');
                else
                    setting.classList.remove('active-setting');
        })
        if (newCategory.dataset.setting === 'controls'){
            loadControlSettings()
        } else if (newCategory.dataset.setting === "general"){
            loadGeneralSettings()
        }
}

function loadControlSettings(){
    let index = 0;
    Controls.forEach((control,controlIndex) => {
        playerSettingsNames[index].textContent = `player${controlIndex + 1} up`
        playerSettingsValues[index].textContent = control.up.toUpperCase()
        playerSettingsNames[index + 1].textContent = `player${controlIndex + 1} down`
        playerSettingsValues[index + 1].textContent = control.down.toUpperCase()
        playerSettingsNames[index + 2].textContent = `player${controlIndex + 1} left`
        playerSettingsValues[index + 2].textContent = control.left.toUpperCase()
        playerSettingsNames[index + 3].textContent = `player${controlIndex + 1} right`
        playerSettingsValues[index + 3].textContent = control.right.toUpperCase()
        playerSettingsNames[index + 4].textContent = `player${controlIndex + 1} shoot`
        playerSettingsValues[index + 4].textContent = control.shoot.toUpperCase()
        index += 5;
    })
}
function loadGeneralSettings(){
    graphicsButton.innerText = optionsConfig.graphics
    remeberThemeButton.innerText = optionsConfig.rememberTheme
}

if(settingsList)
    loadSettings(document.querySelector('.setting-category[data-setting="controls"]'))

keybindsCloseButton.addEventListener('click', () => {
    keybindsDiv.classList.remove('active')
})
playerSettingsValues.forEach(value => {
    value.addEventListener('click', (e) => {
        e.preventDefault();
        keybindsDiv.classList.add('active')
        keybindValue = value.textContent;
        keybindInput.focus()
    })
})
keybindInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter'){
        keybindInput.value = e.key.toUpperCase();
        return;
    }
    Controls.forEach(control => {
        for (let key in control){
            if (control[key].toUpperCase() === keybindValue.toUpperCase()){
                control[key] = keybindInput.value.toLowerCase();
                loadControlSettings()
                keybindsDiv.classList.remove('active')
                keybindInput.value = '';
            }
        }
    })
    localStorage.setItem('keyBinds', JSON.stringify(Controls))
})




//-------------
// cosmetics
//-------------
// TODO make the cosmetics load in with php? or js idk

const themeDivs = document.querySelectorAll('.theme-div')
const themeSelectButton = document.querySelector('.theme-select-button')
const root = document.querySelector(':root')
let selectedTheme;
if (optionsConfig.rememberTheme) {
    if (!localStorage.getItem('themeName'))
        selectedTheme = Themes[0]
    else 
        selectedTheme = Themes[localStorage.getItem('themeID')]
    localStorage.setItem('themeName', selectedTheme.title)
    localStorage.setItem('themeID', Themes.indexOf(selectedTheme))
    try {
        loadTheme(selectedTheme)
    } catch {
        console.error("failed to load in theme")
    }
    
} else {
    selectedTheme = Themes[0]
    loadTheme(selectedTheme)
}
themeDivs.forEach((theme, index) => {
    const themeSprites = theme.querySelectorAll('.theme-tank-sprite')
    const themeColors = theme.querySelectorAll('.theme-color')
    const header = theme.querySelector('h3')
    const currentTheme = Themes[index]

    header.textContent = currentTheme.title
    themeSprites.forEach((sprite, ind) => {
        sprite.src = currentTheme.tankSprites[ind]
    })
    themeColors.forEach((color,ind) => {
        color.style.backgroundColor = currentTheme.colors[ind]
    })

})
themeDivs.forEach(them => {
    them.addEventListener('click', () => {
        selectedTheme = Themes[Array.from(themeDivs).indexOf(them)]
        themeDivs.forEach(th => {
            if(th.dataset.theme == selectedTheme.title){
                th.classList.add('selected-theme')
            } else {
                th.classList.remove('selected-theme')
            }
        })
        
    })
})




themeSelectButton.addEventListener('click', () => {
    loadTheme(selectedTheme)
    if (optionsConfig.rememberTheme){
        localStorage.setItem('themeName',selectedTheme.title)
        localStorage.setItem('themeID', Themes.indexOf(selectedTheme))
    }
})


function loadTheme(theme){
    themeDivs.forEach(th => {
        if(th.dataset.theme == theme.title){
            th.classList.remove('selected-theme')
        }
    })
    root.style.setProperty('--color1', theme.colors[0])
    root.style.setProperty('--color2', theme.colors[1])
    root.style.setProperty('--color3', theme.colors[2])
    root.style.setProperty('--color4', theme.colors[3])
    root.style.setProperty('--color5', theme.colors[4])
}

//-------------
// play js
//-------------
const playAmountDiv = document.querySelector('#play-amount-config')
const playGamemodeDiv = document.querySelector('#play-gamemode-config')
const playMapDiv = document.querySelector('#play-map-config')
const startButton = document.querySelector('#start-button')
const main = document.querySelector('main')
const aside = document.querySelector('aside')
const gameSection = document.querySelector('.game-section')
const canvas = document.querySelector('#gameCanvas')
const ctx = canvas.getContext("2d");
const backButton = document.querySelector(".back-button")
const scoreboard = document.querySelector('.scoreboard')
let playerAmount = 4;
let gameMode = "classic";
let mapType = "medium";
let debug = false;
window.addEventListener('keydown', (e) => {
    if (e.key === 'Home'){
        debug = !debug
        console.log(debug)
    }
})

playAmountDiv.addEventListener('click',(e) => {
    const item = e.target.closest('.play-config');
    if (!item) 
        return;
    else {
        playerAmount = parseInt(item.dataset.playeramount)
        Array.from(playAmountDiv.children).forEach(config => {
             if(config.dataset.playeramount === item.dataset.playeramount)
                config.classList.add('play-config-selected');
            else
                config.classList.remove('play-config-selected');
        })
    }
})
playGamemodeDiv.addEventListener('click',(e) => {
    const item = e.target.closest('.play-config');
    if (!item) 
        return;
    else {
        gameMode = item.dataset.gamemode
        Array.from(playGamemodeDiv.children).forEach(config => {
             if(config.dataset.gamemode === item.dataset.gamemode)
                config.classList.add('play-config-selected');
            else
                config.classList.remove('play-config-selected');
        })
    }
})
playMapDiv.addEventListener('click',(e) => {
    const item = e.target.closest('.play-config');
    if (!item) 
        return;
    else {
        mapType = item.dataset.maptype
        Array.from(playMapDiv.children).forEach(config => {
             if(config.dataset.maptype === item.dataset.maptype)
                config.classList.add('play-config-selected');
            else
                config.classList.remove('play-config-selected');
        })
    }
})


















backButton.addEventListener('click', () => {
    main.classList.remove('hidden')
    aside.classList.remove('hidden')
    gameSection.classList.add('hidden')
    gameSection.classList.remove('active')
    if(game)
        game.gameRunning = false
    scoreboard.innerHTML = []
})
startButton.addEventListener('click',() => {
    main.classList.add('hidden')
    aside.classList.add('hidden')
    gameSection.classList.remove('hidden')
    gameSection.classList.add('active')
    canvasSize()
    startGame()
})

startButton.addEventListener('mouseover', () => {
    const selectedButtons = document.querySelectorAll('.play-config-selected')
    selectedButtons.forEach(button => {
        button.classList.add('play-config-selected-style')
    })
})
startButton.addEventListener('mouseout', () => {
    const selectedButtons = document.querySelectorAll('.play-config-selected')
    selectedButtons.forEach(button => {
        button.classList.remove('play-config-selected-style')
    })
})
let game;
function startGame() {
    let graphics = optionsConfig.graphics
    game = new Game({playerAmount, gameMode, mapType, canvas, selectedTheme, graphics})
}

// window.addEventListener('resize',canvasSize)
function canvasSize() {
    canvas.width = 900
    canvas.height = 900
}


//  .----------------.  .----------------.  .----------------.  .----------------.   
// | .--------------. || .--------------. || .--------------. || .--------------. |  
// | |    ______    | || |      __      | || | ____    ____ | || |  _________   | |  
// | |  .' ___  |   | || |     /  \     | || ||_   \  /   _|| || | |_   ___  |  | |  
// | | / .'   \_|   | || |    / /\ \    | || |  |   \/   |  | || |   | |_  \_|  | |  
// | | | |    ____  | || |   / ____ \   | || |  | |\  /| |  | || |   |  _|  _   | |  
// | | \ `.___]  _| | || | _/ /    \ \_ | || | _| |_\/_| |_ | || |  _| |___/ |  | |  
// | |  `._____.'   | || ||____|  |____|| || ||_____||_____|| || | |_________|  | |  
// | |              | || |              | || |              | || |              | |  
// | '--------------' || '--------------' || '--------------' || '--------------' |  
//  '----------------'  '----------------'  '----------------'  '----------------'   

class Game {
    constructor({playerAmount, gameMode, mapType, canvas, selectedTheme, graphics}) {
        this.playerAmount = playerAmount;
        this.gameMode = gameMode;
        this.mapType = mapType;
        this.canvas = canvas;
        this.selectedTheme = selectedTheme;
        this.graphics = graphics;
        this.ctx = this.canvas.getContext('2d');
        this.secondsPassed = 0;
        this.oldTimeStamp = 0;
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.gamesection = document.querySelector('.game-section')
        this.fpsCounter = document.getElementById('fps-counter');
        this.color1 = this.selectedTheme.colors[0];
        this.color2 = this.selectedTheme.colors[1];
        this.color3 = this.selectedTheme.colors[2];
        this.color4 = this.selectedTheme.colors[3];
        this.color5 = this.selectedTheme.colors[4];
        
        this.mapSizes = new Map([
            ["small", 7],
            ["medium", 9],
            ["large", 11]
        ]);
        
        this.offScreenCanvas = document.createElement('canvas');
        this.offScreenCanvas.width = this.width;
        this.offScreenCanvas.height = this.height;
        this.offCtx = this.offScreenCanvas.getContext('2d');
        this.redraw = true

        this.GCFG = CFG
        this.gameRunning = true;
        this.roundOver = false;
        this.shakeTime = 0;
        this.shakeMaxTime = this.GCFG.shakemaxTime;
        this.maxShakeStrength = this.GCFG.maxShakeStrength;
        this.shakeStrength = 0;

        this.projectiles = [];

        this.particles = [];
        
        this.debug = false;
        this.radianRatio = this.GCFG.radianRatio;

        this.powerUps = [];
        this.powerUpMaxCoolDown = this.GCFG.pwrupCooldown;
        this.powerUpCooldown = 0;

        // maze vars
        this.mapCells = this.mapSizes.get(mapType);
        this.cells = [];
        this.cellSize = this.width / this.mapCells;
        this.current;
        this.stack = [];
        this.upgradeChance = this.mapSizes.get(mapType);
        this.wallThickness = this.GCFG.wallThickness

        //player stuff
        this.players = [];
        this.controller = [];
        this.playersScore = new Array(4).fill(0)
        this.generateScoreboard();
        this.generateMaze();
        this.spawnPlayers();
        this.setupController();
        this.setupControls();
        // this.powerUps.push(new PowerUp(450, 450, this, this.selectedTheme.tankSprites[0]))
        this.gameLoop();
        this.canvas.focus();
        // this.gamesection.addEventListener('click', () => {this.generateMaze();this.newRound()})
    }
    generateScoreboard(){
        for(let i = 0; i < this.playerAmount; i++){
            const playerScore = document.createElement("div")
            playerScore.className = "player-score"
            playerScore.dataset.player = i
            const img = document.createElement("img")
            img.src = this.selectedTheme.tankSprites[i]
            img.alt = "Player " + (i + 1)

            const scoreText = document.createElement("div")
            scoreText.className = "score-text"
        
            const playerName = document.createElement("input")
            playerName.className = "player-name"
            playerName.value = "Player " + (i + 1)
            playerName.maxLength = 11

            const scoreValue = document.createElement("span")
            scoreValue.className = "score-value"
            scoreValue.textContent = "0"

            scoreText.appendChild(playerName)
            scoreText.appendChild(scoreValue)

            playerScore.appendChild(img)
            playerScore.appendChild(scoreText)
            scoreboard.appendChild(playerScore)
        }
    }
    setupController(){
        this.players.forEach((player, index) => {
            this.controller.push(
                Object.fromEntries(
                    Object.values(player.controls).map(key => [key, false])
                )
            );
        })
    }
    spawnPlayers(){
        for (let i = 0; i < this.playerAmount; i++){
            let cellX = this.cells[Math.floor(Math.random() * this.mapCells * this.mapCells)].x + this.cellSize / 2
            let cellY = this.cells[Math.floor(Math.random() * this.mapCells)].y + this.cellSize / 2
            let player = new Tank(cellX, cellY, selectedTheme.tankSprites[i], Controls[i], this, i)
            this.players.push(player) 
        }
    }
    setupControls(){     
        this.canvas.addEventListener('keyup', (e) => {
            // e.preventDefault();
            this.controller.forEach(controller => {
                if (e.key in controller){
                    controller[e.key] = false;
                }
            })

        }) 
        this.canvas.addEventListener('keydown', (e) => {
            // e.preventDefault();
            this.controller.forEach(controller => {
                if (e.key in controller){
                    controller[e.key] = true;
                }
            })
        })       
    }
    updateProjectiles(dt = 0){
        this.projectiles.forEach((prj, index) => {
            const totalDX = prj.vx * dt
            const totalDY = prj.vy * dt
            const totalDist = Math.sqrt(totalDX * totalDX + totalDY * totalDY)

            const steps = Math.ceil(totalDist / prj.radius * 2)
            const stepDX = totalDX / steps
            const stepDY = totalDY / steps

            for (let i = 0; i < steps; i++){
                prj.x += stepDX
                prj.y += stepDY
                prj.currentCell()
                const hit = this.collisionDetectionProjectiles(prj)
                if (hit) 
                    break;
                }
                if (prj.midStep){
                    this.players.forEach(player => {
                        const tankCorners = this.getPlayerCorners(player)
                        const tankAxes = this.getPlayerAxes(player)
                        const voronoiAxis = this.getVoronoiAxis(tankCorners, prj)
                        const hitAxes = [voronoiAxis, ...tankAxes]
                        const collide = this.SATprj(prj, tankCorners, hitAxes)
                    if (collide) prj.onPlayerHit(collide, player)
                    })
    }
            prj.lifeTime -= dt;
            prj.gracePeriod -= dt;
            if (prj.lifeTime < 0){
                prj.dead = true
            }
        })
    }
    //TODO optimize this , too frequent division and funcion calls
    updatePlayers(dt = 0, player){    
            player.angle += player.rotating * player.rotationSpeed * dt
            player.angle = player.angle > 360 ? player.angle-= 360 : player.angle
            player.coolDown += dt
            player.reload += dt
            switch(player.moving){
                case 1: // broom broom forward
                    player.velocity = player.velocity >= player.maxVelocity ? player.maxVelocity : player.velocity + player.acceleration * dt
                    break;
                case -1: // vroom vroom backward
                    player.velocity = -player.velocity >= player.maxVelocity ? -player.maxVelocity : player.velocity - player.acceleration * dt
                    break;
                case 0: //no broom vroom
                if (Math.abs(player.velocity) < player.friction * dt){
                    player.velocity = 0;
                } else {
                    if (player.velocity > 0){
                        player.velocity -= player.friction * dt
                    } else if (player.velocity < 0){
                        player.velocity += player.friction * dt
                    }
                }
            }
            player.sin = Math.sin(this.radianRatio * player.angle)
            player.cos = Math.cos(this.radianRatio * player.angle)
            player.x += (player.velocity * dt) * player.sin 
            player.y -= (player.velocity * dt) * player.cos     
    }
    updatePlayerMovement(player, index){
            const control = this.controller[index]
            if (!control) return
            
            if (control[player.controls.up] && !control[player.controls.down]){
                player.moving = 1
            } else if (control[player.controls.down] && !control[player.controls.up]){
                player.moving = -1
            } else {
                player.moving = 0
            }

            if (control[player.controls.left] && !control[player.controls.right]){
                player.rotating = -1
            } else if (control[player.controls.right] && !control[player.controls.left]){
                player.rotating = 1
            } else {
                player.rotating = 0
            }

    }
    getPlayerCorners(player){
        const { x, y, sin, cos, width, height } = player;
    // cw for centerwidth 
        const cw = width / 2
        const ch = height / 2
    // you alone on this one brochacho 😭🙏
        return [
            { x: x - cw * cos + ch * sin,  y: y - cw * sin - ch * cos },
            { x: x + cw * cos + ch * sin,  y: y + cw * sin - ch * cos }, 
            { x: x + cw * cos - ch * sin,  y: y + cw * sin + ch * cos },  
            { x: x - cw * cos - ch * sin,  y: y - cw * sin + ch * cos },  
        ]
    }
    getPlayerAxes(player){
        return [
            { x: player.sin, y: -player.cos },
            { x: player.cos, y:  player.sin },
        ]
    }
    getWallCorners(segs){
        let x, y, width, height
        
        switch(segs.side){
            case 'top':
                    x = segs.x1
                    y = segs.y1
                    width = segs.x2 - segs.x1
                    height = this.wallThickness
                break;
            case 'bottom':
                    x = segs.x1
                    y = segs.y1 - this.wallThickness
                    width = segs.x2 - segs.x1
                    height = this.wallThickness
                break;
            case 'right':
                    x = segs.x1
                    y = segs.y1    
                    width = this.wallThickness
                    height = segs.y2 - segs.y1
                break;
            case 'left':
                    x = segs.x1 - this.wallThickness
                    y = segs.y1    
                    width = this.wallThickness
                    height = segs.y2 - segs.y1
                break;
        }
        return [
            {x, y},
            {x: x + width, y},
            {x: x + width, y: y + height},
            {x, y: y + height},
        ]
        
    }
    getAxesShade(playerCorners, axis){
        const points = playerCorners.map(p => p.x * axis.x + p.y * axis.y);
        return { min: Math.min(...points), max: Math.max(...points)};
    }
    SAT(playerCorners, wallCorners, axes){
        let minOverlap = Infinity
        let minAxes = null
        
        for (const axe of axes) {
            const shadow1 = this.getAxesShade(playerCorners, axe)
            const shadow2 = this.getAxesShade(wallCorners, axe)

            const incantation = Math.min(shadow1.max, shadow2.max) - Math.max(shadow1.min, shadow2.min);

            if(incantation <= 0)
                return null

            if (incantation < minOverlap){
                minOverlap = incantation
                minAxes = {
                    x: axe.x, 
                    y: axe.y 
                }
            }
        }
        return {axis: minAxes, overlap: minOverlap}
    }
    playerWallCollision(collide, player, segs){
        // hocus pokus, czary mary , musimy sprawdzic czy gracz jest obrocony od sciany czy do sciany
        const wallCenterX = (segs.x1 + segs.x2) / 2
        const wallCenterY = (segs.y1 + segs.y2) / 2
        const axis = collide.axis
        const overlap = collide.overlap

        const fromWallToTank = {
            x: player.x - wallCenterX,
            y: player.y - wallCenterY
        }

        const direction = fromWallToTank.x * axis.x + fromWallToTank.y * axis.y
        if (direction < 0){
            axis.x = -axis.x
            axis.y = -axis.y
        }

        //get him out the wall
        player.x += axis.x * overlap
        player.y += axis.y * overlap

        // get which velocity to cancel
        const moveDirection = {x: player.sin, y: -player.cos}
        const velocity = (moveDirection.x * axis.x + moveDirection.y * axis.y) * player.velocity

        if (velocity < 0){
            player.velocity = 0
        }
    }
    prjWallCollision(collide, prj, segs){
        const wallCenterX = (segs.x1 + segs.x2) / 2
        const wallCenterY = (segs.y1 + segs.y2) / 2
        const axis = collide.axis
        const overlap = collide.overlap

        const fromPrjToWall = {
            x: prj.x - wallCenterX,
            y: prj.y - wallCenterY
        }
        const direction = fromPrjToWall.x * axis.x + fromPrjToWall.y * axis.y
        if (direction < 0){
            axis.x = -axis.x
            axis.y = -axis.y
        }
        prj.x += axis.x * (overlap + 0.5)
        prj.y += axis.y * (overlap + 0.5)
        
        const vector = prj.vx * axis.x + prj.vy * axis.y
        prj.vx -= 2 * vector * axis.x
        prj.vy -= 2 * vector * axis.y
    }
    getVoronoiAxis(wallCorners, prj){
        const left = wallCorners[0].x
        const right = wallCorners[1].x
        const top = wallCorners[2].y
        const bottom = wallCorners[3].y

        const closestX = Math.max(left, Math.min(prj.x, right))
        const closestY = Math.max(top, Math.min(prj.y, bottom))

        const distanceX = prj.x - closestX
        const distanceY = prj.y - closestY
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        return {x: distanceX / distance, y: distanceY / distance}
    }
    collisionDetection(player){
        const tankCorners = this.getPlayerCorners(player)
        const tankAxes = this.getPlayerAxes(player)
        const checkAxes = [{x: 1, y: 0 }, {x: 0, y: 1 }, ...tankAxes,] // walls never rotate so just use the normal axes (whatever that means)
        
        player.neighborCells.forEach(cell => {
            cell.wallSegments.forEach(segs => { //haha segs 
                const wallCorners = this.getWallCorners(segs)

                const collide = this.SAT(tankCorners, wallCorners, checkAxes)
                
                if (collide){
                    this.playerWallCollision(collide, player, segs)
                }
            })
        })
        player.projectilesCollision.forEach(prj => {
            const dx = prj.x - player.x
const dy = prj.y - player.y

const localX = dx * tankAxes[1].x + dy * tankAxes[1].y
const localY = dx * tankAxes[0].x + dy * tankAxes[0].y

const clampedX = Math.max(-player.width / 2, Math.min(player.width / 2, localX))
const clampedY = Math.max(-player.height / 2, Math.min(player.height / 2, localY))

const closestX = player.x + clampedX * tankAxes[1].x + clampedY * tankAxes[0].x
const closestY = player.y + clampedX * tankAxes[1].y + clampedY * tankAxes[0].y

const distX = prj.x - closestX
const distY = prj.y - closestY
const dist = Math.sqrt(distX * distX + distY * distY)

const voronoiAxis = { x: distX / dist, y: distY / dist }
const hitAxes = [voronoiAxis, ...tankAxes]
            const collide = this.SATprj(prj, tankCorners, hitAxes)
            if(collide){
                prj.onPlayerHit(collide, player)
            }
        })
        
        this.powerUps.forEach(pwrup => {
            const pwrupCorners = [
                {x: pwrup.x, y: pwrup.y},
                {x: pwrup.x + pwrup.size, y: pwrup.y},
                {x: pwrup.x + pwrup.size, y: pwrup.y + pwrup.size},
                {x: pwrup.x, y: pwrup.y + pwrup.size},
            ]
            const collide = this.SAT(tankCorners, pwrupCorners, checkAxes)

            if(collide){
                pwrup.onPickup(player)
            }
        })

    }
    prjPlayerCollision(collide, player, prj){
        let index = this.players.indexOf(player)
        player.dead = true
        this.controller.splice(index, 1)
        this.playerDeathParticles(player)
        this.shakeTime = this.shakeMaxTime
        this.shakeStrength = this.maxShakeStrength
    }
    playerDeathParticles(player){
        const x = player.x
        const y = player.y
        for (let i = 0; i <= this.GCFG.dthBigprtAmount; i++){
            this.particles.push(new Particle(x, y, this.GCFG.dthBigprtRadius, this.GCFG.dthBigprtSpeed, this.GCFG.dthBigprtLifeTime, this))
        }
        for (let i = 0; i <= this.GCFG.dthSmallprtAmount; i++){
            this.particles.push(new Particle(x, y, this.GCFG.dthSmallprtRadius, this.GCFG.dthSmallprtSpeed, this.GCFG.dthSmallprtLifeTime, this))
        }
    }
    powerUpSpawnParticles(pwrup){
        const x = pwrup.x + pwrup.size / 2
        const y = pwrup.y + pwrup.size / 2
        for (let i = 0; i <= this.GCFG.pwrupPrtAmount; i++){
            this.particles.push(new Particle(x, y, this.GCFG.pwrupPrtRadius, this.GCFG.pwrupPrtSpeed, this.GCFG.pwrupPrtLifeTime, this))
        }
    }
    getCircleAxeShade(prj, voronoiAxis){
        const dot = prj.x * voronoiAxis.x + prj.y * voronoiAxis.y
        return {min: dot - prj.radius, max: dot + prj.radius}
    }
    SATprj(prj, wallCorners, axes){
        let minOverlap = Infinity
        let minAxes = null

        for (const axe of axes){
            const shadow1 = this.getCircleAxeShade(prj, axe)
            const shadow2 = this.getAxesShade(wallCorners, axe)

            const incantation = Math.min(shadow1.max, shadow2.max) - Math.max(shadow1.min, shadow2.min)

            if(incantation <= 0)
                return null

            if (incantation < minOverlap){
                minOverlap = incantation
                minAxes = {
                    x: axe.x, 
                    y: axe.y 
                }
            }
        }
        return {axis: minAxes, overlap: minOverlap}
    }
    collisionDetectionProjectiles(prj){
        let hit = false;
        prj.neighborCells.forEach(cell => {
            cell.wallSegments.forEach(segs => {
                const wallCorners = this.getWallCorners(segs)
                const voronoiAxis = this.getVoronoiAxis(wallCorners, prj)
                const checkAxes = [{x: 1, y: 0}, {x: 0, y: 1}, voronoiAxis]
                const collide = this.SATprj(prj, wallCorners, checkAxes)
                if(collide){
                    const stop = prj.onWallHit(collide, segs)
                    if (stop) 
                        hit = true;
                }
            })
        })
        return hit;
    }
    playerShoot(player, index){
        const control = this.controller[index]
        if (!control) return
        if(control[player.controls.shoot] && player.coolDown > player.maxCoolDown && player.ammo.length > 0){
            switch (player.ammo[0]){
                case 1:
                    this.projectiles.push(new BaseProjectile(
                    player.x + (player.height / 2 + this.GCFG.projectiles[1].radius) * player.sin,
                    player.y - (player.height / 2 + this.GCFG.projectiles[1].radius) * player.cos,
                    player.sin,
                    player.cos,   
                    1,
                    this ))
                break;
                case 2:
                    this.projectiles.push(new laserProjectile(
                    player.x + (player.height / 2 + this.GCFG.projectiles[2].radius) * player.sin,
                    player.y - (player.height / 2 + this.GCFG.projectiles[2].radius) * player.cos,
                    player.sin,
                    player.cos,   
                    2, 
                    this ))
                    this.shakeTime = 1
                    this.shakeStrength = 8
                    this.particles.push(new RectParticle(player.x, player.y, 5, 13, 400, 0.2, player.angle, this))
                    this.particles.push(new RectParticle(player.x, player.y, 5, 13, 400, 0.2, player.angle + 20, this))
                    this.particles.push(new RectParticle(player.x, player.y, 5, 13, 400, 0.2, player.angle + 40, this))
                    this.particles.push(new RectParticle(player.x, player.y, 5, 13, 400, 0.2, player.angle - 20, this))
                    this.particles.push(new RectParticle(player.x, player.y, 5, 13, 400, 0.2, player.angle - 40, this))

                break;
            }
            player.coolDown = 0;
            player.ammo.shift();
        } 
        if(player.reload >= player.reloadTime && player.ammo.length < player.magazine){
            player.reload = 0
            player.ammo.push(1)
        }
    }
    // i think its not needed?
    draw() {
        this.ctx.fillStyle = this.color4
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    updateScores() {
        const scoreValues = document.querySelectorAll('.score-value')
        scoreValues[this.players[0].ind].innerText = this.playersScore[this.players[0].ind] 
    }
    updateParticles(dt = 0){
        this.particles.forEach(particle => {
            const totalDX = particle.vx * dt
            const totalDY = particle.vy * dt
            // const totalDist = Math.sqrt(totalDX * totalDX + totalDY * totalDY)
            // const steps = Math.ceil(totalDist / particle.radius * 2)
            // const stepDX = totalDX / steps
            // const stepDY = totalDY / steps
            particle.x += totalDX
            particle.y += totalDY

            particle.lifeTime -= dt
            if (particle.lifeTime < 0){
                particle.dead = true
            }
        })
    }
    updatePowerUps(dt = 0){
        this.powerUpCooldown += dt
        if (this.powerUpCooldown >= this.powerUpMaxCoolDown){
            let randPU = POWER_UPS[Math.floor(Math.random() * POWER_UPS.length)]
            let cellX = this.cells[Math.floor(Math.random() * this.mapCells * this.mapCells)].x + this.cellSize / 2
            let cellY = this.cells[Math.floor(Math.random() * this.mapCells)].y + this.cellSize / 2
            this.powerUps.unshift(new randPU(cellX - this.GCFG.pwrupSize / 2, cellY - this.GCFG.pwrupSize / 2, this))
            this.powerUpSpawnParticles(this.powerUps[0])
            this.powerUpCooldown = 0
        }
    }
    //  .----------------.  .----------------.  .----------------.  .----------------.   .----------------.  .----------------.  .----------------.  .----------------. 
    // | .--------------. || .--------------. || .--------------. || .--------------. | | .--------------. || .--------------. || .--------------. || .--------------. |
    // | |    ______    | || |      __      | || | ____    ____ | || |  _________   | | | |   _____      | || |     ____     | || |     ____     | || |   ______     | |
    // | |  .' ___  |   | || |     /  \     | || ||_   \  /   _|| || | |_   ___  |  | | | |  |_   _|     | || |   .'    `.   | || |   .'    `.   | || |  |_   __ \   | |
    // | | / .'   \_|   | || |    / /\ \    | || |  |   \/   |  | || |   | |_  \_|  | | | |    | |       | || |  /  .--.  \  | || |  /  .--.  \  | || |    | |__) |  | |
    // | | | |    ____  | || |   / ____ \   | || |  | |\  /| |  | || |   |  _|  _   | | | |    | |   _   | || |  | |    | |  | || |  | |    | |  | || |    |  ___/   | |
    // | | \ `.___]  _| | || | _/ /    \ \_ | || | _| |_\/_| |_ | || |  _| |___/ |  | | | |   _| |__/ |  | || |  \  `--'  /  | || |  \  `--'  /  | || |   _| |_      | |
    // | |  `._____.'   | || ||____|  |____|| || ||_____||_____|| || | |_________|  | | | |  |________|  | || |   `.____.'   | || |   `.____.'   | || |  |_____|     | |
    // | |              | || |              | || |              | || |              | | | |              | || |              | || |              | || |              | |
    // | '--------------' || '--------------' || '--------------' || '--------------' | | '--------------' || '--------------' || '--------------' || '--------------' |
    //  '----------------'  '----------------'  '----------------'  '----------------'   '----------------'  '----------------'  '----------------'  '----------------' 
    gameLoop(timeStamp = 0) {
        if (this.oldTimeStamp === 0) {
            this.oldTimeStamp = timeStamp;
        }
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;
        ctx.clearRect(0, 0, this.width, this.height)
        ctx.save()
        if (this.shakeTime > 0){
            const xShake = (Math.random() - 0.5) * this.shakeStrength
            const yShake = (Math.random() - 0.5) * this.shakeStrength
            this.ctx.translate(xShake, yShake)
            this.shakeTime -= this.secondsPassed
            this.shakeStrength *= 0.9
        }
        this.drawMaze()

        this.players.forEach((player, index) => {
            this.updatePlayerMovement(player, index)
            this.updatePlayers(this.secondsPassed, player)
            player.currentCell()
            this.collisionDetection(player)
            player.drawTank()
            this.playerShoot(player,index)
        })

        this.projectiles.forEach(prj => prj.drawProjectile())
        this.updateProjectiles(this.secondsPassed)
        
        this.particles.forEach(particle => particle.drawParticle())
        this.updateParticles(this.secondsPassed)

        this.powerUps.forEach(pwrup => pwrup.drawPowerUp())
        this.updatePowerUps(this.secondsPassed)

        ctx.restore()
        this.projectiles = this.projectiles.filter(p => !p.dead)
        this.players = this.players.filter(p => !p.dead)
        this.particles = this.particles.filter(p => !p.dead)
        this.powerUps = this.powerUps.filter(p => !p.dead)

        // test lag 
        // for (let i = 1; i < 50_000_000; i++){
        //     let ab = 2+2
        // }
        if (this.players.length <= 1 && !this.roundOver){
            this.playersScore[this.players[0].ind]++
            this.updateScores()
            this.roundOver = true
            setTimeout(() => {
                this.newRound()
            }, this.GCFG.newRoundTime)
        }
        if (this.gameRunning){
            window.requestAnimationFrame((ts) => this.gameLoop(ts)); // ts pmo fr vro
        }
    }
    newRound() {
        this.projectiles = []
        this.players = []
        this.controller = []
        this.powerUps = []
        this.generateMaze()
        this.spawnPlayers()
        this.setupController()
        this.roundOver = false
        // window.requestAnimationFrame((ts) => this.gameLoop(ts))
    }
    removeWalls(current,next) {
        this.xDirection = current.i - next.i
        this.yDirection = current.j - next.j

        if(this.xDirection === 1){
            current.walls.left = false
            next.walls.right = false
        } else if (this.xDirection === -1){
            current.walls.right = false
            next.walls.left = false
        }

        if(this.yDirection === 1){
            current.walls.top = false
            next.walls.bottom = false
        } else if (this.yDirection === -1){
            current.walls.bottom = false
            next.walls.top = false
        }
    }
    upgradeMaze(){
        let cellsLength = this.cells.length
        let ind;
        for (let i = 0; i < cellsLength; i++){        
            let cell = this.cells[i]
            if (cell.i === 0 || cell.j === 0 || cell.i === this.mapCells - 1 || cell.j === this.mapCells - 1)
                continue;
            let bawazanga = Math.floor(Math.random() * (18 - this.upgradeChance))
            switch(bawazanga){
                case 0:
                    cell.walls.top = false
                    ind = this.index(cell.i, cell.j - 1)
                    this.cells[ind].walls.bottom = false
                    break;
                case 1:
                    cell.walls.right = false
                    ind = this.index(cell.i + 1, cell.j)
                    this.cells[ind].walls.left = false
                    break;
                case 2:
                    cell.walls.bottom = false
                    ind = this.index(cell.i, cell.j + 1)
                    this.cells[ind].walls.top = false
                    break;
                case 3:
                    cell.walls.left = false
                    ind = this.index(cell.i - 1, cell.j)
                    this.cells[ind].walls.right = false
                    break;
            }
        }
        // this.cellsWithWalls = this.cells.filter(cell => cell.walls.top || cell.walls.right || cell.walls.bottom || cell.walls.left)
    }
    //generates the maze once at the start
    generateMaze(){ 
        this.cells = []

        for (let i = 0; i < this.mapCells; i++){
            for (let j = 0; j < this.mapCells; j++){
                let cell = new Cell(i, j, this.cellSize, this.color3, this)
                this.cells.push(cell)
            }
        }
        this.current = this.cells[0]
        while(true){
            this.current.visited = true
        this.next = this.current.checkNeighbors()

        if (this.next) {
            this.next.visited = true;
            this.stack.push(this.current)
            this.removeWalls(this.current,this.next)
            this.current = this.next
        } else if (this.stack.length > 0){
            this.current = this.stack.pop()
        }   else {
            break;
        }
        
        }
        this.upgradeMaze()

        this.redraw = true
    }
    // not used anymore
    step() {
        this.current.visited = true
        this.next = this.current.checkNeighbors()

        if (this.next) {
            this.next.visited = true;
            this.stack.push(this.current)
            this.removeWalls(this.current,this.next)
            this.current = this.next
        } else if (this.stack.length > 0){
            this.current = this.stack.pop()
        }
        const fullyBlockedCells = this.cells.filter(cell =>
            cell.walls.top &&
            cell.walls.right &&
            cell.walls.bottom &&
            cell.walls.left
            );

    }
    //only draws the cells
    drawMaze(){
        if (this.redraw){
            this.offCtx.clearRect(0, 0, this.width, this.height)
        
            this.cells.forEach(cell => {
                cell.drawWalls(this.offCtx)
            });

            this.redraw = false
        }

        this.ctx.drawImage(this.offScreenCanvas, 0, 0)
    }
    index(k,l){
        if (k < 0 || l < 0 || k >= this.mapCells || l >= this.mapCells){
            return undefined
        }
        return k * this.mapCells + l
    }
}

// /0-0\---
// Tank class 
// /0-0\--- 


//todo remove color passing if not used
class Tank {
    constructor(x , y, sprite, controls, game, ind){  
        this.ind = ind;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.game = game;
        this.controls = controls
        this.ctx = game.ctx
        this.width = CFG.tankWidth;
        this.height = CFG.tankHeight;
        this.image = new Image();
        this.image.src = this.sprite;
        // get the corners when rotates useful for collision :)
        this.corners = [
            {x: -this.width / 2, y: -this.height / 2},
            {x: this.width / 2, y: -this.height / 2},
            {x: this.width / 2, y: this.height / 2},
            {x: -this.width / 2, y: this.height / 2}
        ]
        this.maxCoolDown = CFG.tankMaxCoolDown;
        this.coolDown = this.maxCoolDown;
        this.magazine = CFG.tankMagazine;
        this.ammo = new Array(this.magazine).fill(1);
        this.reloadTime = CFG.tankReloadTime;
        this.reload = 0;

        this.angle = 0;
        this.velocity = 0;
        this.maxVelocity = CFG.tankMaxVelocity;
        this.acceleration = CFG.tankAcceleration;
        this.friction = CFG.tankFriction;
        this.rotationSpeed = CFG.tankRotationSpeed;
        this.moving = 0;
        this.rotating = 0;
        this.cell = [];
        this.newCell = [];
        this.neighborCells = [];
        this.projectilesCollision = [];
        this.cellsBool = true;
        this.radianRatio = CFG.radianRatio;
        this.sin = 0;
        this.cos = 1;
        this.dead = false;
        this.currentCell();
    }
    drawTank(){
        this.ctx.save();
        this.ctx.translate(this.x, this.y)
        this.ctx.rotate(this.angle * this.radianRatio)
        this.corners = [
            {x: -this.width / 2, y: -this.height / 2},
            {x: this.width / 2, y: -this.height / 2},
            {x: this.width / 2, y: this.height / 2},
            {x: -this.width / 2, y: this.height / 2}
        ]

        this.ctx.drawImage(this.image, -this.width / 2, -this.height / 2 - CFG.tankBarrelHeight, this.width, this.height + CFG.tankBarrelHeight)
        
        if (debug) {
            this.ctx.strokeStyle = '#FF00FF';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
            
            this.ctx.fillStyle = '#00FF00';
            this.ctx.fillRect(-2, -2, 4, 4);

            this.ctx.fillStyle = '#ffee00';
            this.ctx.fillRect(this.corners[0].x, this.corners[0].y , 3, 3);
            this.ctx.fillRect(this.corners[1].x, this.corners[1].y , 3, 3);
            this.ctx.fillRect(this.corners[2].x, this.corners[2].y , 3, 3);
            this.ctx.fillRect(this.corners[3].x, this.corners[3].y , 3, 3);
            this.ctx.fillStyle = '#ffee00';
            this.ctx.fillRect(-this.width / this.width, -this.height * 2, 1, 60);
        }
        this.ctx.restore();
    }
    currentCell(){
        this.newCell = [Math.floor(this.x / this.game.cellSize),Math.floor(this.y / this.game.cellSize)]
        if (this.newCell[0] !== this.cell[0] || this.newCell[1] !== this.cell[1]){
            this.cell[0] = this.newCell[0]
            this.cell[1] = this.newCell[1]
            this.cellsToCheck()
        }
        this.projectilesToCheck()
    }
    cellsToCheck(){
        this.neighborCells.length = 0
        if (!this.cellsBool){
            return;
        }
        this.neighborCells.push(this.game.cells[this.index(this.cell[0], this.cell[1])])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] - 1, this.cell[1])])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] + 1, this.cell[1])])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0], this.cell[1] - 1)])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0], this.cell[1] + 1)])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] - 1, this.cell[1] - 1)])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] + 1, this.cell[1] - 1)])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] - 1, this.cell[1] + 1)])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] + 1, this.cell[1] + 1)])
        this.neighborCells = this.neighborCells.filter(cell => cell != undefined)
        // this.cellsBool = false  
    }
    projectilesToCheck(){
        this.projectilesCollision = this.game.projectiles.filter(prj => prj.cell[0] >= this.cell[0] - 1 && prj.cell[0] <= this.cell[0] + 1 && prj.cell[1] <= this.cell[1] + 1 && prj.cell[1] >= this.cell[1] - 1 && prj.gracePeriod <= 0)
    }
    index(k,l){
        if (k < 0 || l < 0 || k >= this.game.mapCells || l >= this.game.mapCells){
            return undefined
        }
        return k * this.game.mapCells + l
    }
}
// --------->
// Projectile class 
// ---------> 
class Projectile {
    constructor(x, y, sin, cos, prjId, game){
        const cfg = game.GCFG.projectiles[prjId];
        this.x = x;
        this.y = y;
        this.game = game;
        this.ctx = game.ctx;
        this.color = game.selectedTheme.colors[1];
        this.radius = cfg.radius;
        this.radians = Math.PI * 2;
        this.cell = [];
        this.newCell = [];
        this.neighborCells = [];
        this.cellsBool = true;
        this.speed = cfg.speed;
        this.vx = this.speed * sin;
        this.vy = -this.speed * cos;
        this.lifeTime = cfg.lifeTime;
        this.dead = false;
        this.gracePeriod = cfg.gracePeriod;
    }
    drawProjectile(){
        this.ctx.save()
        if (this.game.graphics){
            this.ctx.shadowColor = this.color
            this.ctx.shadowBlur = 20
            this.ctx.shadowOffsetX = 0
            this.ctx.shadowOffsetY = 0
        }
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.x, this.y, this.radius, 0, this.radians)
        this.ctx.fill()
        if (debug){
            this.ctx.fillStyle = "#ff0000"
            this.ctx.fillRect(this.x, this.y, 1, 1)
        }
        this.ctx.restore()
    }      
    currentCell(){
        this.newCell = [Math.floor(this.x / this.game.cellSize),Math.floor(this.y / this.game.cellSize)]
        if (this.newCell[0] !== this.cell[0] || this.newCell[1] !== this.cell[1]){
            this.cell[0] = this.newCell[0]
            this.cell[1] = this.newCell[1]
            this.cellsToCheck()
        }
    }
    cellsToCheck(){
        this.neighborCells.length = 0
        if (!this.cellsBool){
            return;
        }
        this.neighborCells.push(this.game.cells[this.index(this.cell[0],this.cell[1])])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] - 1,this.cell[1])])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] + 1,this.cell[1])])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0],this.cell[1] - 1)])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0],this.cell[1] + 1)])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] - 1,this.cell[1] - 1)])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] + 1,this.cell[1] - 1)])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] - 1,this.cell[1] + 1)])
        this.neighborCells.push(this.game.cells[this.index(this.cell[0] + 1,this.cell[1] + 1)])
        this.neighborCells = this.neighborCells.filter(cell => cell != undefined)
        // this.cellsBool = false  
    }
    index(k,l){
        if (k < 0 || l < 0 || k >= this.game.mapCells || l >= this.game.mapCells){
            return undefined
        }
        return k * this.game.mapCells + l
    }
    onWallHit(collide, segs) { 
        this.game.prjWallCollision(collide, this, segs)
        return true;
    }
    onPlayerHit(collide, player) {
        this.game.prjPlayerCollision(collide, player, this)
        this.dead = true
    }
}
class BaseProjectile extends Projectile {
    constructor(x, y, sin, cos, prjId, game) {
        super(x, y, sin, cos, prjId, game);
    }
}
class laserProjectile extends Projectile {
    constructor(x, y, sin, cos, prjId, game) {
        super(x, y, sin, cos, prjId, game);
        this.midStep = true;
    }
    onWallHit(collide, segs) { 
        return false;
    }
    onPlayerHit(collide, player) {
        this.game.prjPlayerCollision(collide, player, this)
    }
}
// |---------|
// Cell class 
// |---------|
class Cell {
    constructor(i,j,size,color,game){
        this.game = game;
        this.i = i;
        this.j = j;
        this.x = i * size;
        this.y = j * size;
        this.size = size;
        this.color = color;
        this.ctx = game.ctx;
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true
        };
        this.Thickness = game.wallThickness;
        this.visited = false; 
        this.center = { x: this.x + this.size / 2, y: this.y + this.size / 2 };
        this.bounds = { left: this.x, top: this.y, right: this.x + this.size, bottom: this.y + this.size };
        this.wallSegments = this.computeWallSegments();
    }

    drawWalls(ctx) { 
        ctx.save();
        ctx.fillStyle = this.color;
        if (this.game.graphics){
            ctx.shadowColor = this.game.selectedTheme.colors[2];
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
        if (this.walls.top){
            ctx.fillRect(this.x, this.y, this.size , this.Thickness)
        }
        if (this.walls.right){
            ctx.fillRect(this.x + this.size - this.Thickness, this.y, this.Thickness, this.size)
        }
        if (this.walls.bottom){
            ctx.fillRect(this.x, this.y + this.size - this.Thickness, this.size , this.Thickness)
        }
        if (this.walls.left){
            ctx.fillRect(this.x, this.y, this.Thickness, this.size)
        }
        ctx.restore();
        this.wallSegments = this.computeWallSegments();
    }

    index(k,l){
        if (k < 0 || l < 0 || k >= this.game.mapCells || l >= this.game.mapCells){
            return undefined
        }
        return k * this.game.mapCells + l
    }

    checkNeighbors() {
        this.neighbors = [];

        this.top = this.game.cells[this.index(this.i, this.j - 1)];
        this.right = this.game.cells[this.index(this.i + 1, this.j)];
        this.bottom = this.game.cells[this.index(this.i, this.j + 1)];
        this.left = this.game.cells[this.index(this.i - 1, this.j)];

        [this.top, this.right, this.bottom, this.left].forEach(cell => {
            if (cell && !cell.visited) this.neighbors.push(cell);
        });

        if (this.neighbors.length > 0) {
            const r = Math.floor(Math.random() * this.neighbors.length);
            return this.neighbors[r];
        }
        return false
    }
    // TODO use when update walls 👍
    updateGeometry(){
        this.x = this.i * this.size;
        this.y = this.j * this.size;
        this.center.x = this.x + this.size / 2;
        this.center.y = this.y + this.size / 2;
        this.bounds.left = this.x;
        this.bounds.top = this.y;
        this.bounds.right = this.x + this.size;
        this.bounds.bottom = this.y + this.size;
        this.wallSegments = this.computeWallSegments();
    }

    
    computeWallSegments(){
        const segs = [];

        if (this.walls.top) {
            segs.push({ side: 'top', x1: this.x, y1: this.y, x2: this.x + this.size, y2: this.y });
        }
        if (this.walls.left) {
            segs.push({ side: 'left', x1: this.x, y1: this.y, x2: this.x, y2: this.y + this.size });
        }   
        if (this.walls.right && this.i === this.game.mapCells - 1) {
            segs.push({ side: 'right', x1: this.x + this.size, y1: this.y, x2: this.x + this.size, y2: this.y + this.size });
        }
        if (this.walls.bottom && this.j === this.game.mapCells - 1) {
            segs.push({ side: 'bottom', x1: this.x, y1: this.y + this.size, x2: this.x + this.size, y2: this.y + this.size });
        }

        return segs;
        }
}

// |*********|
// Particle class 
// |*********|
class Particle {
    constructor(x, y, radius, speed, lifetime, game){
        this.x = x;
        this.y = y;
        this.game = game;
        this.ctx = game.ctx;
        this.color = game.selectedTheme.explosionParticle;
        this.radius = radius;
        this.radians = Math.PI * 2;
        this.radianRatio = Math.PI / 180;
        // this.cell = [];
        // this.newCell = [];
        // this.neighborCells = [];
        // this.cellsBool = true;

        this.speed = speed;
        this.vx;
        this.vy;
        this.lifeTime = lifetime;
        this.dead = false;
        this.initializeProjectile()
    }
    drawParticle(){
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.x, this.y, this.radius, 0, this.radians)
        this.ctx.fill()
        this.ctx.restore()

        this.color = this.color.slice(0, 7) + Math.max(0, parseInt(this.color.slice(7, 9), 16) - 2).toString(16).padStart(2, '0');
    }
    initializeProjectile(){
        const randomAngle = Math.floor(Math.random() * 360)
        this.vx = this.speed * Math.sin(randomAngle * this.radianRatio)
        this.vy = -this.speed * Math.cos(randomAngle * this.radianRatio)
    }   
}
class RectParticle {
    constructor(x, y, width, height, speed, lifetime, angle,game){
        this.x = x;
        this.y = y;
        this.game = game;
        this.ctx = game.ctx;
        this.width = width;
        this.height = height;
        this.color = game.selectedTheme.explosionParticle;
        this.speed = speed;
        this.vx;
        this.vy;
        this.lifeTime = lifetime;
        this.angle = angle
        this.dead = false;
        this.radianRatio = Math.PI / 180;
        this.initialize();
    }
    drawParticle(){
        this.ctx.save()
        this.ctx.translate(this.x, this.y)
        this.ctx.rotate(this.angle)
        this.ctx.fillStyle = game.selectedTheme.colors[2]
        this.ctx.fillRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
            );
        this.ctx.restore();
    }

    initialize(){
        this.vx = this.speed * Math.sin(this.angle * this.radianRatio);
        this.vy = -this.speed * Math.cos(this.angle * this.radianRatio);
    }
}
// |+++++++++|
// Cell class 
// |+++++++++|
class PowerUp {
    constructor(x, y, game){
        this.x = x;
        this.y = y;
        this.game = game;
        this.ctx = this.game.ctx;
        this.size = CFG.pwrupSize;
        this.dead = false;
    }
    drawPowerUp(){
        this.ctx.save()
        if (this.game.graphics){
            this.ctx.shadowColor = this.game.selectedTheme.colors[2];
            this.ctx.shadowBlur = 10;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
        }
        this.ctx.fillStyle = this.game.selectedTheme.colors[2]
        this.ctx.fillRect(this.x, this.y, this.size, this.size)
        this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
        this.ctx.strokeStyle = this.game.selectedTheme.colors[1]
        this.ctx.strokeRect(this.x, this.y, this.size, this.size)
        
        this.ctx.restore()
    }
    
}
class movementSpeedPU extends PowerUp{
    constructor(x, y, game) {
        super(x, y, game);
        this.image = powerUpSprites.movementSpeedPU
    }
    onPickup(player) {
        player.maxVelocity *= 1.5
        player.rotationSpeed *= 1.5
        setTimeout(() => {player.maxVelocity /= 1.5; player.rotationSpeed /= 1.5}, 10000)
        this.dead = true
    }
}
class reloadSpeedPU extends PowerUp{
    constructor(x, y, game) {
        super(x, y, game);
        this.image = powerUpSprites.reloadSpeedPU
    }
    onPickup(player) {
        player.reloadTime *= 0.1;
        this.dead = true
        setTimeout(() => player.reloadTime /= 0.1, 5000);
    }
}
class refreshPU extends PowerUp{
    constructor(x, y, game) {
        super(x, y, game);
        this.image = powerUpSprites.refreshPU
    }
    onPickup(player) {
        const xCoord = this.game.players.map((coord) => coord.x)
        const yCoord = this.game.players.map((coord) => coord.y)
        console.log(xCoord, yCoord)
        
        this.game.players.forEach((player, index) => {
            if (index < this.game.players.length - 1){
                player.x = xCoord[index + 1] 
                player.y = yCoord[index + 1] 
            } else {
                player.x = xCoord[0]
                player.y = yCoord[0]
            }
        })
        this.dead = true
    }
}
class laserPU extends PowerUp{
    constructor(x, y, game) {
        super(x, y, game);
        this.image = powerUpSprites.laserPU
    }
    onPickup(player) {
        player.ammo.unshift(2,2,2)
        this.dead = true
    }
}

const POWER_UPS = [movementSpeedPU,reloadSpeedPU,refreshPU,laserPU]
const powerUpSprites = {
    movementSpeedPU: loadImage('./assets/movementSpeedPU.png'),
    reloadSpeedPU: loadImage('./assets/reloadSpeedPU.png'),
    refreshPU: loadImage('./assets/refreshPU.png'),
    laserPU: loadImage('./assets/laserPU.png')
}
function loadImage(src){
    const img = new Image();
    img.src = src;
    return img;
}
// let SelectedPlayerAmount = 1;

// playerAmountSection.addEventListener('click', (e) => {
//     if(e.target.classList.contains('play-setup-button')){
//         SelectedPlayerAmount = parseInt(e.target.dataset.amount);
//         playerAmountSection.classList.remove('play-active');
//     }
// })
