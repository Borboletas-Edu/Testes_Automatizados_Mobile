import { fakerPT_BR as faker } from '@faker-js/faker'

// Usuário novo, com e-mail único, no formato aceito por /public/addUser
export function payloadNovoUsuario() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.string.numeric(11),
    email: `qa.${Date.now()}@teste.com`,
    password: 'Teste@123'
  }
}
