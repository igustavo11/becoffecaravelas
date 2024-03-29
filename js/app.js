$(document).ready(function(){
    cardapio.eventos.init();

})
var cardapio = {};



var CELULAR_EMPRESA = '5527998496489';

cardapio.eventos = {

    init : () =>{
        cardapio.metodos.obterItensCardapio();
        cardapio.metodos.carregarBotaoLigar();
        cardapio.metodos.carregarBotaoReserva();
       
    }

}
cardapio.metodos ={
    // lista de itens cardapio
    obterItensCardapio:(categoria = 'cafe', vermais = false ) =>{
        var filtro = MENU[categoria];
        console.log(filtro)

        if(!vermais) {
            $("#itensCardapio").html('');
            $("#btnVerMais").removeClass('hidden');

        }


        $.each(filtro, (i, e)=>{
            
            let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.',','))
            .replace(/\${id}/g, e.id)
            // botao ver mais clicado 12 itens

            if(vermais && i >= 4 && i < 12){
                $("#itensCardapio").append(temp)

            }
            // pag inicial 8 itens
            if(!vermais && i < 4) {
                $("#itensCardapio").append(temp)

            }
            
          

        })

        //remover active
        $(".container-menu a").removeClass('active');
        //menu ativo
        $("#menu-"+ categoria).addClass('active')

    },
    //botao ver mais
    verMais : () => {

        var ativo =  $(".container-menu a.active").attr('id').split('menu-')[1];
        cardapio.metodos.obterItensCardapio(ativo, true);

        $("#btnVerMais").addClass('hidden');

    },
   

    carregarBotaoReserva : ()=>{
        var texto = 'Olá gostaria de fazer uma *reserva* na cafeteria';


        let encode = encodeURI(texto);
        let URL = ` https://wa.me/${CELULAR_EMPRESA}?text=${encode}`;

        $("#btnReserva").attr('href', URL);
    },

    carregarBotaoLigar:()=>{
        $("#btnLigar").attr('href', `tel:${CELULAR_EMPRESA}`);
    },

//abre depoimentos dinamicamente
    abrirDepoimento: (depoimento)=>{

        $("#depoimento-1").addClass('hidden');
        $("#depoimento-2").addClass('hidden');
        $("#depoimento-3").addClass('hidden');

        $("#btnDepoimento-1").removeClass('active');
        $("#btnDepoimento-2").removeClass('active');
        $("#btnDepoimento-3").removeClass('active');

        $("#depoimento-" + depoimento).removeClass('hidden');
        $("#btnDepoimento-" + depoimento).addClass('active');

    },
















    //mensagens
    mensagem :(texto, cor = 'red', tempo = 3500)=> {

        let id = Math.floor(Date.now() * Math.random()).toString();
        
       let msg = `<div id="msg-${id}" class ="animated fadeInDown toast ${cor}" >${texto}</div>`;
       $("#container-mensagens").append(msg);

       setTimeout(()=> {
            $("#msg-"+ id).removeClass('fadeInDown');
            $("#msg-"+ id).addClass('fadeOutUp');
            setTimeout(() => {
                $("#msg-"+ id).remove();

                }, 800);
          
       }, tempo)

    }

}
cardapio.templates = {
    item: ` 
            <div class="col-12 col-lg-3 col-md-3 col-sm-6  mb-5 animated fadeInUp">
            <div class="card card-item" id="\${id}">
                <div class="img-produto">
                    <img src="\${img}" alt="">
                </div>
                <p class="title-produto text-center mt-4">
                    <b>\${name}</b>
                </p>
                <p class="price-produto text-center">
                    <b>R$\${price}</b>
                </p>
                <div class="add-carrinho">
                   
                </div>
            </div>
        </div> `,
     
}