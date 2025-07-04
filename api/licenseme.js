export default async function handler(req, res) {
  console.log("--- handler");

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { orderID, email, uniqueID } = req.body;

  try {
    // TODO: Uncomment and implement these functions if you want to verify payment
    // const accessToken = await getAccessToken();
    // const order = await verifyPayment(orderID, accessToken);
    //
    // if (order.status !== 'COMPLETED') {
    //   return res.status(400).json({ error: 'Pagamento não confirmado' });
    // }

    console.log("--- on try...");

    const entry = orderID + "|" + email + "|" + uniqueID;

    const response = await fetch('http://18.222.202.86:80/license', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'pri': 'test123',
        'REGISTER_ENTRY': entry
      }
      // Optionally, you can move entry_orderid to the body instead of header
      // body: JSON.stringify({ REGISTER_ENTRY: entry_orderid })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao registrar licença:", errorText);
      return res.status(500).json({ error: 'Erro ao registrar licença' });
    }

    //const licenseData = await response.json();

    return res.status(200).json({
      status: 'ok'
    });

  } catch (err) {
    console.error("Erro no handler:", err);
    return res.status(500).json({ error: 'Erro interno ao emitir licença: ' + err });
  }
}
