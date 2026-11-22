import { estaVisivel } from '../utils/utils.js'

class PedidoConfirmadoPage {

  async obterTitulo() {
    const titulo = $('-ios predicate string:type == "XCUIElementTypeStaticText" AND label == "Order Success"')
    await titulo.waitForDisplayed({ timeout: 20000 })
    return titulo.getText()
  }

  async imagemSucessoEstaExibida() {
    return estaVisivel($('~transactionSuccessfulImage'))
  }

  async clicarVoltarParaHome() {
    await $('~goBackHome').click()
  }
}

export default new PedidoConfirmadoPage()
