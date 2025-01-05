document.getElementById('colorInput').addEventListener('input',function(event){
    //get selected color input
    let selectedColor = event.target.value;

    //update the color text
    document.getElementById('colorCode').textContent =selectedColor;

    //update background color display
    document.getElementById('colorDisplay').style.backgroundColor = selectedColor;
})