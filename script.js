const messages = [
"💜 أنتِ أقوى مما تتوقعين.",
"✨ وجودك يصنع فرقاً جميلاً.",
"🌸 ابتسامتك تنشر السعادة.",
"⭐ لا تستسلمي أبداً.",
"💫 المستقبل يحمل لك الخير.",
"🌷 أنتِ شخص رائع.",
"💖 استمري فأنتِ تتقدمين.",
"🎀 ثقي بنفسك دائماً.",
"☁️ الأيام الصعبة مؤقتة.",
"👑 تستحقين كل شيء جميل."
];

const STORAGE_KEY = "rano_cards";
const DATE_KEY = "rano_start";

let openedCards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

if(!localStorage.getItem(DATE_KEY)){
localStorage.setItem(DATE_KEY,Date.now());
}

const startDate = parseInt(localStorage.getItem(DATE_KEY));

const daysPassed = Math.floor((Date.now()-startDate)/(1000*60*60*24));

const availableCards = Math.min(daysPassed+1,messages.length);

document.getElementById("dayCounter").textContent =
`اليوم ${Math.min(daysPassed+1,10)} من 10`;

document.getElementById("availableCounter").textContent =
`متاح ${Math.max(0,availableCards-openedCards.length)} رسالة`;

const cardsContainer = document.getElementById("scratchCards");

messages.forEach((message,index)=>{

const card = document.createElement("div");
card.className="scratch-card";

const msg = document.createElement("div");
msg.className="hidden-message";
msg.textContent=message;

const layer = document.createElement("div");
layer.className="scratch-layer";
layer.textContent="اكشط هنا ✨";

if(openedCards.includes(index)){
layer.classList.add("opened");
}

layer.onclick=()=>{

if(openedCards.includes(index)) return;

if(index>=availableCards){
alert("💜 لم يحِن موعد هذه الرسالة بعد");
return;
}

openedCards.push(index);

localStorage.setItem(STORAGE_KEY,JSON.stringify(openedCards));

layer.classList.add("opened");

updateProgress();
};

card.appendChild(msg);
card.appendChild(layer);
cardsContainer.appendChild(card);
});

function updateProgress(){
const percent = (openedCards.length/messages.length)*100;
document.getElementById("progressBar").style.width = percent + "%";
}
updateProgress();

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

playBtn.onclick = () => {
if(audio.paused){
audio.play();
playBtn.textContent="❚❚";
}else{
audio.pause();
playBtn.textContent="▶";
}
};

audio.addEventListener("timeupdate",()=>{
progress.value = (audio.currentTime/audio.duration)*100 || 0;
});

progress.addEventListener("input",()=>{
audio.currentTime = (progress.value/100)*audio.duration;
});

function reveal(){
document.querySelectorAll(".reveal").forEach(el=>{
if(el.getBoundingClientRect().top < window.innerHeight - 100){
el.classList.add("active");
}
});
}

window.addEventListener("scroll",reveal);
reveal();
function askReset(){
const password = prompt("🔐 أدخل كلمة السر لإعادة الموقع:");

if(password === "1234"){
localStorage.removeItem("rano_cards");
localStorage.removeItem("rano_start");
location.reload();
}else{
alert("❌ كلمة السر خاطئة");
}
}