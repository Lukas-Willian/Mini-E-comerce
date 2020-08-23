function Upload(){
    location.href = 'Produtos.html'
}

let car = document.getElementById('sectionOrigin')
let Carz = document.getElementById('Carz')
Carz.addEventListener('mouseover' , function(){
    car.style.height = '300px'
    car.style.transition = '1s'
})
Carz.addEventListener('mouseout', function(){

    car.style.height = '0'
})

let sec = document.getElementById('sectionOrigin')
sec.addEventListener('mouseover' , function(){
    car.style.height = '300px'
    car.style.transition = '1s'
})
sec.addEventListener('mouseout' , function(){
    car.style.height = '0px'
    car.style.transition = '1s'
})































