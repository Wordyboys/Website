var OandXboard;
var playerx = "X";
var playero = "O";
var currplayer = playerx;
var gameover = false;

window.onload = function()
{
    setGame();
}

function setGame()
{
    OandXboard = 
    [
        [" "," "," "], // 0-0 0-1 0-2 
        [" "," "," "], // 1-0 1-1 1-2 
        [" "," "," "]  // 2-0 2-1 2-2 
    ]

    for(let row = 0; row < 3; row++)
    {
        for(let column = 0; column < 3; column++)
        {
            let tile = document.createElement("div"); // creates a <div> for implimentation
            tile.id = row.toString() + "-" + column.toString(); // adds array data to a string 0-0
            tile.classList.add("tile"); //impliments tile style sheet
            if (row == 0 || row ==1 )
            {
               tile.classList.add("horizontal-line"); // adds horizontal line      
            }
            if (column == 0 || column == 1)
            {
                tile.classList.add("vertical-line"); // adds vertical line
            }
            tile.addEventListener("click", tilemap); //when tile is clicked run tilemap function                      
            document.getElementById("OandXboard").append(tile); // not sure google it !!!!!!!!!!!!!!!!!!!
        }
    }
}

function tilemap()
{
    if(gameover)
    {
        return;
    }

    let coords = this.id.split("-")
    let row = parseInt(coords[0]);
    let column = parseInt(coords[1]);

    if(OandXboard[row][column] != ' ')
    {
        return;
    }

    OandXboard[row][column] = currplayer;
    this.innerText = currplayer;
    
    if(currplayer == playero)
    {
        currplayer = playerx;
    }
    else{
        currplayer = playero;
    }

    checkWinner();

}

function checkWinner()
{
    for(let row = 0; row < 3; row++)
    {
        if(OandXboard[row][0] == OandXboard[row][1] && OandXboard[row][1] == OandXboard[row][2] && OandXboard[row][0] != ' ')
        {
            for (let i = 0; i < 3; i++) 
            {
                let tile = document.getElementById(row.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameover = true;
            return;
        }
    }

    for(let column = 0; column < 3; column++)
    {
        if(OandXboard[0][column] == OandXboard[1][column] && OandXboard[1][column] == OandXboard[2][column] && OandXboard[0][column] != ' ')
        {
            for(let i = 0; i < 3; i++)
            {
                let tile = document.getElementById(i.toString() + "-" + column.toString());
                tile.classList.add("winner");
            }
            gameover = true;
            return;
        }
    }

    if(OandXboard[0][0] == OandXboard[1][1] && OandXboard[1][1] == OandXboard[2][2] && OandXboard[0][0] != ' ')
    {
        for(let i = 0; i < 3; i++)
        {
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameover = true;
        return;
    }

    if(OandXboard[0][2] == OandXboard[1][1] && OandXboard[1][1] == OandXboard[2][0] && OandXboard[0][2] != ' ') //FIX THIS BAG OF WANK // MOFARAH HAS MINIMUM EXP BUT HE COULD DO BETTER JAMES MENTIONED TYPOS NO IDEA WHAT HES ON ABOUTW
        {
            for(let i = 0; i < 3; i++)
            {
                let tile = document.getElementById(i.toString() + "-" + (2 - i).toString());// i dont get this shit man like wtf this dont make any sense brooo wooohhh                
                tile.classList.add("winner");
            }
            gameover = true;
            return;
        }
}