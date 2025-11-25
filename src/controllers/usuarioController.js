const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sua_chave_secreta_aqui'; // Em produção, use uma variável de ambiente

const usuarios = [];

exports.criarUsuario = (req, res) => {
    // 1. ADICIONAMOS 'role' ao body
    const { nome, email, senha, role } = req.body;

    if (usuarios.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    // 2. ATRIBUÍMOS A 'role' (ou 'usuario' como padrão)
    const novoUsuario = { 
        id: usuarios.length + 1, 
        nome, 
        email, 
        senha: senhaCriptografada,
        role: role || 'usuario' // Se 'role' não for enviada, vira 'usuario'
    };

    usuarios.push(novoUsuario);
    
    //Para criar um admin, envie "role": "admin" no JSON da requisição
    console.log("Usuários atuais:", usuarios); // Para debug

    const {senha: _, ...usuarioSemSenha} = novoUsuario;
    res.status(201).json(usuarioSemSenha);
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
        return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaValida) {
        return res.status(400).json({ message: 'Credenciais inválidas.' }); 
    }

    // 3. INCLUÍMOS A 'role' NO TOKEN JWT
    const tokenPayload = { 
        id: usuario.id, 
        email: usuario.email,
        role: usuario.role
    };

    const token = jwt.sign(
        tokenPayload,
         JWT_SECRET,
        { expiresIn: '1h' });

    res.status(200).json({ 
        message: 'Login bem-sucedido.',
        token: token 
    });
}

