let file = document.getElementById('file');
let img = document.getElementById('DefaultImg');



file.addEventListener('change' , function(){
    let filem = this.files[0]
    console.log(filem);
    let reader = new FileReader();
    
    setTimeout(() => {
        img.src = reader.result
    
       
    },100);
    reader.readAsDataURL(filem)
})

Final.addEventListener('click' , function(){
    
    let name = document.getElementById('Nome').value;
    let preço = document.getElementById('preço').value;
    let descrição  =document.getElementById('Descrição').value;

    if(name =='' || preço == ''){
        window.alert('Preencha os campos corretamente')
    }
    else{
        let Obj = {
            Nome:name,
            Preço:preço,
            Descrição:descrição,
        }
        console.log(Obj)
    }

})

