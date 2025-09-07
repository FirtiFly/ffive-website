const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const { validatePlayer } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');
const { uploadPlayerImage, handleUploadError } = require('../middleware/upload');

// GET /api/players - все игроки
router.get('/', asyncHandler(async (req, res) => {
  const players = await Player.findAll({
    where: { isActive: true },
    order: [['role', 'ASC'], ['nickname', 'ASC']]
  });
  res.json(players);
}));

// GET /api/players/:id - один игрок
router.get('/:id', asyncHandler(async (req, res) => {
  const player = await Player.findByPk(req.params.id);
  if (!player) {
    return res.status(404).json({ error: 'Player not found' });
  }
  res.json(player);
}));

// POST /api/players - создать игрока (с валидацией)
router.post('/', validatePlayer, asyncHandler(async (req, res) => {
  const player = await Player.create(req.body);
  res.status(201).json(player);
}));

// PUT /api/players/:id - обновить игрока
router.put('/:id', validatePlayer, asyncHandler(async (req, res) => {
  const player = await Player.findByPk(req.params.id);
  if (!player) {
    return res.status(404).json({ error: 'Player not found' });
  }
  
  await player.update(req.body);
  res.json(player);
}));

// DELETE /api/players/:id - удалить игрока
router.delete('/:id', asyncHandler(async (req, res) => {
  const player = await Player.findByPk(req.params.id);
  if (!player) {
    return res.status(404).json({ error: 'Player not found' });
  }
  
  await player.destroy();
  res.json({ message: 'Player deleted successfully' });
}));

// GET /api/players/role/:role - игроки по роли
router.get('/role/:role', asyncHandler(async (req, res) => {
  const players = await Player.findAll({
    where: { 
      role: req.params.role,
      isActive: true 
    },
    order: [['nickname', 'ASC']]
  });
  res.json(players);
}));

// POST /api/players/:id/avatar - загрузка аватарки
router.post('/:id/avatar', 
  uploadPlayerImage.single('avatar'),
  handleUploadError,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const player = await Player.findByPk(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Обновляем путь к аватарке
    player.avatar = `/uploads/players/${req.file.filename}`;
    await player.save();

    res.json({ 
      message: 'Avatar uploaded successfully',
      avatar: player.avatar 
    });
  })
);

module.exports = router;