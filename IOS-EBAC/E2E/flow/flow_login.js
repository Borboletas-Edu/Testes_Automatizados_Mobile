import HomePage from '../page_objects/page_home.js'
import LoginPage from '../page_objects/page_login.js'

class LoginFlow {

  // Reabre o app do zero e entra na tela de login pela aba "Account".
  // Cada teste começa assim, sem depender do estado deixado pelo anterior.
  async acessarLogin() {
    await HomePage.reiniciarApp()
    await HomePage.aguardarTela()
    await HomePage.clicarAbaConta()
    await LoginPage.aguardarTela()
  }

  async realizarLogin(email, senha) {
    await LoginPage.preencherEmail(email)
    await LoginPage.preencherSenha(senha)
    await LoginPage.clicarEntrar()
  }
}

export default new LoginFlow()
