function populateUFs() {

  const ufSelect = document.querySelector("select[name=uf]")
  //chamada de API do site do ibge dos estados
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //.then (res => res.json()) mesma coisa, função anonima que retorna valor
    // .then((res) => {
    //   return res.json() //retorna o json da API
    .then(res => res.json())
    // for para popular o campo estado com a API
    .then(states => {
      for (state of states) {
        // lista os estados no campo option com o nome. += concatena o uf com o option
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs()

function getCities(event) {
  // Variavel que recebe o campo cidade
  const citySelect = document.querySelector("select[name=city]")
  // variavel que recebe o campo estado na URL
  const stateInput = document.querySelector("input[name=state]")
  // Preenche o campo uf com o valor selecionado
  const ufValue = event.target.value
  // variavel recebe o indice do estado selecionado
  const indexOfSelectedState = event.target.selectedIndex
  //coloca o nome do estado na URL
  stateInput.value = event.target.options[indexOfSelectedState].text
  // Seleciona a cidade de acordo com o ID do estado
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
    });
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

// Items de coleta

//Pega todos os itens do li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target
  // Adicionar ou remover uma classe com javascript
  itemLi.classList.toggle("selected")
  const itemId = itemLi.dataset.id

  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId
    return itemFound
  })
  //verifica se ja está selecionado
  if(alreadySelected >=0){
    //tirar da seleção
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId 
      return itemIsDifferent
    })
 
    selectedItems = filteredItems

  }else{
    selectedItems.push(itemId)
  }

 collectedItems.value = selectedItems

}