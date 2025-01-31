document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const monthYear = document.getElementById("monthYear");
    const daysContainer = document.querySelector(".days");
    const addEventModal = new bootstrap.Modal(document.getElementById("addEventModal"));
    const eventForm = document.getElementById("eventForm");
    const deleteEventBtn = document.getElementById("deleteEventBtn");

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let events = {}; // Objeto para almacenar eventos por día
    let selectedDate = null;

    // Renderizar el calendario
    renderCalendar(currentMonth, currentYear);

    // Navegar al mes anterior
    prevBtn.addEventListener("click", () => {
        currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        renderCalendar(currentMonth, currentYear);
    });

    // Navegar al siguiente mes
    nextBtn.addEventListener("click", () => {
        currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        renderCalendar(currentMonth, currentYear);
    });

    // Función para renderizar el calendario
    function renderCalendar(month, year) {
        daysContainer.innerHTML = "";
        monthYear.innerHTML = `${getMonthName(month)} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Agregar días vacíos antes del primer día del mes
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("empty");
            daysContainer.appendChild(emptyDay);
        }

        // Agregar los días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("div");
            dayElement.textContent = day;
            dayElement.classList.add("day");

            const dateKey = `${year}-${padNumber(month + 1)}-${padNumber(day)}`;
            if (events[dateKey]) {
                dayElement.classList.add("event");
                dayElement.setAttribute("data-events", JSON.stringify(events[dateKey]));
            }

            dayElement.addEventListener("click", handleDayClick);
            daysContainer.appendChild(dayElement);
        }
    }

    // Función para manejar el clic en un día
    function handleDayClick(event) {
        selectedDate = `${currentYear}-${padNumber(currentMonth + 1)}-${padNumber(event.target.textContent)}`;
        
        if (events[selectedDate]) {
            // Si hay un evento, mostrar el modal con la cita y el botón para borrar
            const eventDetails = events[selectedDate][0];  // Tomar el primer evento (si es que hay más)
            document.getElementById("eventTime").value = eventDetails.hora;
            document.getElementById("eventMotivo").value = eventDetails.motivo;
            document.getElementById("eventDescripcion").value = eventDetails.descripcion;

            // Mostrar el botón para borrar la cita
            deleteEventBtn.style.display = "inline-block";
        } else {
            // Si no hay evento, limpiar el formulario y ocultar el botón de borrar
            document.getElementById("eventTime").value = "";
            document.getElementById("eventMotivo").value = "";
            document.getElementById("eventDescripcion").value = "";
            deleteEventBtn.style.display = "none";
        }

        addEventModal.show();
    }

    // Agregar evento al formulario
    eventForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const time = document.getElementById("eventTime").value;
        const motivo = document.getElementById("eventMotivo").value;
        const descripcion = document.getElementById("eventDescripcion").value;

        // Verificar si ya existe un evento para el día seleccionado
        if (!events[selectedDate]) {
            events[selectedDate] = [];
        }

        // Agregar el nuevo evento
        events[selectedDate].push({ hora: time, motivo: motivo, descripcion: descripcion });

        renderCalendar(currentMonth, currentYear); // Renderizar el calendario actualizado

        addEventModal.hide(); // Cerrar el modal

        eventForm.reset(); // Limpiar el formulario
    });

    // Función para borrar la cita
    deleteEventBtn.addEventListener("click", function () {
        if (events[selectedDate]) {
            // Eliminar el evento
            delete events[selectedDate];

            renderCalendar(currentMonth, currentYear); // Renderizar el calendario actualizado

            addEventModal.hide(); // Cerrar el modal
        }
    });

    // Función para obtener el nombre del mes
    function getMonthName(month) {
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return months[month];
    }

    // Función para agregar ceros a los números de un solo dígito
    function padNumber(number) {
        return number.toString().padStart(2, "0");
    }
    // Función para regresar al Lobby
    window.goBackToLobby = function() {
    window.location.href = 'Lobby-Paciente.html'; // Redirige al Lobby
}
});

