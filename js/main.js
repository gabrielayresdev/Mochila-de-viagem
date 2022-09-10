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

        itens[existe.id] = itemAtual
    } else {
        itemAtual.id = itens.length

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

    lista.appendChild(li)
}

function atualizaElemento(item) {
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade
}