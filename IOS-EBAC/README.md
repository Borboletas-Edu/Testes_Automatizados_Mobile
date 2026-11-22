# EBAC Store — Automação iOS

Testes E2E do app **EBAC Store** (iOS) com **WebdriverIO + Appium (XCUITest)**, rodando em **device real no Sauce Labs**.

## Estrutura

```
app/                        o app
  LojaEBAC.ipa              binário (fora do git; baixe com npm run app:download)
  scripts/                  download do .ipa e upload para o Sauce Labs

E2E/                        a automação
  api/                      cliente da API da loja (api_main) e um arquivo por recurso (usuários, produtos)
  config/                   configuração do WebdriverIO + Sauce Labs
  dados/
    dados_api/              payloads enviados para a API
    dados_e2e/              massa de cada cenário de teste
  page_objects/             uma classe por tela; cada método é uma interação (clicar, preencher, obter)
  flow/                     sequências de interações reutilizáveis (acessar login, comprar...)
  setup/                    pré-condições criadas pela API antes dos testes
  testes/                   cenários de teste: usam só flows e page objects
  utils/                    funções de apoio
```

Regras das camadas:

- **page_objects** concentram seletores e interações. Testes e flows nunca usam seletor direto.
- **flow** encadeia interações de page objects. Não faz validação.
- **testes** chamam flows e page objects, recebem valores (mensagem, se a tela está exibida) e fazem a validação no fim.
- **api/setup** ficam separados da interface: o setup cria a massa pela API e o teste só usa o que ele devolve.

## Cenários

| CT | Arquivo | Cenário | Resultado esperado |
|----|---------|---------|--------------------|
| 01 | test_login.js | Login com senha incorreta | "Password is incorrect" |
| 02 | test_login.js | Login com e-mail não cadastrado | "Email is incorrect" |
| 03 | test_login.js | Login com e-mail em formato inválido | "Enter a valid email address" |
| 04 | test_login.js | Login com e-mail vazio | "Please enter an email" |
| 05 | test_login.js | Login com senha vazia | "Please enter password" |
| 06 | test_login.js | Link "Sign up" | Abre a tela de cadastro |
| 07 | test_login.js | Login com usuário válido | Abre a Home |
| — | test_checkout.js | Login → busca → produto → carrinho → endereço novo → pagamento na entrega | Produto no carrinho e tela "Order Success" |

Massa de dados criada pela API antes dos testes (Swagger: `http://lojaebac.ebaconline.art.br/api-docs/`):

- **Login** (`setup_usuario`): usuário novo.
- **Checkout** (`setup_checkout`): usuário novo (carrinho vazio, sem endereço) e um produto próprio com estoque e preço, que é apagado ao final (`teardown_checkout`).

Cada teste de login reabre o app do zero.

## Como rodar

Pré-requisitos: Node 24 e uma conta Sauce Labs com acesso a **device real**.

```bash
cd E2E
nvm use 24                  # WebdriverIO 10 exige Node 22.23+ ou 24
npm install
cp .env.example .env        # preencha SAUCE_USERNAME, SAUCE_ACCESS_KEY e SAUCE_REGION
npm run app:download        # baixa o LojaEBAC.ipa para app/
npm run app:upload          # envia o app para o Sauce (uma vez por conta)

npm test                    # todos os testes
npm run test:login
npm run test:checkout
npm run report              # relatório Allure
```

Em caso de falha, o screenshot da tela fica em `E2E/screenshots/`.

## Decisões e particularidades do app

- **Device real, não simulador.** O `LojaEBAC-sim.app` do curso foi compilado só para Intel, e o Sauce só oferece simuladores iOS em Mac ARM.
- **Profundidade da árvore de elementos.** A Home lista centenas de categorias criadas por outros alunos no backend compartilhado, e ler a árvore inteira estoura o tempo do XCUITest. Por isso a Home usa profundidade 38 e as demais telas usam 60 (`page_home.js` e hook `before` da config).
- **Busca.** O app consulta o servidor a cada letra digitada, e a resposta de uma busca parcial pode sobrescrever a final. Por isso `BuscaPage.preencherBusca()` redigita a última letra até o produto aparecer.
- **Produto próprio.** O catálogo compartilhado muda com frequência: produtos somem, ficam sem estoque ou sem preço promocional. Com total R$ 0, a API recusa o pedido sem mostrar erro no app. Por isso o checkout cria o próprio produto.
- **Teclado.** Os campos do endereço terminam com a tecla "next" do teclado. No último campo (CEP), ela salva o endereço, já que o botão "Save" fica coberto pelo teclado.
- **Confirmação.** "Transaction successful!" faz parte da imagem animada, não é texto. O teste valida o título "Order Success" e a presença da imagem.
- **Seletores.** Sempre que possível usamos os `testID` do app (`~email`, `~btnLogin`, `~addToCart`...). Elementos sem `testID` são localizados por texto ou placeholder via `-ios predicate string`.
