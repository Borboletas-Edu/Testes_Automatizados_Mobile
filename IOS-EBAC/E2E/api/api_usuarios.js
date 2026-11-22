import { ApiMain } from './api_main.js'

export class UsuariosApi {
  static CADASTRO = '/public/addUser'

  constructor() {
    this.apiMain = new ApiMain()
  }

  // Mesmo endpoint usado pela tela "Sign up" do app
  async cadastrarUsuario(payload) {
    const resposta = await this.apiMain.post(UsuariosApi.CADASTRO, payload)
    return resposta.data
  }
}
