import { ApiMain } from './api_main.js'

export class ProdutosApi {
  static CADASTRO = '/api/addProduct'
  static EXCLUSAO = '/api/deleteProduct'

  constructor() {
    this.apiMain = new ApiMain()
  }

  async autenticar(email, senha) {
    await this.apiMain.autenticar(email, senha)
  }

  async cadastrarProduto(payload) {
    const resposta = await this.apiMain.post(ProdutosApi.CADASTRO, payload)
    return resposta.data
  }

  async apagarProduto(id) {
    await this.apiMain.delete(`${ProdutosApi.EXCLUSAO}/${id}`)
  }
}
