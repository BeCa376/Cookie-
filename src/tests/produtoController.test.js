const livroController = require('../controllers/livroController');
const Livro = require('./models/livro'); // Importamos o Model real
jest.mock('../models/livro');

// Suíte de Testes para o Controlador de Livros
describe('LivroController - Testes Unitários', () => {

    // Limpa os mocks após cada teste para evitar "vazamento"
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Teste para o método getAllLivros
    it('deve retornar todos os livros e status 200 (getAllLivros)', async () => {

        // --- 1. Arrange (Arrumar) ---

        // Dados falsos que esperamos que o Model retorne
        const mockLivros = [
            { id: 1, nome: 'livros Mock 1', autor: ""},
            { id: 2, nome: 'livros Mock 2', autor: "" }
        ];

        // Dizemos ao Model mockado: "Quando a função findAll for chamada,
        // resolva a Promise com 'mockLivros'"
        Livro.findAll.mockResolvedValue(mockLivros);

        // Criamos mocks para os objetos 'req' e 'res'
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(), // Permite encadeamento (ex: res.status(200).json(...) )
            json: jest.fn()
        };

        // --- 2. Act (Agir) ---
        // Chamamos a função real do controlador com os mocks
        await livroController.getAllLivros(req, res);

        // --- 3. Assert (Verificar) ---
        // Verificamos se o Model foi chamado corretamente
        expect(Livro.findAll).toHaveBeenCalledTimes(1);
        // Verificamos se a resposta foi enviada corretamente
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockLivros);
    });

    // Teste para o método createLivro
    it('deve criar um livro e retornar status 201 (createLivro)', async () => {

        // --- 1. Arrange ---
        const novoLivroMock = { nome: 'Livro Novo', preco: 50 };
        const livroCriadoMock = { id: 3, ...novoLivroMock };

        // Dizemos ao Model mockado para retornar o livro criado
        Livro.create.mockResolvedValue(livroCriadoMock);

        // Criamos um mock de 'req' com os dados do body
        const req = {
            body: novoLivroMock
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // --- 2. Act ---
        await livroController.createLivro(req, res);

        // --- 3. Assert ---
        // Verificamos se o Model foi chamado com os dados corretos
        expect(Livro.create).toHaveBeenCalledWith(novoLivroMock);
        // Verificamos a resposta
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(livroCriadoMock);
    })
});
