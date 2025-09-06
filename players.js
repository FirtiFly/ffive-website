// players.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Players page loaded');

    // Данные игроков (можно вынести в отдельный JSON файл)
    const playersData = {
        '1': {
            nickname: 'PlayerNick1',
            name: 'Иван Петров',
            role: 'In-Game Leader',
            avatar: 'images/players/player1.jpg',
            stats: {
                kd: '1.45',
                winrate: '87%',
                elo: '1250',
                hs: '42%',
                matches: '356',
                wins: '298'
            },
            faceit: 'https://faceit.com/ru/players/PlayerNick1',
            bio: 'Опытный игрок с более чем 5 годами в competitive сцене. Специализируется на стратегии и calls.'
        },
        '2': {
            nickname: 'PlayerNick2',
            name: 'Петр Сидоров',
            role: 'Main AWPer', 
            avatar: 'images/players/player2.jpg',
            stats: {
                kd: '1.65',
                winrate: '82%',
                elo: '1300',
                hs: '48%',
                matches: '289',
                wins: '234'
            },
            faceit: 'https://faceit.com/ru/players/PlayerNick2',
            bio: 'Снайпер с невероятной точностью. Участник множества LAN турниров.'
        }
        // Добавьте данные остальных игроков
    };

    // Фильтрация по ролям
    const filterButtons = document.querySelectorAll('.filter-btn');
    const playerCards = document.querySelectorAll('.player-profile-card');
    const playersCount = document.getElementById('players-count');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const role = this.dataset.role;
            filterPlayers(role);
            updatePlayersCount(role);
        });
    });

    function filterPlayers(role) {
        playerCards.forEach(card => {
            const cardRole = card.dataset.role;
            const matchesRole = role === 'all' || cardRole === role;
            
            if (matchesRole) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    function updatePlayersCount(role) {
        const count = role === 'all' 
            ? playerCards.length 
            : document.querySelectorAll(`[data-role="${role}"]`).length;
        playersCount.textContent = count;
    }

    // Модальное окно статистики
    const modal = document.getElementById('stats-modal');
    const modalClose = document.querySelector('.modal__close');
    const viewStatsButtons = document.querySelectorAll('.view-stats-btn');

    viewStatsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const playerId = this.dataset.playerId;
            const playerData = playersData[playerId];
            
            if (playerData) {
                openStatsModal(playerData);
            }
        });
    });

    function openStatsModal(playerData) {
        const statsContent = document.getElementById('stats-content');
        
        statsContent.innerHTML = `
            <div class="player-stats-modal">
                <div class="modal-header">
                    <img src="${playerData.avatar}" alt="${playerData.nickname}" class="modal-avatar">
                    <div>
                        <h2>${playerData.nickname}</h2>
                        <p>${playerData.name} - ${playerData.role}</p>
                    </div>
                </div>
                
                <div class="modal-stats">
                    <h3>Подробная статистика</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">K/D Ratio</span>
                            <span class="stat-value">${playerData.stats.kd}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Win Rate</span>
                            <span class="stat-value">${playerData.stats.winrate}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Headshot %</span>
                            <span class="stat-value">${playerData.stats.hs}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Matches</span>
                            <span class="stat-value">${playerData.stats.matches}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Wins</span>
                            <span class="stat-value">${playerData.stats.wins}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">ELO</span>
                            <span class="stat-value">${playerData.stats.elo}</span>
                        </div>
                    </div>
                </div>
                
                <div class="modal-bio">
                    <h3>Об игроке</h3>
                    <p>${playerData.bio}</p>
                </div>
                
                <div class="modal-actions">
                    <a href="${playerData.faceit}" target="_blank" class="btn btn--accent">Faceit профиль</a>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Форма подачи заявки
    const tryoutForm = document.querySelector('.tryout-form');
    if (tryoutForm) {
        tryoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Здесь можно отправить данные на сервер
            console.log('Tryout form data:', data);
            
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }

    // Анимация появления карточек
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    playerCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Активное состояние в навигации
    const currentPage = window.location.pathname;
    if (currentPage.includes('players')) {
        const playersLink = document.querySelector('.nav__link[href="players.html"]');
        if (playersLink) {
            playersLink.classList.add('nav__link--active');
        }
    }
});