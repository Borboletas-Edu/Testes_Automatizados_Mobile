class ProdutoPage {

  async clicarAdicionarAoCarrinho() {
    await $('~addToCart').click()
  }
}

export default new ProdutoPage()
