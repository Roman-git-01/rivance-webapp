// Обновлённый product-script.js
document.addEventListener('DOMContentLoaded', () => {

  // Выбор размера
  const sizeButtons = document.querySelectorAll('.size-btn');
    
  sizeButtons.forEach(button => {
      button.addEventListener('click', () => {
          sizeButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
      });
  });

  // Сворачивание описания
  const toggleBtn = document.querySelector('.toggle-btn');
  const descriptionContent = document.querySelector('.description-content');
  let isCollapsed = false;

  toggleBtn.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      toggleBtn.classList.toggle('collapsed', isCollapsed);
      descriptionContent.style.height = isCollapsed ? '0' : `${descriptionContent.scrollHeight}px`;
  });

  // Таймер скидки
  function updateDiscountTimer() {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 2); // Скидка действует 2 дня
      const now = new Date();
      const diff = endDate - now;

      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('discount-time').textContent = 
          `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  }
  setInterval(updateDiscountTimer, 1000);

  // Управление слайдером
  const slider = document.querySelector('.product-image');
  let currentSlide = 0;

  slider.insertAdjacentHTML('beforeend', `
      <div class="slide-arrow arrow-left">←</div>
      <div class="slide-arrow arrow-right">→</div>
  `);

  document.querySelector('.arrow-left').addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + images.length) % images.length;
      updateSlider();
  });

  document.querySelector('.arrow-right').addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % images.length;
      updateSlider();
  });

  // Добавьте обработчик свайпов для мобильных
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) {
          currentSlide = (currentSlide + 1) % images.length;
      } else if (touchEndX - touchStartX > 50) {
          currentSlide = (currentSlide - 1 + images.length) % images.length;
      }
      updateSlider();
  });

  // Рассчёт процента скидки
  const oldPrice = parseInt(document.querySelector('.old-price').textContent.replace(/\D/g, ''));
  const newPrice = parseInt(document.querySelector('.new-price').textContent.replace(/\D/g, ''));
  const discountPercent = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  document.querySelector('.discount-percent').textContent = `-${discountPercent}%`;

  // Обработка оплаты
  document.querySelector('.checkout-btn').addEventListener('click', () => {
    alert('Переход к оформлению заказа...');
  });

  // Таймер до релиза (30 апреля)
  const releaseDate = new Date(new Date().getFullYear(), 3, 30); // 30 апреля

  function updateTimer() {
      const now = new Date();
      const diff = releaseDate - now;

      if (diff < 0) {
          document.querySelector('.discount-timer').innerHTML = 'Акция завершена';
          return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('discount-time').innerHTML = `
          ${days}д ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}
      `;
  }

  setInterval(updateTimer, 1000);
  updateTimer();
});