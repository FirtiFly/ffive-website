// news.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('News page loaded');

    // Фильтрация новостей
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsArticles = document.querySelectorAll('.news-article');
    const searchInput = document.querySelector('.search-input');
    const newsGrid = document.getElementById('news-grid');

    // Фильтрация по категориям
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterNews(category);
        });
    });

    // Поиск новостей
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterNews('all', searchTerm);
    });

    function filterNews(category, searchTerm = '') {
        newsArticles.forEach(article => {
            const articleCategory = article.dataset.category;
            const articleTitle = article.querySelector('.article__title').textContent.toLowerCase();
            const articleExcerpt = article.querySelector('.article__excerpt').textContent.toLowerCase();
            const articleText = articleTitle + ' ' + articleExcerpt;
            
            const matchesCategory = category === 'all' || articleCategory === category;
            const matchesSearch = !searchTerm || articleText.includes(searchTerm);
            
            if (matchesCategory && matchesSearch) {
                article.style.display = 'block';
                setTimeout(() => {
                    article.style.opacity = '1';
                    article.style.transform = 'translateY(0)';
                }, 50);
            } else {
                article.style.opacity = '0';
                article.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    article.style.display = 'none';
                }, 300);
            }
        });
    }

    // Анимация появления новостей
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

    // Применяем анимацию к новостям
    newsArticles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(30px)';
        article.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(article);
    });

    // Пагинация (заглушка)
    const paginationButtons = document.querySelectorAll('.pagination__page, .pagination__btn');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Пагинация будет реализована при подключении бэкенда');
        });
    });

    // Подписка на рассылку
    const newsletterForm = document.querySelector('.newsletter__form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Спасибо за подписку! На email ${email} будут приходить уведомления о новостях.`);
            this.reset();
        });
    }

    // Активное состояние в навигации
    const currentPage = window.location.pathname;
    if (currentPage.includes('news')) {
        const newsLink = document.querySelector('.nav__link[href="news.html"]');
        if (newsLink) {
            newsLink.classList.add('nav__link--active');
        }
    }
});