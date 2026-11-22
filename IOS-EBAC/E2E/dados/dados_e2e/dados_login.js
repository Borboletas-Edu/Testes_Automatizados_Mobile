// Observação: o e-mail e a senha válidos vêm do usuário criado em setup/setup_usuario.js

// Teste - Login com senha incorreta
export const login_senha_incorreta = {
  senha: 'senhaErrada1',
  mensagemEsperada: 'Password is incorrect'
}

// Teste - Login com e-mail não cadastrado
export const login_email_nao_cadastrado = {
  email: 'nao.cadastrado.ebac@teste.com',
  senha: 'Teste@123',
  mensagemEsperada: 'Email is incorrect'
}

// Teste - Login com e-mail em formato inválido
export const login_email_invalido = {
  email: 'email-invalido',
  senha: 'Teste@123',
  mensagemEsperada: 'Enter a valid email address'
}

// Teste - Login com e-mail vazio
export const login_email_vazio = {
  senha: 'Teste@123',
  mensagemEsperada: 'Please enter an email'
}

// Teste - Login com senha vazia
export const login_senha_vazia = {
  mensagemEsperada: 'Please enter password'
}
