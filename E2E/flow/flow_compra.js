import HomePage from '../page_objects/page_home.js'
import BuscaPage from '../page_objects/page_busca.js'
import ProdutoPage from '../page_objects/page_produto.js'
import EnderecoPage from '../page_objects/page_endereco.js'
import CarrinhoPage from '../page_objects/page_carrinho.js'
import PagamentoPage from '../page_objects/page_pagamento.js'

class CompraFlow {

  // Ao adicionar, o app abre o carrinho sozinho
  async adicionarProdutoAoCarrinho(nomeProduto) {
    await HomePage.clicarBusca()
    await BuscaPage.preencherBusca(nomeProduto)
    await BuscaPage.clicarProduto(nomeProduto)
    await ProdutoPage.clicarAdicionarAoCarrinho()
  }

  async cadastrarEndereco(endereco) {
    await CarrinhoPage.clicarAdicionarEndereco()
    await EnderecoPage.preencherNome(endereco.nome)
    await EnderecoPage.preencherCelular(endereco.celular)
    await EnderecoPage.preencherEndereco(endereco.endereco)
    await EnderecoPage.preencherCidade(endereco.cidade)
    await EnderecoPage.preencherEstado(endereco.estado)
    await EnderecoPage.preencherCepESalvar(endereco.cep)
  }

  async finalizarCompraComPagamentoNaEntrega() {
    await CarrinhoPage.clicarContinuarParaPagamento()
    await PagamentoPage.selecionarPagamentoNaEntrega()
    await PagamentoPage.clicarFinalizarCompra()
  }
}

export default new CompraFlow()
