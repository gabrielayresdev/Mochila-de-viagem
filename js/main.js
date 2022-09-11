const lista = document.querySelector(".lista")
const submit = document.querySelector(".cadastrar")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach(function (item) {
    criaElemento(item)
})

submit.addEventListener("click", function (event) {
    event.preventDefault()
    const nome = document.querySelector('#nome')
    const quantidade = document.querySelector('#quantidade')


    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    const existe = itens.find(elemento => elemento.nome === itemAtual.nome)

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === itemAtual.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1].id + 1) : 0

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
    const li = document.createElement("li")
    li.classList.add("item")

    const strong = document.createElement("strong")
    strong.innerHTML = item.quantidade
    strong.dataset.id = item.id

    li.appendChild(strong)
    li.innerHTML += item.nome

    li.appendChild(botaoDeleta(item.id))

    lista.appendChild(li)
}

function atualizaElemento(item) {
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const botao = document.createElement("button")
    botao.innerHTML = "X"
    botao.classList.add("btn")

    botao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return botao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(id, 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}

