const livroController = require('../controllers/livroController');

const caminhoDoModelo = '../models/Livro'; 

jest.mock('../Models/livro', () => ({
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    save: jest.fn()
}));

const Livro = require('../Models/livro');

describe('LivroController - Testes Unitários', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar todos os livros e status 200 (getAllLivros)', async () => {
        const mockLivros = [
            { id: 1, nome: 'Duna', autor: 'Frank Herbert', ano: 1965, preco: 50 },
            { id: 2, nome: '1984', autor: 'George Orwell', ano: 1949, preco: 40 }
        ];

        Livro.findAll.mockResolvedValue(mockLivros);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await livroController.getAllLivros(req, res);

        expect(Livro.findAll).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockLivros);
    });

    it('deve criar um livro e retornar status 201 (createLivro)', async () => {
        const novoLivroMock = { 
            nome: 'Livro Novo', 
            autor: 'Autor Teste', 
            genero: 'Teste', 
            ano: 2024, 
            preco: 50 
        };
        const livroCriadoMock = { id: 3, ...novoLivroMock };

        Livro.create.mockResolvedValue(livroCriadoMock);

        const req = {
            body: novoLivroMock
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await livroController.createLivro(req, res);

        expect(Livro.create).toHaveBeenCalledWith(novoLivroMock);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(livroCriadoMock);
    });
});