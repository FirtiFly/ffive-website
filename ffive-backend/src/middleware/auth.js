const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/database');

// Проверка JWT токена
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Проверяем что пользователь существует в БД
    const [user] = await sequelize.query(
      'SELECT id, username, role FROM users WHERE id = ? AND isActive = true',
      { replacements: [decoded.userId] }
    );

    if (user.length === 0) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ error: 'Token expired' });
    }
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Проверка ролей
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Access denied. Required roles: ${roles.join(', ')}` 
      });
    }

    next();
  };
};

// Упрощенная проверка для тестов
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const [user] = await sequelize.query(
        'SELECT id, username, role FROM users WHERE id = ? AND isActive = true',
        { replacements: [decoded.userId] }
      );

      if (user.length > 0) {
        req.user = user[0];
      }
    }

    next();
  } catch (error) {
    // Пропускаем ошибки аутентификации для optional middleware
    next();
  }
};

module.exports = { authenticateToken, requireRole, optionalAuth };