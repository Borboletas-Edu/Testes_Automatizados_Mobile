// Espera o elemento aparecer e devolve true/false, sem quebrar o teste
export async function estaVisivel(elemento, timeout = 15000) {
  try {
    await elemento.waitForDisplayed({ timeout })
    return true
  } catch {
    return false
  }
}
