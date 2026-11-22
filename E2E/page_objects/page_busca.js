const cardsDoProduto = (nome) =>
  $$(`-ios predicate string:name == "productDetails" AND label BEGINSWITH "${nome} "`)

const produtoNaLista = async (nome) => (await cardsDoProduto(nome).length) > 0

class BuscaPage {

  // O app consulta o servidor a cada letra digitada, e a resposta de uma busca parcial
  // ("i", "ip"...) pode chegar por último e sobrescrever a lista. Enquanto o produto
  // não aparece, a última letra é redigitada para disparar uma nova busca completa.
  async preencherBusca(termo) {
    const input = $('~searchInput')
    await input.setValue(termo)

    await driver.waitUntil(async () => {
      await driver.pause(3000)
      if (await produtoNaLista(termo)) return true

      await input.addValue('\b')
      await input.addValue(termo.slice(-1))
      return false
    }, { timeout: 45000, interval: 0, timeoutMsg: `Produto "${termo}" não apareceu na busca` })

    // Fecha o teclado: com ele aberto, o primeiro toque na lista só esconde o teclado
    await input.addValue('\n')
  }

  async clicarProduto(nome) {
    await cardsDoProduto(nome)[0].click()
  }
}

export default new BuscaPage()
