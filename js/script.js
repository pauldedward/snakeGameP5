var tryAgain = document.getElementById("tryAgain");
var dialogue = document.getElementById("dialog");
var score = document.getElementById("score");

function openModal()
{
    document.getElementById("background").style.zIndex = 10;
    dialogue.style.display = "flex";   
}

tryAgain.addEventListener("click",function()
{
    dialogue.style.display = "none"; 
    document.getElementById("background").style.zIndex = -10;
    resetGame();
});