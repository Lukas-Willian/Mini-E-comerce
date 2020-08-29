
let body = document.getElementById('Body')
let file = document.getElementById('file');
let ArrayProduct = [];




file.addEventListener('change' , function(){

/*Create new FileReader*/
    let filem = this.files[0];
    console.log(filem);
    let reader = new FileReader();

    


/*Create all elements*/
    setTimeout(()=>{

    /*Create image*/
        
        let img = document.createElement('img');
        img.classList.add('img');
        img.src = reader.result
        section.appendChild(img)



    reader.readAsDataURL(filem)


},100)





reader.readAsDataURL(filem)




})

modules.exports = {
    reader: reader
}

































