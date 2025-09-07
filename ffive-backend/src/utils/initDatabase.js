const { sequelize } = require('../config/database');
const Player = require('../models/Player');
const News = require('../models/news');

const initDatabase = async () => {
  try {
    // Синхронизируем модели с базой данных
    await sequelize.sync({ force: true });
    console.log('✅ Database synchronized successfully');

    // Создаем тестовых игроков
    const players = await Player.bulkCreate([
      {
        nickname: 'FFIVE_Sniper',
        fullName: 'Иван Петров',
        role: 'AWPer',
        faceitNickname: 'ffive_sniper123',
        faceitLevel: 10,
        faceitElo: 2450,
        kdRatio: 1.65,
        winRate: 82.5,
        headshotPercentage: 48.7,
        totalMatches: 289,
        totalWins: 234,
        averageKills: 28.9,
        bio: 'Снайпер с выдающейся точностью. Участник множества LAN турниров.',
        isActive: true
      },
      {
        nickname: 'FFIVE_IGL',
        fullName: 'Петр Сидоров',
        role: 'IGL',
        faceitNickname: 'ffive_igl_pro',
        faceitLevel: 10,
        faceitElo: 2300,
        kdRatio: 1.45,
        winRate: 87.2,
        headshotPercentage: 42.3,
        totalMatches: 356,
        totalWins: 298,
        averageKills: 25.3,
        bio: 'Опытный капитан с 5-летним стажем. Специализируется на стратегии.',
        isActive: true
      }
    ]);

    console.log(`✅ Created ${players.length} players`);

    // Создаем тестовые новости
    const news = await News.bulkCreate([
      {
        title: 'FFIVE одерживает победу на чемпионате',
        content: 'Наша команда показала выдающуюся игру и забрала первый крупный трофей сезона. Подробный отчет о матче...',
        excerpt: 'Наша команда показала выдающуюся игру и забрала первый крупный трофей сезона.',
        author: 'Алексей Иванов',
        category: 'tournaments',
        isPublished: true,
        slug: 'ffive-victory-championship',
        views: 0
      }
    ]);

    console.log(`✅ Created ${news.length} news articles`);

    console.log('🎉 Database initialization completed successfully!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  } finally {
    await sequelize.close();
  }
};

// Запускаем если файл вызван напрямую
if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase;