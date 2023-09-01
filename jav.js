const teclasNum = [...document.querySelectorAll(".num")] // "querySelectorAll" para pegar todas as teclas que tem a classe "num"
const teclasOp = [...document.querySelectorAll(".op")] // array para pegar teclas de operacao
const teclaResult = document.querySelector(".result") // "querySelector" porque tem apenas uma tecla
const visor = document.querySelector(".visor") // pegar o elemento do visor
const tlimpa = document.getElementById("tlimpa") // obter o elemento para o botão limpar
const tigual = document.getElementById("tigual") // Obter elemento DOM para o botão de igual

let sinal = false // "false" porque não tem nenhum sinal inicialmente
let OperandoAtual = "" // Inicializar uma string para armazenar o operando atual que está sendo construído
let historOpera = [] // Array para armazenar o histórico de operações

// Função para adicionar um caractere ao visor
function addToDisplay(value) {
  OperandoAtual += value // OperandoAtual = OperandoAtual + value
  document.getElementById("visor").innerText = OperandoAtual
}

// Para cada elemento, adicionar "addEventListener", evento de click, passando parâmetro "evt"
teclasNum.forEach((el) => {
  el.addEventListener("click", (evt) => {
    sinal = false // Quando digitar, volta pra false. Isso fará com que haja troca entre o "teclasNum" e o "teclasOp" 

    // Quando estiver o zero e digitar um número, limpa o visor (sai o zero)
    if (visor.innerHTML === "0") {
      visor.innerHTML = ""
    }

    addToDisplay(evt.target.innerHTML) // evt.target é a própria tecla, o innerHTML
    /*
    // "+=" é equivalente a innerHTML = innerHTML + evt
    visor.innerHTML += evt.target.innerHTML
    */
  })
})

// Adicionar addEventListener às chaves do operador
teclasOp.forEach((el) => {
  el.addEventListener("click", (evt) => {

    if (!sinal) { // Se sinal for false, colocar true
      sinal = true
      if (visor.innerHTML === "0") { // Se no visor estiver o zero, apagar o conteúdo do visor
        visor.innerHTML = "" // Visor recebe vazio
      }
      if (evt.target.innerHTML === "x") { // Se o sinal for x...
        addToDisplay("*") // ...adiciona
      } else {
        addToDisplay(evt.target.innerHTML);
        /*
       visor.innerHTML += evt.target.innerHTML
       */
      }
    }
  })
})

// Adiciona addEventListener ao botão limpar
tlimpa.addEventListener("click", (evt) => {
  OperandoAtual = ""

  sinal = false   // O limpa também volta o sinal para true

  visor.innerHTML = "0" // Pegar o visor e com innerHTML ele coloca o 0
})

// Adiciona addEventListener ao botão igual
tigual.addEventListener("click", (evt) => {
  sinal = false
  if (OperandoAtual !== "") {

    // Pega o resultado do visor e vai jogar para o eval
    // O eval resolve a expressão. Nesse caso, pega o que está no visor, realiza a operação, coloca no "result"... 
    const result = eval(OperandoAtual)

    visor.innerHTML = OperandoAtual + "= " + result // ... e pega o conteúdo do "result" e joga no visor

    // Salvar operação no histórico
    historOpera.unshift({ // push OU unshift
      operation: OperandoAtual,
      result: result,
      time: new Date().toLocaleString()
    })

    atualizExibHistor() // Atualiza a exibição do histórico de operações
    OperandoAtual = "" // Limpa o operando atual
  }
})

// Função para atualizar a exibição do histórico de operações
function atualizExibHistor() {
  const histor = document.getElementById("histor") // Elemento de histórico adicionado
  histor.innerHTML = "" // Limpa o conteúdo existente da exibição do histórico

  for (let i = Math.max(0, historOpera.length - 4); i < historOpera.length; i++) { // Itera pelas últimas 4 operações históricas (ou todas se houver menos)
    const operationItem = historOpera[i] // Recupera a operação histórica atual
    const operationButton = document.createElement("div") // Cria um novo elemento no DOM para representar a operação histórica
    operationButton.textContent = `${operationItem.operation} = ${operationItem.result} (${operationItem.time})` // conteúdo do texto do elemento que mostra a operação, o resultado e o momento
    operationButton.classList.add("historical-operation") // Adiciona uma classe a cada botão de operação do histórico

    operationButton.addEventListener("click", function () { // adiciona a operação ao visor apenas quando a entrada do histórico é clicada
      addToDisplay(operationItem.operation)
    })

    histor.appendChild(operationButton) // Acrescenta o item do histórico ao visor
    histor.appendChild(document.createElement("br")) // quebra de linha após cada elemento da operação histórica
  }
}