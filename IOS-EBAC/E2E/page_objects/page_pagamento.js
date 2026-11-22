class PagamentoPage {

  async selecionarPagamentoNaEntrega() {
    await $('~option-1').click() // "Cash on Delivery"
  }

  async clicarFinalizarCompra() {
    await $('~completeCheckout').click()
  }
}

export default new PagamentoPage()
