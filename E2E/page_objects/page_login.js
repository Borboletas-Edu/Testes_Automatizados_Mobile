// Textos que sempre aparecem na tela de login (o que sobrar é a mensagem de erro)
const TEXTOS_FIXOS = ['Welcome to EBAC Shop', 'Login to your account', 'Don’t have an account?']

class LoginPage {

  async aguardarTela() {
    await $('~pageTitle').waitForDisplayed()
  }

  // Valor vazio = deixa o campo em branco (cada teste reabre o app, então ele já começa vazio)
  async preencherEmail(email) {
    if (email) await $('~email').setValue(email)
  }

  async preencherSenha(senha) {
    if (senha) await $('~password').setValue(senha)
  }

  async clicarEntrar() {
    await $('~btnLogin').click()
  }

  async clicarCadastrar() {
    await $('~signUp').click()
  }

  // A mensagem de erro não tem testID: é o único texto da tela além dos fixos
  // (ícones da fonte têm 1 caractere e são ignorados)
  async obterMensagemErro() {
    return driver.waitUntil(async () => {
      const textos = await $$('XCUIElementTypeStaticText').map((texto) => texto.getAttribute('label'))
      return textos.find((texto) => texto && texto.length > 2 && !TEXTOS_FIXOS.includes(texto))
    }, { timeout: 10000, timeoutMsg: 'Nenhuma mensagem de erro exibida no login' })
  }
}

export default new LoginPage()
