// Testes de Login — mensagens de validação, link de cadastro e login válido
import { setup_usuario } from '../setup/setup_usuario.js'
import {
  login_senha_incorreta,
  login_email_nao_cadastrado,
  login_email_invalido,
  login_email_vazio,
  login_senha_vazia
} from '../dados/dados_e2e/dados_login.js'
import LoginFlow from '../flow/flow_login.js'
import LoginPage from '../page_objects/page_login.js'
import CadastroPage from '../page_objects/page_cadastro.js'
import HomePage from '../page_objects/page_home.js'

describe('Login', () => {
  let usuario

  // Setup da funcionalidade: cria um usuário novo pela API
  before(async () => {
    usuario = await setup_usuario()
  })

  it('CT01 - Login com senha incorreta', async () => {
    const dados = login_senha_incorreta

    await LoginFlow.acessarLogin()
    await LoginFlow.realizarLogin(usuario.email, dados.senha)
    const mensagem = await LoginPage.obterMensagemErro()

    // Validação
    expect(mensagem).toBe(dados.mensagemEsperada)
  })

  it('CT02 - Login com e-mail não cadastrado', async () => {
    const dados = login_email_nao_cadastrado

    await LoginFlow.acessarLogin()
    await LoginFlow.realizarLogin(dados.email, dados.senha)
    const mensagem = await LoginPage.obterMensagemErro()

    // Validação
    expect(mensagem).toBe(dados.mensagemEsperada)
  })

  it('CT03 - Login com e-mail em formato inválido', async () => {
    const dados = login_email_invalido

    await LoginFlow.acessarLogin()
    await LoginFlow.realizarLogin(dados.email, dados.senha)
    const mensagem = await LoginPage.obterMensagemErro()

    // Validação
    expect(mensagem).toBe(dados.mensagemEsperada)
  })

  it('CT04 - Login com e-mail vazio', async () => {
    const dados = login_email_vazio

    await LoginFlow.acessarLogin()
    await LoginFlow.realizarLogin('', dados.senha)
    const mensagem = await LoginPage.obterMensagemErro()

    // Validação
    expect(mensagem).toBe(dados.mensagemEsperada)
  })

  it('CT05 - Login com senha vazia', async () => {
    const dados = login_senha_vazia

    await LoginFlow.acessarLogin()
    await LoginFlow.realizarLogin(usuario.email, '')
    const mensagem = await LoginPage.obterMensagemErro()

    // Validação
    expect(mensagem).toBe(dados.mensagemEsperada)
  })

  it('CT06 - Link "Sign up" abre a tela de cadastro', async () => {
    await LoginFlow.acessarLogin()
    await LoginPage.clicarCadastrar()
    const telaCadastroExibida = await CadastroPage.telaEstaExibida()

    // Validação
    expect(telaCadastroExibida).toBe(true)
  })

  it('CT07 - Login com usuário válido', async () => {
    await LoginFlow.acessarLogin()
    await LoginFlow.realizarLogin(usuario.email, usuario.senha)
    const homeExibida = await HomePage.telaEstaExibida()

    // Validação
    expect(homeExibida).toBe(true)
  })
})
