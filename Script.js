
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
    body.appendChild(section);



/*Create Product Name*/
    let Name = document.createElement('p');
    Name.classList.add('Name-post');
    Name.innerText = Nome;
    section.appendChild(Name);

    /*Create image*/
    
        let img = document.createElement('img');
        img.classList.add('img');
        img.src = reader.result
        section.appendChild(img)

        let buttonPag = document.createElement('button');
        buttonPag.classList.add('pagB');
        buttonPag.innerHTML = ''
        section.appendChild(buttonPag);
        


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

/*Create Button carrinho*/

    let button = document.createElement('button');
    button.classList.add('button');
    Epreço.appendChild(button);
    console.log(button);
    button.innerText = 'Adicionar ao carrinho';


    let random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+Math.random().toString(36)+Math.random().toString(15,2);
    let Produtos =  {
        Name : Nome,
        Preço : preço,
        descrição : description,
        foto : filem.name,
        fotoLink : reader.result,
        id: random

        
    }
    console.log(Produtos)






    /*Função de adicionar ao carrinho*/

    button.addEventListener('click' , function(){


    
        let section2 = document.getElementById('sectionOrigin')
        

        let carSection = document.createElement('section');
        carSection.classList.add('carSection');
        section2.appendChild(carSection);



        let carIMG = document.createElement('img');
        carIMG.classList.add('carIMG');
        carIMG.src = Produtos.fotoLink
        carSection.appendChild(carIMG)


        let carName = document.createElement('p');
        carName.classList.add('carName');
        carName.innerText = Produtos.Name;
        carSection.appendChild(carName)



        let carPreço = document.createElement('p');
        carPreço.classList.add('carPreço');
        carPreço.innerText = `R$${Produtos.Preço},00`;
        carSection.appendChild(carPreço);

        let button2 = document.createElement('button');
        button2.classList.add('button2');
        button2.innerHTML = 'Remover'
        carSection.appendChild(button2);

        button2.addEventListener('click', function(){
            carSection.remove();


                console.log('Removido')

            
        })


        
    })
}




    reader.readAsDataURL(filem)


},100)




reader.readAsDataURL(filem)

})































