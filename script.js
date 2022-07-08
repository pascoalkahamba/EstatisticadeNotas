let solucao = document.querySelector('.solucao')
let butao = document.querySelector('#butao')
let formEntrada = document.querySelector('.form1')
let formRegistar = document.querySelector('#form2')
let butaoRegistar = document.getElementById('butaoRegistar')
let divPrincipal = document.querySelector('.problema')
formRegistar.style.display = 'none'
butaoRegistar.style.display = 'none'

butao.addEventListener('click', () => {
    let mostraDisciplina = document.getElementsByTagName('h1')[0]
    let nomeDisc = document.querySelector('#disc-nome')
    let notaDisc = document.querySelector('#disc-nota')
    let disciplinas = document.querySelector('#txt-numero')
    let numeroDisciplinas = Number(disciplinas.value)
    let nomeDisciplina = []
    let notaDisciplina = []
    if (numeroDisciplinas < 2) {
        alert('O numero de disciplinas tem de ser maior ou igual a 2')
    } else {
        butao.style.display = 'none'
        formEntrada.style.display = 'none'
        formRegistar.style.display = 'block'
        butaoRegistar.style.display = 'block'
        divPrincipal.classList.add('estiloregisto')

        // const dadosDisciplina = {
        //     nome: nomeDisciplina.value,
        //     nota: Number(notaDisciplina.value)
        // }

        let cont = 1
        mostraDisciplina.innerHTML = `Disciplina ${cont}`
        butaoRegistar.addEventListener('click', () => {
                if (nomeDisc.value.length === 0 || notaDisc.value.length === 0) {
                    alert('Dado invalido!')
                        // formRegistar.innerHTML += ''
                        // formRegistar.innerHTML += "<p>O campo NOME DA DISCIPLINA não pode estar vazio, e a nota tem estar entre 0 a 20</p>"
                } else {
                    alert('Dado Inserido!')
                    if (cont < numeroDisciplinas) {
                        cont++
                        mostraDisciplina.innerHTML = `Disciplina ${cont}`
                        nomeDisciplina.push(nomeDisc.value)
                        notaDisciplina.push(Number(notaDisc.value))
                        nomeDisc.value = ''
                        nomeDisc.focus()
                        notaDisc.value = 0
                    }
                }

            })
            // for (let cont = 1; cont <= numeroDisciplinas; cont++) 
            // }

        alert('Tudo Ok!')
    }
    solucao.innerHTML = `Nomes ${nomeDisciplina}<br><br>`
    solucao.innerHTML += `Notas ${notaDisciplina}`
    solucao.style.visibility = "visible";
})