import { UsuariosApi } from '../api/api_usuarios.js'
import { payloadNovoUsuario } from '../dados/dados_api/payload_usuarios.js'

// Cria um usuário novo pela API e devolve as credenciais.
// Conta nova = carrinho vazio e nenhum endereço cadastrado.
export async function setup_usuario() {
  const payload = payloadNovoUsuario()
  await new UsuariosApi().cadastrarUsuario(payload)

  return { email: payload.email, senha: payload.password }
}
