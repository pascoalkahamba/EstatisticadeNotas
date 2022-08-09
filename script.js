const $ = document.querySelector.bind(document);
let solucao = $(".solucao");
let butao = $("#butao");
let formEntrada = $(".form1");
let formRegistar = $("#form2");
let butaoRegistar = document.getElementById("butaoRegistar");
let divPrincipal = $(".problema");
let mostraDisciplina = document.getElementsByTagName("h1")[0];
let nomeDisc = $("#disc-nome");
let notaDisc = $("#disc-nota");
let disciplinas = $("#txt-numero");
let paragrafo = $(".paragrafo");
let mostrarResultados = $(".resultadoAnalise");
let escolhaPesquisa = document.getElementsByName("txt-dados");
let campoPesquisa = $("#nomeDisciplina");
let nomeDisciplina = [];
let notaDisciplina = [];
let tabela = $(".tabela");
let mostraDadosPesquisa = $(".buscaDados");
let butaoPesquisaNomeDisc = $("#butaoPesquisa");
let butaoPesquisaNotaDisc = $("#butaoPesquisaNota");
let valorProcurado = $("#nomeDisciplina");
let notaNegativa = $(".resultadoAnalise div");
let rodape = document.getElementsByTagName("footer")[0];
let pessimaDisciplina, melhorDisciplina;
let notaBaixa;
let cont = 0;
let resulNotaAlta, resulNotaBaixa, resulMedia;

function escolhaBusca() {
  escolhaPesquisa.forEach((elem) => {
    elem.onchange = function () {
      if (escolhaPesquisa[1].checked) {
        ocultar(butaoPesquisaNomeDisc);
        mostrar(butaoPesquisaNotaDisc);
        addAtributoButaoNota();
      } else {
        ocultar(butaoPesquisaNotaDisc);
        margemButao();
        mostrar(butaoPesquisaNomeDisc);
        addAtributoButaoNome();
      }
    };
  });
}

function addAtributoButaoNota() {
  campoPesquisa.setAttribute("type", "number");
  campoPesquisa.setAttribute("value", "");
  campoPesquisa.setAttribute("placeholder", "Nota");
}

function addAtributoButaoNome() {
  campoPesquisa.setAttribute("type", "text");
  campoPesquisa.setAttribute("placeholder", "Nome da Disciplina");
}

function margemButao() {
  butaoPesquisaNomeDisc.style.marginTop = "-38px";
  butaoPesquisaNomeDisc.style.marginLeft = "225px";
}

ocultar(
  formRegistar,
  butaoRegistar,
  solucao,
  paragrafo,
  mostraDadosPesquisa,
  butaoPesquisaNotaDisc
);

function iniciarAnalise() {
  if (validarNumDisciplinas()) {
    ocultar(butao, formEntrada);

    mostrar(formRegistar, butaoRegistar);

    divPrincipal.classList.add("estiloregisto");
    atualizarTituloDisciplina();
  }
}

function buscaValoresArray(array, valor) {
  if (array.indexOf(valor) != -1) {
    array.forEach((elem, index) => {
      if (escolhaPesquisa[0].checked) {
        if (elem === valor) {
          mostraDadosPesquisa.innerHTML = "";
          mostraDadosPesquisa.innerHTML = "<h1>Resultado/s da Busca</h1>";
          mostraDadosPesquisa.innerHTML += `<p>Em ${elem} tiveste ${notaDisciplina[index]} valores</p>`;
        }
      } else {
        if (elem === valor) {
          mostraDadosPesquisa.innerHTML = "";
          mostraDadosPesquisa.innerHTML = "<h1>Resultado/s da Busca</h1>";
        }
      }
    });
    mostrar(mostraDadosPesquisa);
  } else {
    alert("Este valor não existe na sua Pauta!");
  }
}

function estilodoBodyEfooter() {
  window.document.body.style.height = "100%";
  rodape.style.marginTop = "20px";
}

function chamafuncaoNome() {
  buscaValoresArray(nomeDisciplina, valorProcurado.value);
}

