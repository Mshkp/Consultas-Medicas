$('.form').find('input, textarea').on('keyup blur focus', function (e) {
    var $this = $(this),
    label = $this.prev('label');
    
    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
            label.removeClass('active highlight'); 
        } else {
            label.removeClass('highlight');   
        }   
    } else if (e.type === 'focus') {
        if( $this.val() === '' ) {
            label.removeClass('highlight'); 
        } 
        else if( $this.val() !== '' ) {
            label.addClass('highlight');
        }
    }
});

$('.tab a').on('click', function (e) {
    e.preventDefault();
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    target = $(this).attr('href');
    $('.tab-content > div').not(target).hide();
    $(target).fadeIn(600);
});


// Registro del médico (registro.js)

$(document).ready(function() {
    $("#signupForm").submit(function(event) {
        event.preventDefault();

        // Obtener los datos del formulario
        const nombre = $("input[name='nombre']").val();
        const apellidos = $("input[name='apellidos']").val();
        const cedula = $("input[name='cedula']").val();

        // Crear un objeto con los datos esenciales del médico
        const doctorData = {
            nombre: nombre,
            apellidos: apellidos,
            cedula: cedula
        };

        // Guardar los datos en localStorage
        localStorage.setItem("medico", JSON.stringify(doctorData));

        // Redirigir al lobby del médico
        window.location.href = "login-register_Doc.html";
    });
});

// Inicio de sesión de médico
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("login_medico.php", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (data.success) {
        window.location.href = "dashboard_medico.html"; // Redirigir a su dashboard
    } else {
        alert(data.error);
    }
});


