// Alerta de bem-vindo com data e hora
var dataAtual = new Date();
var horaAtual = new Date();

// Data e hora
var dataFormatada =  dataAtual.toLocaleDateString();
var horaFormatada = horaAtual.toLocaleTimeString();

// Cria a mensagem do alerta
var mensagem = "\nData: " + dataFormatada + "\nHora: " + horaFormatada;

// Exibir o alerta
alert("Seja bem-vindo" + mensagem);

//Menu Bars
const btnMobile = document.getElementById('btn-mobile');
const link_nav = document.getElementsByClassName('link_nav');
function toggleMenu(event){
    if (event.type === 'touchstart') event.preventDefault();
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
    const active = nav.classList.contains('active');
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);


// =========== Carrossel =================
// Resgatando os elementos do HTMl
const setaEsquerda = document.querySelector(".seta-esquerda");
const setaDireita = document.querySelector(".seta-direita");
const imgCarrossel = document.querySelector("#carrosselImgElement");
const legendaImagemCarrossel = document.querySelector("#legendaCarrossel");

// definindo os valores das imagens e legendas
// Imagem e alt
const imagens = [
    [
        "./img/img-projeto.jpg",
        "Imagem de uma estante com varias plantas e sensores ligados a terra juntamente com luzes em sua direção"
    ],
    [
        "./img/agroTechTower-IAGenerativeImage01.png",
        "Uma estrutura de prateleiras compostas por plantas e luzes",
    ],
    [
        "./img/ArquiteturaProjeto-imgIA01.png",
        "Um esboço da prateleira compostas de plantas",
    ],
    [
        "./img/ArquiteturaProjeto-imgIA02.png",
        "Outro esboço da prateleira compostas de plantas",
    ],
];  // Array com os nomes das imagens
const legendas = [
  "Imagem ilustrativa do projeto SmartGrow",
  "Imagem gerada por uma IA Generativa sobre a estrutura do nosso projeto",
  "Um esboço do projeto gerado por uma IA Generativa de imagens",
  "Outra verão de esboço do projeto gerado pela mesma IA Generativa",
]; // Array com as legendas correspondentes

let indiceImagemAtual = 0;


function atualizarCarrosel(){
    // buscando as imagens e o alt no array
    imgCarrossel.src = imagens[indiceImagemAtual][0];
    imgCarrossel.alt = imagens[indiceImagemAtual][1];
    // buscando legendas no array
    legendaImagemCarrossel.textContent = legendas[indiceImagemAtual];
}
// Avançar as imagens do carrosel
function avancarImagem(){
    indiceImagemAtual++;
    if(indiceImagemAtual >= imagens.length){
        indiceImagemAtual = 0;
    }
    atualizarCarrosel();
}

// Retroceder as imagens do carrosel
function retrocederImagem(){
    indiceImagemAtual--;
    if(indiceImagemAtual < 0){
        indiceImagemAtual >= imagens.length -1;
    }
    atualizarCarrosel();
}


let timer;
function iniciarCarroselAuto(){
    timer = setInterval(avancarImagem, 5000); // avançar imagem 
}

function pararCarrosselAuto(){
    clearInterval(timer); //Para o temporizador
}

setaDireita.addEventListener("click",()=>{
    pararCarrosselAuto();
    avancarImagem();
    iniciarCarroselAuto();
    // Altera a imagem e reinicia o tempo para a alteração automática
});

setaEsquerda.addEventListener("click", ()=>{
    pararCarrosselAuto();
    retrocederImagem();
    iniciarCarroselAuto();
    // Altera a imagem e reinicia o tempo para a alteração automática
});

// inicialização do carrosel
atualizarCarrosel();
iniciarCarroselAuto();


// ================== Validando formulário de recado ==========================
// recuperando inputs do Formulario Recado
const form = document.querySelector("form[class='colorful-form']");
const nomeInput = document.querySelector("#inputNome");
const emailInput = document.querySelector("#inputEmail");
const phoneInput = document.querySelector("#inputPhone");
const mensagemInput = document.querySelector("#inputMensagem");
const btnEnviarRecado = document.querySelector("#btnEnviarRecado");

// Recuperando spans de mensagem de erro
spanNome = document.querySelector("#errorName");
spanEmail = document.querySelector("#errorEmail");
spanPhone = document.querySelector("#errorPhone");
spanMensagem = document.querySelector("#errorMensagem");

