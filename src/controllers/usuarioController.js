const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Importe o Model do Usuário (certifique-se que o arquivo existe em Models/usuario.js)
const Usuario = require('../Models/usuario'); 

const JWT_SECRET = 'sua_chave_secreta_aqui'; 

// CADASTRAR USUÁRIO (Agora usando async/await e Banco de Dados)
exports.criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, role } = req.body;

        // 1. Verifica se já existe no Banco
        const usuarioExistente = await Usuario.findOne({ where: { email: email } });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Usuário já existe.' });
        }

        const senhaCriptografada = bcrypt.hashSync(senha, 10);

        // 2. Cria no Banco de Dados (SQLite)
        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: senhaCriptografada,
            role: role || 'usuario'
        });

        // Remove a senha antes de devolver a resposta (por segurança)
        const usuarioRetorno = novoUsuario.toJSON();
        delete usuarioRetorno.senha;

        res.status(201).json(usuarioRetorno);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar usuário.' });
    }
};

// LOGIN (Agora buscando do Banco de Dados)
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // 1. Busca o usuário no Banco pelo email
        const usuario = await Usuario.findOne({ where: { email: email } });

        // Se não achar o usuário
        if (!usuario) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // 2. Compara a senha enviada com a senha (hash) do banco
        const senhaValida = bcrypt.compareSync(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(400).json({ message: 'Credenciais inválidas.' }); 
        }

        // 3. Gera o Token
        const tokenPayload = { 
            id: usuario.id, 
            email: usuario.email,
            role: usuario.role
        };

        const token = jwt.sign(
            tokenPayload,
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: 'Login bem-sucedido.',
            token: token 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor durante o login.' });
    }
};