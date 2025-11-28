const produtoController = require('../controllers/produtoController');
const Produto = require('../models/produto'); // Importamos o Model real
jest.mock('../models/produto');

// Suíte de Testes para o Controlador de Produtos
describe('ProdutoController - Testes Unitários', () => {

    // Limpa os mocks após cada teste para evitar "vazamento"
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Teste para o método getAllProdutos
    it('deve retornar todos os produtos e status 200 (getAllProdutos)', async () => {

        // --- 1. Arrange (Arrumar) ---

        // Dados falsos que esperamos que o Model retorne
        const mockLivros = [
            { id: 1, nome: 'livros Mock 1', autor: ""},
            { id: 2, nome: 'livros Mock 2', autor: "" }
        ];

        // Dizemos ao Model mockado: "Quando a função findAll for chamada,
        // resolva a Promise com 'mockProdutos'"
        Produto.findAll.mockResolvedValue(mockLivros);

        // Criamos mocks para os objetos 'req' e 'res'
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(), // Permite encadeamento (ex: res.status(200).json(...) )
            json: jest.fn()
        };

        // --- 2. Act (Agir) ---
        // Chamamos a função real do controlador com os mocks
        await produtoController.getAllLivros(req, res);

        // --- 3. Assert (Verificar) ---
        // Verificamos se o Model foi chamado corretamente
        expect(Produto.findAll).toHaveBeenCalledTimes(1);
        // Verificamos se a resposta foi enviada corretamente
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProdutos);
    });

    // Teste para o método createProduto
    it('deve criar um produto e retornar status 201 (createProduto)', async () => {

        // --- 1. Arrange ---
        const novoProdutoMock = { nome: 'Produto Novo', preco: 50 };
        const produtoCriadoMock = { id: 3, ...novoProdutoMock };

        // Dizemos ao Model mockado para retornar o produto criado
        Produto.create.mockResolvedValue(produtoCriadoMock);

        // Criamos um mock de 'req' com os dados do body
        const req = {
            body: novoProdutoMock
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // --- 2. Act ---
        await produtoController.createProduto(req, res);

        // --- 3. Assert ---
        // Verificamos se o Model foi chamado com os dados corretos
        expect(Produto.create).toHaveBeenCalledWith(novoProdutoMock);
        // Verificamos a resposta
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(produtoCriadoMock);
    })
});
