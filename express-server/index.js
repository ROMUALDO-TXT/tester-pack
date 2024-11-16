const express = require('express');

const createServer = () => {
    const app = express();

    app.use(express.json());

    // Rota simples para testar
    app.get('/api', (req, res) => {
        res.json({ message: 'API rodando dentro do Electron!' });
    });

    // Adicione mais rotas aqui, ou importe de outros arquivos
    return app;
};

module.exports = createServer;