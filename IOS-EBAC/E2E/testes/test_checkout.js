// Teste de Checkout — compra completa: login, busca, carrinho, endereço, pagamento e confirmação
import { setup_checkout, teardown_checkout } from '../setup/setup_checkout.js'
import { checkout_dados_validos } from '../dados/dados_e2e/dados_checkout.js'
import LoginFlow from '../flow/flow_login.js'
import CompraFlow from '../flow/flow_compra.js'
import CarrinhoPage from '../page_objects/page_carrinho.js'
import PedidoConfirmadoPage from '../page_objects/page_pedido_confirmado.js'

describe('Checkout', () => {
  let massa

  // Setup da funcionalidade: usuário novo (carrinho vazio, sem endereço) e produto próprio
  before(async () => {
    massa = await setup_checkout()
  })

  after(async () => {
    await teardown_checkout(massa)
  })

  it('Comprar produto com endereço novo e pagamento na entrega', async () => {
    const dados = checkout_dados_validos
    const { usuario, produto } = massa

    await LoginFlow.acessarLogin()
    await LoginFlow.realizarLogin(usuario.email, usuario.senha)

    await CompraFlow.adicionarProdutoAoCarrinho(produto.nome)
    const produtoNoCarrinho = await CarrinhoPage.obterNomeProduto()

    await CompraFlow.cadastrarEndereco(dados.endereco)
    await CompraFlow.finalizarCompraComPagamentoNaEntrega()
    const titulo = await PedidoConfirmadoPage.obterTitulo()
    const imagemSucessoExibida = await PedidoConfirmadoPage.imagemSucessoEstaExibida()

    // Validação
    expect(produtoNoCarrinho).toBe(produto.nome)
    expect(titulo).toBe(dados.tituloSucesso)
    expect(imagemSucessoExibida).toBe(true)
  })
})
