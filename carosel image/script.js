//get element HTMl
//get container for all image
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImage = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const indicators = document.querySelectorAll('.indicator');

//state current index
let currentIndex = 0;
const totalImage = carouselImage.length;

//variabel to save internal slide
let autoSlideInterval;

function updateCarousel(){
    carouselSlide.style.transform = `translateX(${-currentIndex * 100 }%)`;

    //update indikator active
    indicators.forEach((indicators, index) => {
        indicators.classList.toggle('active', index === currentIndex);
    })
}

function nextSlide(){
    currentIndex = (currentIndex + 1) % totalImage;
    updateCarousel()
    resetAutoSlide()
}


function prevSlide(){
    currentIndex = (currentIndex - 1 + totalImage) % totalImage;
    updateCarousel()
    resetAutoSlide()
}

function resetAutoSlide(){
    clearInterval(autoSlideInterval);

    autoSlideInterval = setInterval(nextSlide, 5000)

}


//addeventlistener for next
nextBtn.addEventListener('click', nextSlide)

//addeventlistener for prev
prevBtn.addEventListener('click', prevSlide)

//addeventlistener for indicator
indicators.forEach((indicators, index) => {
indicators.addEventListener('click', () =>{
    currentIndex = index
    updateCarousel()
    resetAutoSlide()
})
})