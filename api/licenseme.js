export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { payerID, orderID, email } = req.body;

  // Aqui você faria uma chamada real para sua API de licença
  console.log("Emitindo licença para:", email);

  // Exemplo de retorno simulado
  return res.status(200).json({
    status: 'ok',
    license: 'ABC123-DEF456-GHI789',
    email
  });
}