const request = require('supertest');
const app = require('../app'); 
const Livro = require('../Models/livro');
jest.mock('../Models/livro')

describe('API Health Check', () => {

    it('Deve retornar status 200 e uma mensagem de "ok" na rota GET /api/health-check', async () => {
     
        const response = await request(app)
            .get('/api/health-check')
            .expect(200); 

        expect(response.body).toEqual({ status: 'ok' });
    });

});

describe('API de Livros (com Mocks)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('GET /api/livros - Deve retornar a lista de livros do Model', async () => {

        const mockLivros = [
            { id: 1, nome: 'Livro da Rota 1', preco: 100 }
        ];
        Livro.findAll.mockResolvedValue(mockLivros);

        const response = await request(app)
            .get('/api/livros')
            .expect(200);

        expect(response.body).toEqual(mockLivros);
        expect(Livro.findAll).toHaveBeenCalledTimes(1);
    });

    it('POST /api/livros - Deve criar um livro (sem token)', async () => {

        const response = await request(app)
            .post('/api/livros')
            .send({ nome: 'Teste', preco: 10 });

        expect([401, 403]).toContain(response.status);
        expect(Livro.create).not.toHaveBeenCalled();
    });
});