function chamafuncaoNota() {
  buscaValoresArray(notaDisciplina, +valorProcurado.value);
  notaDisciplina.filter((item, index) => {
    if (item == +valorProcurado.value) {
      mostraDadosPesquisa.innerHTML += `<p>Tiveste ${item} valores em ${nomeDisciplina[index]}</p>`;
    }
  });
}
function resulPositivoouNegativo() {
  resulNotaAlta = notaAlta < 10 ? "resulNegativo" : "resulPositivo";
  resulNotaBaixa = notaBaixa < 10 ? "resulNegativo" : "resulPositivo";
  resulMedia = media < 10 ? "resulNegativo" : "resulPositivo";
}

function atualizarTituloDisciplina() {
  mostraDisciplina.innerHTML = `Disciplina ${Math.min(
    cont + 1,
    disciplinas.value
  )}`;
}

function validarNumDisciplinas() {
  if (+disciplinas.value < 2) {
    alert("O numero de disciplinas tem de ser maior ou igual a 2");
    return false;
  } else {
    return true;
  }
}

function mostrar(...elem) {
  elem.forEach((el) => (el.style.display = "block"));
}

function ocultar(...elem) {
  elem.forEach((el) => (el.style.display = "none"));
}

function validarDisciplina(disc, elem) {
  if (disc.indexOf(elem) == -1) {
    return true;
  } else {
    alert("Desculpe esta disciplina já foi adicionada!");
    cont--;
    nomeDisc.value = "";
    nomeDisc.focus();
    return false;
  }
}

function maiorNotaEmenorNota() {
  notaAlta = notaDisciplina[0];
  notaBaixa = notaDisciplina[0];
  let soma = 0;
  let tamanhoArray = notaDisciplina.length;
  notaDisciplina.forEach((elem, index) => {
    soma += +elem;
    if (elem > notaAlta) {
      notaAlta = elem;
      melhorDisciplina = nomeDisciplina[index];
    }
    if (elem < notaBaixa) {
      notaBaixa = elem;
      pessimaDisciplina = nomeDisciplina[index];
    }
  });
  media = +(soma / tamanhoArray);
}

function ultimoRegisto() {
  if (cont == +disciplinas.value) {
    alert("Ultimo registo");
    mostrar(solucao);
    mostraDisciplina.style.marginTop = "-10px";
    mostraDisciplina.innerHTML = "Resultados da Análise";
    ocultar(formRegistar, butaoRegistar);
    mostrarDados();
  }
}

function mostrarDados() {
  let cont = 0;
  for (let conta = 1; conta <= disciplinas.value; conta++) {
    const ehNegativa = notaDisciplina[cont] < 10 ? "notaBaixa" : "";

    mostrarResultados.innerHTML += `<div class='${ehNegativa}' ><span>${nomeDisciplina[cont]}:</span><span>${notaDisciplina[cont]}V</span></div>`;
    cont++;
  }

  resulPositivoouNegativo();
  tabela.innerHTML += `<tr>
            <td class=${resulNotaAlta}>${notaAlta} (${melhorDisciplina})</td>
            <td class=${resulNotaBaixa}>${notaBaixa} (${pessimaDisciplina})</td>
            <td class=${resulMedia}>${media}</td>
        </tr>`;

  escolhaBusca();
  estilodoBodyEfooter();
}

function registar() {
  if (
    nomeDisc.value.length === 0 ||
    notaDisc.value.length === 0 ||
    +notaDisc.value < 0 ||
    +notaDisc.value > 20
  ) {
    mostrar(paragrafo);
  } else {
    ocultar(paragrafo);
    cont++;
    if (cont <= +disciplinas.value) {
      if (validarDisciplina(nomeDisciplina, nomeDisc.value)) {
        atualizarTituloDisciplina();
        nomeDisciplina.push(nomeDisc.value);
        notaDisciplina.push(+notaDisc.value);

        maiorNotaEmenorNota();
        nomeDisc.value = "";
        nomeDisc.focus();
        notaDisc.value = 0;
      }
      ultimoRegisto();
    }
  }
}

butaoRegistar.addEventListener("click", registar);
butao.addEventListener("click", iniciarAnalise);
butaoPesquisaNomeDisc.addEventListener("click", chamafuncaoNome);
butaoPesquisaNotaDisc.addEventListener("click", chamafuncaoNota);
