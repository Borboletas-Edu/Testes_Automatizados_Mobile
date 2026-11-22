import { ProdutosApi } from '../api/api_produtos.js'
import { payloadNovoProduto } from '../dados/dados_api/payload_produtos.js'
import { setup_usuario } from './setup_usuario.js'

// Cria um usuário novo e um produto com estoque e preço, ambos pela API
export async function setup_checkout() {
  const usuario = await setup_usuario()

  const produtosApi = new ProdutosApi()
  await produtosApi.autenticar(usuario.email, usuario.senha)
  const produto = await produtosApi.cadastrarProduto(payloadNovoProduto())

  return { usuario, produto: { id: produto._id, nome: produto.name } }
}

// Remove o produto criado no setup
export async function teardown_checkout({ usuario, produto }) {
  const produtosApi = new ProdutosApi()
  await produtosApi.autenticar(usuario.email, usuario.senha)
  await produtosApi.apagarProduto(produto.id)
}
