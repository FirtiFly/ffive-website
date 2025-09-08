// merch.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Merch page loaded');

    // Элементы DOM
    const merchGrid = document.getElementById('merch-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('merch-search');
    const merchCards = document.querySelectorAll('.merch-card');

    // Фильтрация по категориям
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterMerch(category);
        });
    });

    // Поиск товаров
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterMerch('all', searchTerm);
    });

    // Функция фильтрации
    function filterMerch(category, searchTerm = '') {
        merchCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardTitle = card.querySelector('.merch-card__title').textContent.toLowerCase();
            const cardDescription = card.querySelector('.merch-card__description').textContent.toLowerCase();
            const cardText = cardTitle + ' ' + cardDescription;
            
            const matchesCategory = category === 'all' || cardCategory === category;
            const matchesSearch = !searchTerm || cardText.includes(searchTerm);
            
            if (matchesCategory && matchesSearch) {
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

    // Анимация появления товаров
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

    // Применяем анимацию к карточкам товаров
    merchCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Активное состояние в навигации
    const currentPage = window.location.pathname;
    if (currentPage.includes('merch')) {
        const merchLink = document.querySelector('.nav__link[href="merch.html"]');
        if (merchLink) {
            merchLink.classList.add('nav__link--active');
        }
    }

    // Трекинг кликов по товарам (для аналитики)
    const merchLinks = document.querySelectorAll('.merch-card__actions a');
    merchLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const productName = this.closest('.merch-card').querySelector('.merch-card__title').textContent;
            console.log(`Товар куплен: ${productName}`);
            // Здесь можно добавить отправку в Google Analytics
        });
    });
});