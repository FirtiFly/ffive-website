const express = require('express');
const router = express.Router();
const News = require('../models/news');

// GET /api/news - все новости
router.get('/', async (req, res) => {
  try {
    const news = await News.findAll({
      where: { isPublished: true },
      order: [['createdAt', 'DESC']]
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/news/:id - одна новость
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    // Увеличиваем счетчик просмотров
    news.views += 1;
    await news.save();
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;