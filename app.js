document.addEventListener("DOMContentLoaded", () => {
  // Настройка таймера
  const countDownDate = new Date(new Date().getFullYear(), 3, 30).getTime();
  const timerInterval = setInterval(updateTimer, 1000);

  // Элементы интерфейса
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const preorderBtn = document.querySelector(".preorder-btn");

  function updateTimer() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    daysElement.textContent = days.toString().padStart(2, "0");
    hoursElement.textContent = Math.floor(hours).toString().padStart(2, "0");
    minutesElement.textContent = minutes.toString().padStart(2, "0");
  }

  // Обработчик кнопки
  preorderBtn.addEventListener("click", () => {
    alert("Предзаказ скоро будет доступен!");
  });

  // Первый запуск
  updateTimer();
});
