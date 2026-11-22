import 'dotenv/config'

export class ApiMain {
  static LOGIN = '/public/authUser'

  constructor() {
    this.urlBase = (process.env.API_URL_BASE || 'http://lojaebac.ebaconline.art.br').replace(/\/$/, '')
    this.token = null
  }

  // Guarda o token do usuário para as rotas /api/*, que exigem autenticação
  async autenticar(email, senha) {
    const resposta = await this.post(ApiMain.LOGIN, { email, password: senha })
    this.token = resposta.data.token
  }

  async requisitar(metodo, caminho, payload) {
    const resposta = await fetch(`${this.urlBase}${caminho}`, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { authorization: this.token })
      },
      body: payload ? JSON.stringify(payload) : undefined
    })
    const corpo = await resposta.json()

    if (!resposta.ok || corpo.success === false) {
      throw new Error(`${metodo} ${caminho} falhou: ${corpo.error || resposta.status}`)
    }
    return corpo
  }

  get(caminho) {
    return this.requisitar('GET', caminho)
  }

  post(caminho, payload) {
    return this.requisitar('POST', caminho, payload)
  }

  delete(caminho) {
    return this.requisitar('DELETE', caminho)
  }
}
