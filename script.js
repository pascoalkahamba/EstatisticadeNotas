const $ = document.querySelector.bind(document)
let solucao = $('.solucao')
let butao = $('#butao')
let formEntrada = $('.form1')
let formRegistar = $('#form2')
let butaoRegistar = document.getElementById('butaoRegistar')
let divPrincipal = $('.problema')
let mostraDisciplina = document.getElementsByTagName('h1')[0]
let nomeDisc = $('#disc-nome')
let notaDisc = $('#disc-nota')
let disciplinas = $('#txt-numero')
let paragrafo = $('.paragrafo')
let mostrarResultados = $('.resultadoAnalise')

// const disciplina = {
//     nome:,
//     nota:
// }
let nomeDisciplina = []
let notaDisciplina = []
let tabela = $('.tabela')



let cont = 0
ocultar(formRegistar, butaoRegistar, solucao, paragrafo)

function iniciarAnalise() {
    if (validarNumDisciplinas()) {
        ocultar(butao, formEntrada)

        mostrar(formRegistar, butaoRegistar)

        divPrincipal.classList.add('estiloregisto')
        atualizarTituloDisciplina()

    }
}

function atualizarTituloDisciplina() {
    mostraDisciplina.innerHTML = `Disciplina ${Math.min(cont+1,disciplinas.value)}`
}

function validarNumDisciplinas() {
    if (+disciplinas.value < 2) {
        alert('O numero de disciplinas tem de ser maior ou igual a 2')
        return false
    } else {
        return true
    }

}

function mostrar(...elem) {
    elem.forEach(el => el.style.display = 'block')
}

function ocultar(...elem) {
    elem.forEach(el => el.style.display = 'none')
}

function validarDisciplina(disc, elem) {
    if (disc.indexOf(elem) == -1) {
        return true
    } else {
        alert('Desculpe esta disciplina já foi adicionada!')
        cont--
        nomeDisc.value = ''
        nomeDisc.focus()
        return false
    }
}


function estiloNotaAbaixo() {
    let notaNegativa = $('.resultadoAnalise div')
    notaNegativa.setAttribute('class', 'notaBaixa')


}

function notasBaixas() {
    notaDisciplina.filter(elem => {
            if (elem < 10) {
                return true
            } else {
                return false
            }
        })
        // for (let cont in notaDisciplina) {
        //     if (notaDisciplina[cont] < 10) return true
        //     else
        //         mostrarResultados.style.color = 'green'
        //     mostrarResultados.style.boxShadow = 'green 5px 5px 6px'
        //     false
        // }

}

function maiorNota() {
    notaAlta = notaDisciplina[0]
        // let nomedisciplina = nomeDisciplina = [0]
    let soma = 0
    tamanhoArray = notaDisciplina.length
    for (let cont in notaDisciplina) {
        soma += +notaDisciplina[cont]
        if (notaDisciplina[cont] > notaAlta) notaAlta = notaDisciplina[cont]
    }
    media = +(soma / tamanhoArray)

}

function menorNota() {
    notaBaixa = notaDisciplina[0]
    for (let cont in notaDisciplina) {
        if (notaDisciplina[cont] < notaBaixa) notaBaixa = notaDisciplina[cont]
    }

}

// notaBaixa(+notaDisciplina)


function ultimoRegisto() {
    if (cont == +disciplinas.value) {
        alert("Ultimo registo")
        mostrar(solucao)
        mostraDisciplina.style.marginTop = '-10px'
        mostraDisciplina.innerHTML = "Resultados da Análise"
        ocultar(formRegistar, butaoRegistar)
        mostrarDados()

    }
}

function mostrarDados() {
    let cont = 0
    for (let conta = 1; conta <= disciplinas.value; conta++) {
        mostrarResultados.innerHTML += `<div><span>${nomeDisciplina[cont]}:</span><span>${notaDisciplina[cont]}V</span></div>`
        cont++
    }
    if (notasBaixas()) {
        estiloNotaAbaixo()
    }
    tabela.innerHTML += `<tr>
        <td>${notaAlta}</td>
        <td>${notaBaixa}</td>
        <td>${media}</td>
        </tr>`

}



function registar() {
    if (nomeDisc.value.length === 0 || notaDisc.value.length === 0 || +notaDisc.value < 0 || +notaDisc.value > 20) {
        mostrar(paragrafo)

    } else {
        ocultar(paragrafo)
        cont++
        if (cont <= +disciplinas.value) {

            if (validarDisciplina(nomeDisciplina, nomeDisc.value)) {
                atualizarTituloDisciplina()
                nomeDisciplina.push(nomeDisc.value)
                notaDisciplina.push(+notaDisc.value)
                maiorNota()
                menorNota()
                    // notaBaixa(+notaDisciplina)
                nomeDisc.value = ''
                nomeDisc.focus()
                notaDisc.value = 0
            }
            ultimoRegisto()
        }
    }



}

butaoRegistar.addEventListener('click', registar)
butao.addEventListener('click', iniciarAnalise)