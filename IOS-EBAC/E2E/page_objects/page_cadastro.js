import { estaVisivel } from '../utils/utils.js'

class CadastroPage {

  async telaEstaExibida() {
    return estaVisivel($('~firstName'))
  }

  async clicarEntrarNaConta() {
    await $('~signIn').click()
  }
}

export default new CadastroPage()
