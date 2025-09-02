const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 80;

async function createConnection() {
  for (let i = 0; i < 5; i++) {
    try {
      return await mysql.createConnection({
        host: 'serverdedadossql',
        user: 'andre',
        password: 'magMys123',
        database: 'sce_teste',
        port: 3306
      });
    } catch (err) {
      console.log('Tentando reconectar ao MySQL...');
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  throw new Error('Não foi possível conectar ao MySQL');
}

// Rota GET para buscar usuários
app.get('/clientes', async (req, res) => {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM clientes LIMIT 10');
    await connection.end();

    res.json(rows);
  } catch (error) {
    console.error('Erro na rota /usuarios:', error.message);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
