class CarrinhoPage {

  async obterNomeProduto() {
    const nome = $('~productName')
    await nome.waitForDisplayed()
    return nome.getText()
  }

  async clicarAdicionarEndereco() {
    await $('~addNewAddress').click()
  }

  // Mesmo botão: "Select address" sem endereço e "Continue to payment" com endereço.
  // O botão "Change" só aparece depois que o endereço carrega.
  async clicarContinuarParaPagamento() {
    await $('~change').waitForDisplayed()
    await $('~selectAddressOrContinueToPayment').click()
  }
}

export default new CarrinhoPage()
