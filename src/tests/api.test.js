const request = require('supertest'); // Importa o Supertest
const app = require('../app'); // Importa nosso app Express configurado
const Produto = require('../models/produto');
jest.mock('../models/produto')

// Descreve o conjunto de testes para a API
describe('API Health Check', () => {

    // O 'it' define um caso de teste específico
    it('Deve retornar status 200 e uma mensagem de "ok" na rota GET /api/health-check', async () => {
        // 'request(app)' usa o Supertest
        const response = await request(app)
            .get('/api/health-check')
            .expect(200); // Asserção 1: Espera que o status HTTP seja 200

        // Asserção 2: Espera que o corpo da resposta seja { status: 'ok' }
        expect(response.body).toEqual({ status: 'ok' });
    });

});

// Dúvida em relação a aula de Introdução ao TDD com Jest e Supertest (Red-Green-Refactor). Não sei o que fazer nos passos 2 e  3 da aula
// além de o projeto ter um erro, tentei entender e corrigir, mas não consegui, esse erro acontece ao dar npm run dev e também o npm test

describe('API de Produtos (com Mocks)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('GET /api/produtos - Deve retornar a lista de produtos do Model', async () => {

        // --- 1. Arrange ---
        const mockProdutos = [
            { id: 1, nome: 'Produto da Rota 1', preco: 100 }
        ];
        // Dizemos ao Model o que retornar
        Produto.findAll.mockResolvedValue(mockProdutos);

        // --- 2. Act & Assert (O Supertest faz os dois) ---
        const response = await request(app)
            .get('/api/produtos')
            .expect(200); // Verifica o status code

        // Verificamos se o corpo da resposta é o que o mock retornou
        expect(response.body).toEqual(mockProdutos);
        // Verificamos se o Model foi realmente chamado pela rota
        expect(Produto.findAll).toHaveBeenCalledTimes(1);
    });

    it('POST /api/produtos - Deve criar um produto (sem token)', async () => {
        // Na Prática 01 (JWT), nós protegemos a rota POST.
        // Este teste deve falhar (401 ou 403), pois não estamos enviando um token.
        // (Este é um exemplo de teste de segurança)

        const response = await request(app)
            .post('/api/produtos')
            .send({ nome: 'Teste', preco: 10 });

        // A rota deve estar protegida
        expect([401, 403]).toContain(response.status);
        // Verificamos que o Model NÃO foi chamado
        expect(Produto.create).not.toHaveBeenCalled();
    });
});