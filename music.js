const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

if(audio && playBtn){

    playBtn.onclick = () => {
        if(audio.paused){
            audio.play();
            playBtn.textContent = "❚❚";
        }else{
            audio.pause();
            playBtn.textContent = "▶";
        }
    };

    if(progress){
        audio.addEventListener("timeupdate", () => {
            progress.value = (audio.currentTime / audio.duration) * 100 || 0;
        });

        progress.addEventListener("input", () => {
            audio.currentTime = (progress.value / 100) * audio.duration;
        });
    }
}