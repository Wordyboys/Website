function soundfortext(audioPath){
    let audio = new Audio(audioPath)
    audio.play();
}
function soundbutton(){
    var audio = document.getElementById('audio')
    audio.currentTime = 0;
    audio.play();
}
function click(){

    const audio = new Audio('../Audio/click.wav') 

    audio.currentTime = 0;
    audio.play()
}