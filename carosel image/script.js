//get element from HTML 
//container for all image
const crouselSlide = document.querySelector('.crousel-slide');
const crouselImage = document.querySelectorAll('.crousel-slide img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicators = document.querySelectorAll('.indicator');

//state for curent index
let currentIndex = 0;
const totalImage = crouselImage.length;

//variabel to save interval auto slide
let autoSlideInterval;
console.log(crouselImage)
//function to udate crousel
function updateCrousel(){
    crouselSlide.style.transfrom =`translateX(${-currentIndex * 100 } %)`

    //udate indikator active
    indicators.forEach((indicators, index) => {
        indicators.classList.toggle('active', index === currentIndex)
    })

    
}
//function to next slide 
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalImage
    updateCrousel()
    resetAutoSlide()
  console.log(console.log(`Current Index: ${currentIndex}`))
};

//function to prev slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalImage) % totalImage
    updateCrousel()
    resetAutoSlide()
};

//function to reset auto slide
function resetAutoSlide() {
    clearInterval(autoSlideInterval)
    autoSlideInterval = setInterval(nextSlide, 5000)
};


//add eventlistener to next,prev and indicator
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

indicators.forEach((indicators, index) => {
    indicators.addEventListener('click', () => {
        currentIndex = index
        updateCrousel()
        resetAutoSlide()
    })
})

resetAutoSlide();