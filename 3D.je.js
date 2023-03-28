//movement animation
const container = document.querySelector(".container");
const card = document.querySelector(".card");

// items 
const title = document.querySelector(".title");
const messi = document.querySelector(".messi img");
const info = document.querySelector(".info h3");
const read = document.querySelector(".read");



container.addEventListener('mousemove', (e) =>{
    let xAxis = (window.innerWidth / 2 - e.pageX ) / 20;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 20;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
});

//animate in 
container.addEventListener("mouseenter", (e) => {
    card.style.transition = "none";
    // popout 
    read.style.transform = "translateZ(150px)";
    messi.style.transform = "translateZ(200px) rotateZ(-20deg)";
    info.style.transform = "translateZ(150px)";
    title.style.transform = "translateZ(150px)";
});


//animate out 
container.addEventListener("mouseleave" , (e) => {
    card.style.transition = "all 0.5 ease";
    card.style.transform =` rotateY(0deg) rotateX(0deg)`
// popback
read.style.transform = "translateZ(0px)"
messi.style.transform = "translateZ(0px) "
info.style.transform = "translateZ(0px)"
title.style.transform = "translateZ(0px)"
});