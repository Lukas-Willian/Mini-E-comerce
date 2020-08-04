
let body = document.getElementById('Body')
let file = document.getElementById('file');


file.addEventListener('change' , function(){

/*Create new FileReader*/
    let filem = this.files[0];
    console.log(filem);
    let reader = new FileReader();

    


/*Create all elements*/
    setTimeout(()=>{


/*References to html*/
    let Nome = document.getElementById('Nome').value
    let preço = document.getElementById('preço').value
    let des = document.getElementById('Descrição').value

    if(Nome == '' || preço ==''){
        window.alert('Preencha os campos corretamente')
    }else{

/*Create section*/
    let section = document.createElement('section');
    section.classList.add('sec');


/*Create Product Name*/
    body.appendChild(section);
    let Name = document.createElement('p');
    Name.classList.add('Name-post');
    Name.innerText = Nome;
    section.appendChild(Name);

    /*Create image*/
    
        console.log(reader.result)
        let img = document.createElement('img');
        img.classList.add('img');
        img.src = reader.result
        section.appendChild(img)
        


/*Create Product prece*/
    Epreço = document.createElement('p');
    Epreço.classList.add('Preço');
    Epreço.innerText = `R$${preço},00`
    section.appendChild(Epreço)

/*Create Product description*/
    
    let description = document.createElement('p');
    description.classList.add('Desc');
    description.innerText = des;
    Epreço.appendChild(description);


}
    reader.readAsDataURL(filem)
},100)
reader.readAsDataURL(filem)

})



