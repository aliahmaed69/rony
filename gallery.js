const images = document.querySelectorAll(".gallery img");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");

images.forEach(img=>{

img.onclick=()=>{

viewer.style.display="flex";
viewerImg.src=img.src;

};

});

viewer.onclick=()=>{

viewer.style.display="none";

};