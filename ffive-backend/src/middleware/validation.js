// Валидация данных игрока
const validatePlayer = (req, res, next) => {
  const { nickname, fullName, role, faceitNickname } = req.body;

  const errors = [];

  if (!nickname || nickname.length < 2) {
    errors.push('Nickname must be at least 2 characters long');
  }

  if (!fullName || fullName.length < 3) {
    errors.push('Full name must be at least 3 characters long');
  }

  if (!role || !['IGL', 'AWPer', 'Rifler', 'Support', 'Coach'].includes(role)) {
    errors.push('Invalid role');
  }

  if (!faceitNickname || faceitNickname.length < 2) {
    errors.push('Faceit nickname is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Валидация новости
const validateNews = (req, res, next) => {
  const { title, content, excerpt, author, category } = req.body;

  const errors = [];

  if (!title || title.length < 5) {
    errors.push('Title must be at least 5 characters long');
  }

  if (!content || content.length < 10) {
    errors.push('Content must be at least 10 characters long');
  }

  if (!excerpt || excerpt.length < 10) {
    errors.push('Excerpt must be at least 10 characters long');
  }

  if (!author || author.length < 2) {
    errors.push('Author name is required');
  }

  if (!category || !['tournaments', 'roster', 'sponsors', 'updates', 'matches'].includes(category)) {
    errors.push('Invalid category');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Валидация для tryout заявок
const validateTryout = (req, res, next) => {
  const { nickname, email, age, role } = req.body;

  const errors = [];

  if (!nickname || nickname.length < 2) {
    errors.push('Nickname must be at least 2 characters long');
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('Valid email is required');
  }

  if (!age || age < 16 || age > 35) {
    errors.push('Age must be between 16 and 35');
  }

  if (!role || !['IGL', 'AWPer', 'Rifler', 'Support'].includes(role)) {
    errors.push('Invalid role');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { validatePlayer, validateNews, validateTryout };