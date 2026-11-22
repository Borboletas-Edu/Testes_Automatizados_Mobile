import { estaVisivel } from '../utils/utils.js'

// A Home lista centenas de categorias criadas no backend compartilhado.
// Ler a árvore de elementos inteira dessa tela estoura o tempo do XCUITest, então
// aqui a leitura é limitada a 38 níveis e volta ao padrão (60) ao sair da tela.
const PROFUNDIDADE_HOME = 38
const PROFUNDIDADE_PADRAO = 60
const BUNDLE_ID = 'br.com.lojaebac'

class HomePage {

  async reiniciarApp() {
    await driver.terminateApp(BUNDLE_ID)
    await driver.activateApp(BUNDLE_ID)
  }

  async aguardarTela() {
    await this._naHome(() => $('-ios predicate string:label ENDSWITH "Search Products"').waitForDisplayed({ timeout: 30000 }))
  }

  async clicarAbaConta() {
    await this._naHome(() => $('~tab-Account').click())
  }

  async clicarBusca() {
    await this._naHome(() => $('-ios predicate string:label ENDSWITH "Search Products"').click())
  }

  async clicarCarrinho() {
    await this._naHome(() => $('~').click()) // ícone do carrinho (glifo da fonte de ícones)
  }

  async telaEstaExibida() {
    let exibida = false
    await this._naHome(async () => {
      exibida = await estaVisivel($('-ios predicate string:label ENDSWITH "Search Products"'), 20000)
    })
    return exibida
  }

  async _naHome(acao) {
    await driver.updateSettings({ snapshotMaxDepth: PROFUNDIDADE_HOME })
    try {
      await acao()
    } finally {
      await driver.updateSettings({ snapshotMaxDepth: PROFUNDIDADE_PADRAO })
    }
  }
}

export default new HomePage()
