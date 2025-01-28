document.addEventListener("DOMContentLoaded", function() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const monthYear = document.getElementById("monthYear");
    const daysContainer = document.querySelector(".days");
    const eventPopup = document.createElement("div");
    eventPopup.classList.add("event-popup");
    document.body.appendChild(eventPopup); // Añade el popup al cuerpo del documento

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let events = {}; // Objeto para almacenar eventos por día

    // Ejemplo de eventos
    events["2024-04-08"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-04-16"] = [{ hora: "5:40 am", motivo: "Consulta 1", descripcion: "Revision urea",}];
    events["2024-04-22"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-05-08"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-05-16"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-05-22"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-06-08"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-06-16"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-06-22"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-07-08"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-07-16"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-07-22"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-08-08"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-08-16"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];
    events["2024-08-22"] = [{ hora: "6:30 pm", motivo: "Estudios de sangre", descripcion: "Transfusion (En ayunas)" }];

    renderCalendar(currentMonth, currentYear);

    prevBtn.addEventListener("click", () => {
        currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        renderCalendar(currentMonth, currentYear);
    });

    nextBtn.addEventListener("click", () => {
        currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        renderCalendar(currentMonth, currentYear);
    });

    // Funcionalidad para los botones
    const button1 = document.createElement("button");
    button1.textContent = "Posponer consulta";
    button1.id = "button1";
    button1.classList.add("new-button");
    document.body.insertBefore(button1, document.querySelector(".calendar"));

    const button2 = document.createElement("button");
    button2.textContent = "Cancelar consulta";
    button2.id = "button2";
    button2.classList.add("new-button");
    document.body.insertBefore(button2, document.querySelector(".calendar"));

    button1.addEventListener("click", () => {
        console.log("Botón 1 clickeado");
        // Coloca aquí la funcionalidad que deseas ejecutar cuando se haga clic en el botón 1
    });

    button2.addEventListener("click", () => {
        console.log("Botón 2 clickeado");
        // Coloca aquí la funcionalidad que deseas ejecutar cuando se haga clic en el botón 2
    });

    function renderCalendar(month, year) {
        daysContainer.innerHTML = "";
        monthYear.innerHTML = `${getMonthName(month)} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("empty");
            daysContainer.appendChild(emptyDay);
        }

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

    function handleDayClick(event) {
        const eventsData = JSON.parse(event.currentTarget.getAttribute("data-events"));
        if (eventsData) {
            const eventInfo = eventsData.map(event => `Hora: ${event.hora}\nMotivo: ${event.motivo}\nDescripcion: ${event.descripcion}`).join("\n\n");
            eventPopup.innerHTML = eventInfo; // Inserta la información del evento en el popup
            eventPopup.style.display = "block"; // Muestra el popup
            eventPopup.style.top = "50px"; // Ajusta la posición superior del popup
            eventPopup.style.left = "50px"; // Ajusta la posición izquierda del popup
        }
    }

    function getMonthName(month) {
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return months[month];
    }

    function padNumber(number) {
        return number.toString().padStart(2, "0");
    }
});
