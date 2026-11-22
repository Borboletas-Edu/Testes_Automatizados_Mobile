import { fakerPT_BR as faker } from '@faker-js/faker'

export const checkout_dados_validos = {
  endereco: {
    nome: faker.person.fullName(),
    celular: faker.string.numeric(11),
    endereco: faker.location.streetAddress(),
    cidade: faker.location.city(),
    estado: faker.location.state({ abbreviated: true }),
    cep: faker.string.numeric(8)
  },
  tituloSucesso: 'Order Success'
}
