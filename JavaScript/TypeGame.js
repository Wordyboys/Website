var canvas = document.createElement('canvas');
canvas.id = 'typeGameCanvas';
//var containerDiv = document.getElementById('container')
var rendercanvas = canvas.getContext('2d');
//canvas.width = 1000;
//canvas.height = 800;

//document.getElementsByTagName('body')[0].appendChild(canvas);
document.body.appendChild(canvas);
//containerDiv.appendChild(canvas);
//quick tip dont name stuff bad 

//add more words 
//words dont want to overlap 
//dont want the same word on canvas


function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFixedText();
}

function drawFixedText(){
    const currentInput = document.getElementById('currentInput');
    currentInput.style.flexdirection =  'column';
    currentInput.style.minWidth = '700px';
    currentInput.style.paddingLeft = '20px';
    currentInput.style.top = '40px';
    currentInput.style.fontSize = '20px';
    currentInput.style.color = '#36fd57'
    currentInput.style.display = 'flex'
    currentInput.style.textShadow = '0 0 20px #36fd57';
    currentInput.style.zIndex = '10'
    currentInput.innerHTML = 'CURRENT INPUT: ' + typetext;
    
    rendercanvas.fillStyle = '#36fd57';
    rendercanvas.shadowColor = '#36fd57';
    rendercanvas.shadowBlur = 20;
    
}

//Global Variables
var typetext = '';
var keypressed = false;
let words = [];

class word 
{
    constructor(text, xpos, ypos, speed, link, sound)
    {
        this.text = text;
        this.xpos = xpos;
        this.ypos = ypos;
        this.speed = speed;
        this.link = link;
        this.sound = sound;
    }

    draw()
    {
    rendercanvas.font = '20px russiangothic, ms ui gothic, nec_apc3, Tahoma';
    rendercanvas.fillText(this.text, this.xpos, this.ypos)
    }

    update()
    {
        this.xpos += this.speed;
    }

}

function addwords()
{
    const wordlist = 
    [
      { text: "TICK TAC TOE", link: "../HTML/TickTacToe.html" },
      { text: "TOM", link: '', sound: '../Audio/ryeaudio.wav'},
      { text: "HARRY", link: ''},
      { text: "LIAM", link: ''},
      { text: "JIM", link: ''},
      { text: "ALBERT", link: ''},
      { text: "TRY TYPING", link: ''},
      { text: "SOUND", link: '', sound: '../Audio/ryeaudio.wav'},
      { text: "JAMES", link: '', sound: '../Audio/james.wav'},
      { text: "GITHUB", link: 'https://github.com/Wordyboys'},
      { text: "RYAN", },
    ];
     
    const wordData = wordlist[Math.floor(Math.random() * wordlist.length)];    
    const text = wordData.text; // google this shit
    const xpos = -rendercanvas.measureText(text).width;
    const ypos = Math.random() * (canvas.height - 200) + 200; 
    const speed = 0.4 //can do mathrandom but that shit ass
    const link = wordData.link;
    const sound = wordData.sound;
    if (words.every(word => word.text !== text))
    words.push(new word(text, xpos, ypos, speed, link, sound));
}

function updatewords()
{
    rendercanvas.clearRect(0, 0, canvas.width, canvas.height);
    
    words.forEach(word =>
    {
        word.update();
        word.draw();
        
    })

    words = words.filter(word => word.xpos < canvas.width );

    drawFixedText()
    checkword();   
}

function gameloop()
{
    updatewords();
    requestAnimationFrame(gameloop);
}

function keyPressedHandler(event)
{
    keypressed = true;
    if(event.keyCode == 8)
    {
        typetext = typetext.slice(0, -1);
        click();
    }
    else if(event.keyCode == 32)
    {
        event.preventDefault(); //STOPS SPACEBAR FROM SCROLING DOWN THE PAGE
        typetext += ' ';
        click();
    }
    else if(event.key.length == 1 && event.key.match(/[a-z]/i)) //if (event.key !== 'backspace')
    {   
        typetext  += event.key.toUpperCase();          
        click(); 
    }
    console.log('key pressed =', typetext);

    checkword();  
}
document.addEventListener('keydown', keyPressedHandler);

function checkword(){
    
    let foundMatch = false;

    words.forEach(word =>
    {
        if(word.text == typetext.trim())
        {
            //LINKS//
            if(word.link)
            {
                switch(word.text){
                    case 'GITHUB':
                        window.open(word.link);
                    break;

                    default:
                    if(word.link){
                        window.location.href = word.link; 
                    }
                }
                                 
            }
            foundMatch = true;

            //SOUNDS//
            if(word.sound){
                soundfortext(word.sound);
            }   
        }

        //SECRETS//
        switch(typetext){
            case 'MCMENTAL':
                window.open(word.link = "https://www.youtube.com/watch?v=mXMVYlbeOnY");
                typetext = '';
            case 'FUNNY':
                window.open(word.link = "https://www.youtube.com/watch?v=uyglquIIY9w");
                typetext = '';
            break;
        }
   
        
        if(foundMatch)
        {           
            words = words.filter(word => word.text !== typetext.trim());
            typetext = '';
        }
    });
}

setInterval(addwords, 3000);
resizeCanvas();
gameloop();
window.addEventListener('resize', resizeCanvas);
