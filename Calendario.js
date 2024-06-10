const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const currentMonthYear = document.getElementById('currentMonthYear');
const calendarBody = document.getElementById('calendarBody');

let currentDate = new Date();

function renderCalendar() {
    calendarBody.innerHTML = '';
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    
    currentMonthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentYear}`;

    for (let i = 0; i < firstDayIndex; i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day', 'disabled');
        calendarBody.appendChild(day);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day');
        day.textContent = i;
        if (i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()) {
            day.classList.add('today');
        }
        calendarBody.appendChild(day);
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

document.addEventListener('DOMContentLoaded', renderCalendar);

