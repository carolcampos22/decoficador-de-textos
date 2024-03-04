let textArea = document.querySelector(".text-area")
let mensagem = document.querySelector(".mensagem")

//evitar que o usuário digite caracteres especiais e letras maiúsculas
textArea.addEventListener("keypress", function(e) {
    if(!checarCaractere(e)) {
        e.preventDefault()
    }
})

//evitar que o usuário cole textos com caracteres especiais
textArea.addEventListener("paste", function() {
    const regex = new RegExp("^[a-z0-9\s]")
    const self = this

    setTimeout(function() {
        const text = self.value

        if(!regex.test(text)) {
            self.value = ""
        }
    }, 100)
})


function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


function btnEncriptar() {
    const textoSemAcentos = removerAcentos(textArea.value);
    const textoEncriptado = encriptar(textoSemAcentos)
    mensagem.value = textoEncriptado
    textArea.value = ""
}

function btnDesencriptar() {
    const textoSemAcentos = removerAcentos(textArea.value);
    const textoDesencriptado = desencriptar(textoSemAcentos)
    mensagem.value = textoDesencriptado
}

function desencriptar(stringDesencriptada){
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]]
    stringDesencriptada = stringDesencriptada.toLowerCase()

    for (let i = 0; i < matrizCodigo.length; i++){
        if(stringDesencriptada.includes(matrizCodigo[i][1])){
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
        }
    }

    return stringDesencriptada
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]]
    stringEncriptada = stringEncriptada.toLowerCase()

    for (let i = 0; i < matrizCodigo.length; i++){
        if(stringEncriptada.includes(matrizCodigo[i][0])){
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }
    }

   
    return stringEncriptada
}

function copiarTexto() {
    var mensagemParaCopiar = document.querySelector(".mensagem");

    // Seleciona o texto dentro da área de texto
    mensagemParaCopiar.select();

    try {
        // Tenta copiar o texto para a área de transferência usando a API Clipboard
        navigator.clipboard.writeText(mensagemParaCopiar.value)
            .then(() => {
                // Alerta o usuário que o texto foi copiado
                textoCopiado = document.querySelector(".botao-copiar")
                textoCopiado.innerHTML = "Copiado!"        
                
                // Restaura o texto do botão após um atraso de 2 segundos (2000 milissegundos)
                setTimeout(function() {
                    textoCopiado.innerHTML = "Copiar";
                }, 3000); 
            })
            .catch(err => {
                // Se houver um erro ao copiar, trata o erro aqui
                console.error('Erro ao copiar texto:', err);
                alert('Erro ao copiar texto. Por favor, copie manualmente.');
            });
    } catch (err) {
        // Se o navegador não suportar a API Clipboard, trata o erro aqui
        console.error('API Clipboard não suportada:', err);
        alert('Este navegador não suporta a função de copiar para a área de transferência. Por favor, copie manualmente.');
    }
}

function checarCaractere(e){
    const char = String.fromCharCode(e.keyCode);

    const pattern = /^[a-z0-9\s]$/;

    if(char.match(pattern)) {
        return true;
    }
}