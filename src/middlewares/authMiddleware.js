const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sua_chave_secreta_aqui'; // Em produção, use uma variável de ambiente


exports.verificaToken = (req, res, next) => { 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded; // Salva os dados do usuário na requisição
        next(); // Continua para a próxima função (controlador ou outro middleware)
    } catch (error) { 
        res.status(403).json({ message: 'Token inválido.' });
    }
};

exports.verificaAdmin = (req, res, next) => {
    // 'req.usuario' foi definido pelo middleware 'verificaToken'
    if (req.usuario && req.usuario.role === 'admin') {
        // Se for admin, permite continuar
        next();
    } else {
        // Se não for admin, retorna erro 403 (Proibido)
        res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' });
    }
};