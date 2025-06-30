const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  
  console.log("--- handler api");
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { orderID, email } = req.body;

  try {
    //const accessToken = await getAccessToken();
    //const order = await verifyPayment(orderID, accessToken);

    if (order.status !== 'COMPLETED') {
      return res.status(400).json({ error: 'Pagamento não confirmado' });
    }

	try {
		console.log("--- on try...");		
		var entry_orderid = email + "|" + orderID;
		const response = await fetch('https://3.17.142.240/REGISTER_ENTRY', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			'pri': 'test123',
			'REGISTER_ENTRY': entry_orderid
		  },
		  //body: JSON.stringify({
		  //	REGISTER_ENTRY: entry_orderid
		  //})
		});

		if (!response.ok) {
		  const errorText = await response.text();
		  console.error("Erro ao registrar licença:", errorText);
		  return res.status(500).json({ error: 'Erro ao registrar licença' });
		}

		const licenseData = await response.json();

		return res.status(200).json({
		  status: 'ok',
		  license: licenseData.license || 'UNKNOWN',
		  email
		});
	} catch (error) {
		console.error("Erro na requisição à API de licença:", error);
		return res.status(500).json({ error: 'Erro interno ao emitir licença' });
	}
  

    return res.status(200).json({
      status: 'ok',
      license: 'ABC123-DEF456-GHI789',
      email
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao verificar pagamento' });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { payerID, orderID, email } = req.body;

  // Aqui você faria uma chamada real para sua API de licença
  console.log("Emitindo licença para:", email);
  
  
  try {
    const response = await fetch('https://3.128.24.108/REGISTER_ENTRY', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pri': 'test123'
      },
      body: JSON.stringify({
        REGISTER_ENTRY: email
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao registrar licença:", errorText);
      return res.status(500).json({ error: 'Erro ao registrar licença' });
    }

    const licenseData = await response.json();

    return res.status(200).json({
      status: 'ok',
      license: licenseData.license || 'UNKNOWN',
      email
    });
  } catch (error) {
    console.error("Erro na requisição à API de licença:", error);
    return res.status(500).json({ error: 'Erro interno ao emitir licença' });
  }
  

  // Exemplo de retorno simulado
  return res.status(200).json({
    status: 'ok',
    license: 'ABC123-DEF456-GHI789',
    email
  });
}