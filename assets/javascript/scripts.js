const contexto = document.getElementById('lienzoJuego')
let ctx = contexto.getContext('2d')
let WIDTH = 300;
let HEIGHT = 530;
let CANVAS_WIDTH = 300;
let CANVAS_HEIGHT = 530;
contexto.width = WIDTH;
contexto.height = HEIGHT;
//VARIABLES
let score = 0
let FPS = 60;
let gravedad = 1.5
let personaje = {
    x:50,
    y:150,
    w:50,
    h:50
}

let tuberias = new Array()
tuberias[0] ={
    x: contexto.width,
    y: 0
}
//AUDIOS
let punto = new Audio()
punto.src = 'resources/audios/punto.mp3'

//IMAGENES
let bird = new Image()
bird.src = 'resources/imagenes/keibirdchikita.png'

let background = new Image()
background.src = 'resources/imagenes/background.png'

let tuberiaNorte = new Image()
tuberiaNorte.src = 'resources/imagenes/tuberiaNorte.png'

let tuberiaSur = new Image()
tuberiaSur.src = 'resources/imagenes/tuberiaSur.png'

let suelo = new Image()
suelo.src = 'resources/imagenes/suelo.png'
   
// CONTROL
function presionar(){
    personaje.y -= 35
}

//SCREEN
resize()
function resize(){
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    contexto.width = WIDTH;
    contexto.height = HEIGHT;
    contexto.style.height = ""+CANVAS_HEIGHT+"px";
    
}

//reBUCLE
function rePlay(){
    location.reload()
}
//MENU GAME OVER
function lose(){
   
    alert(`Game Over! Score: ${score}`)
    rePlay()
}

//BUCLE
setInterval(loop, 1000/FPS)
function loop() {
    ctx.clearRect(0,0,300,530)
    //FONDO
    ctx.drawImage(background,0,0)
    ctx.drawImage(suelo,0,contexto.height-suelo.height)
    //PERSONAJE
    ctx.drawImage(bird,personaje.x,personaje.y)
    //TUBERIAS
    for(let i = 0; i<tuberias.length;i++){
        let constante = tuberiaNorte.height + 90 
        ctx.drawImage(tuberiaNorte,tuberias[i].x,tuberias[i].y)
        ctx.drawImage(tuberiaSur,tuberias[i].x,tuberias[i].y + constante)
        tuberias[i].x--
        if(tuberias[i].y + tuberiaNorte.height < 90){
            tuberias[i].y = 0
        }

        if(tuberias[i].x == 100){
            tuberias.push({
                x:contexto.width,
                y: Math.floor(Math.random()*tuberiaNorte.height) - tuberiaNorte.height
            })
        }
        //COLISIONES
        if(personaje.x + bird.width >= tuberias[i].x &&
             personaje.x <= tuberias[i].x + tuberiaNorte.width && 
             (personaje.y <= tuberias[i].y + tuberiaNorte.height ||
                personaje.y + bird.height >= tuberias[i].y + constante)
                || personaje.y + bird.height >= contexto.height - suelo.height){
            return lose()
            
        }
        if(tuberias[i].x == personaje.x){
            score++
            punto.play()
        }
    }

    //CONDICIONES
    personaje.y += gravedad
    ctx.fillStyle = '#fff'
    ctx.font = '25px VT323, monospace'
    ctx.fillText('Score: '+score,200,contexto.height-500)
}

//EVENTOS
window.addEventListener('resize', resize)
window.addEventListener('click', presionar)
jugar.addEventListener('click', rePlay)