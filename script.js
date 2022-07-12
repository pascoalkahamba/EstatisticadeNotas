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

let cont = 0
ocultar(formRegistar, butaoRegistar)
ocultar(paragrafo)

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

function ultimoRegisto() {
    if (cont == +disciplinas.value) {
        alert("Ultimo registo")
        mostraDisciplina.innerHTML = "Resultados da Análise"
        ocultar(formRegistar, butaoRegistar)
        mostrarDados()
    }
}

function mostrarDados() {
    for (let conta = 1; conta <= disciplinas.value; conta++) {
        mostrarResultados.innerHTML = `<span>${nomeDisciplina.join(' ')}</span> <span>${notaDisciplina.join(' ')}</span>`

    }
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
                nomeDisc.value = ''
                nomeDisc.focus()
                notaDisc.value = 0
            }
            ultimoRegisto()
        }
    }
    // solucao.innerHTML = `Nomes ${ nomeDisciplina}<br><br>`
    // solucao.innerHTML += `Notas ${ notaDisciplina}`
    // solucao.style.visibility = "visible";
}
butaoRegistar.addEventListener('click', registar)
butao.addEventListener('click', iniciarAnalise)