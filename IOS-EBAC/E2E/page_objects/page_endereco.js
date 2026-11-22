// Os campos desta tela não têm testID. Vazio, o "value" do campo é o próprio placeholder,
// então localizamos por ele (filtrando por TextField, porque os rótulos "City"/"State" têm o mesmo texto)
const campo = (placeholder) => $(`-ios predicate string:type == "XCUIElementTypeTextField" AND value == "${placeholder}"`)

// O "\n" no fim aperta a tecla "next" do teclado, que leva ao próximo campo.
// Sem isso, os últimos campos ficam atrás do teclado e o texto vai para o campo errado.
const preencher = (placeholder, valor) => campo(placeholder).setValue(`${valor}\n`)

class EnderecoPage {

  async preencherNome(nome) {
    await preencher('Enter your name', nome)
  }

  async preencherCelular(celular) {
    await preencher('Enter your mobile number', celular)
  }

  async preencherEndereco(endereco) {
    await preencher('Enter your address', endereco)
  }

  async preencherCidade(cidade) {
    await preencher('City', cidade)
  }

  async preencherEstado(estado) {
    await preencher('State', estado)
  }

  // No último campo, o "next" do teclado salva o endereço (mesma ação do botão "Save",
  // que fica coberto pelo teclado) e o app volta para o carrinho
  async preencherCepESalvar(cep) {
    await preencher('ZipCode', cep)
  }
}

export default new EnderecoPage()
