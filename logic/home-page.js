const icon = document.getElementById("icon");
const icon2 = document.getElementById("icon-2");
const toggle = document.getElementById("toggle-button")
const ham = document.getElementById("ham")
const cross = document.getElementById("cross")
const list = document.getElementById("right")


icon.addEventListener("click", () => {
  icon.style.display = "none";
  icon2.style.display = "block";
});

icon2.addEventListener("click", () => {
  icon2.style.display = "none";
  icon.style.display = "block";
});

const bannerImages = document.querySelectorAll(".banner-image");
let currentIndex = 0;

setInterval(() => {
  bannerImages[currentIndex].classList.remove("active");

  if (currentIndex === bannerImages.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  bannerImages[currentIndex].classList.add("active");
}, 5000);

toggle.addEventListener("click" , () => {
    list.classList.toggle("right");
    ham.classList.toggle("display");
    cross.classList.toggle("ondis");
    
    
    


})

    