// Prevenindo
form.addEventListener("submit", (e)=>{
    e.preventDefault();
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validando telefone
var telefoneLength = 11;
phoneInput.addEventListener("input", function (e){
    var value = e.target.value;
    value = value.replace(/\D/g, ""); //remove todos os caracteres não numéricos

    if (value.length > telefoneLength){
        value = value.slice(0, phoneLength); // limita a quantidade de caracteres
    }

    value = value.replace(/(\d{2})(\d)/, "($1) $2"); // Adiciona parênteses e espaço após os primeiros dois dígitos
    value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona hífen após os próximos cinco dígitos

    e.target.value = value;
})

// validando campos do formulário
// campo do nome
nomeInput.addEventListener("blur", ()=>{
    if(nomeInput.value.trim()== "" || !nomeInput.value){
        spanNome.innerText = "nome não pode ser nulo !!"
    }
});
nomeInput.addEventListener("keydown", ()=>{
    spanNome.innerText = "";
})
// campo de email
emailInput.addEventListener("blur", ()=>{
    if(emailInput.value.trim()== ""){
        spanEmail.innerText = "Email não pode ser nulo !!"
    }
    else if (!emailRegex.test(emailInput.value)){
        spanEmail.innerText = "Email inválido";
    }
});
emailInput.addEventListener("keydown", ()=>{
    spanEmail.innerText = "";
});
// campo de telefone
phoneInput.addEventListener("blur",()=>{
    if(phoneInput.value.trim() == "")
    {
        spanPhone.innerText = "telefone não pode ser nulo!!";
    }
    else if (phoneInput.value.length < phoneLength) {
        spanPhone.innerText = "telefone Inválido";
    }
});
phoneInput.addEventListener("keydown", () => {
  spanPhone.innerText = "";
});
// // campo de mensagem
mensagemInput.addEventListener("blur", ()=>{
    if (mensagemInput.value.trim()==""){
        spanMensagem.innerText = "Mensagem não pode ser nula !!" 
    }
});
mensagemInput.addEventListener("keydown", ()=>{
    spanMensagem.innerText = "";
});

// Botão de enviar 
btnEnviarRecado.addEventListener("click", function (){
    camposVazios = "";
    valid = true;
    if (!nomeInput.value || nomeInput.value.trim() == "") {
        camposVazios += "- NOME\n";
        valid = false;
        spanNome.innerText = "nome não pode ser nulo!!"
    }

    if (!emailInput.value || emailInput.value.trim() == "") {
        camposVazios += "- EMAIL\n";
        valid = false;
        spanEmail.innerText = "email não pode ser nulo!!"
    }else if (!emailRegex.test(emailInput.value)) {
        alert("Por favor, insira um email válido.");
        valid = false;
        spanEmail.innerText = "email Inválido"
    }

    if (!phoneInput.value || phoneInput.value.trim() == "") {
        camposVazios += "- TELEFONE\n";
        valid = false;
        spanPhone.innerText = "telefone não pode ser nulo!!"
    } else if (phoneInput.value.length < phoneLength) {
        alert("Telefone invalido!");
        valid = false;
        spanPhone.innerText = "telefone Inválido"
    }

    if (!mensagemInput.value || mensagemInput.value.trim() == "") {
        camposVazios += "- MENSAGEM\n";
        valid = false;
        spanMensagem.innerText = "mensagem não pode ser nula!!"
    }

    if (camposVazios.length > 0) {

        alert("Os campos não podem ser vazios!!\nPreencha o(s) campo(s):\n" + camposVazios);
    }
    if(valid){

        // Enviando para o localStorage
        let userData = {
            nome: nomeInput.value,
            email: emailInput.value,
            telefone: phoneInput.value,
            mensagem: mensagemInput.value
        };

        localStorage.setItem = ("userData", JSON.stringify(userData));

        //alerta de recado  enviado
        alert("Recado enviado!\nObrigado pela sua opinião: ");
        nomeInput.value = ""
        emailInput.value = ""
        phoneInput.value = ""
        mensagemInput.value = ""
    }
});

// Dark Mode
const darkModeBtn = document.getElementById("darkModeBtn");
const body = document.body;

const container01 = document.getElementById('oque')


darkModeBtn.addEventListener("click", function () {
  // Alterar a cor de fundo da pagina
  body.classList.toggle("dark-mode");

  darkModeBtn.classList.toggle("dark-mode");
  
  // Atualizar o texto do botão com base no modo atual
  if (body.classList.contains('dark-mode')) {
    darkModeBtn.textContent = 'Modo Claro';
  } else {
    darkModeBtn.textContent = 'Modo Escuro';
  }
});
