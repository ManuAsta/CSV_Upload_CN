let timer=10;


let timerInt=setInterval(decreaseTime,1000);
function decreaseTime(){
    document.getElementById("time").innerText=timer;
    if(timer==0){
        clearInterval(timerInt);
        window.location.href="/";
        return;
    }
   timer-=1;
   console.log(timer);

}

decreaseTime();

new Noty({
    theme:"metroui",
    text: 'File Already Exists!',
    type:"warning",
    timeout:5000
    
}).show();