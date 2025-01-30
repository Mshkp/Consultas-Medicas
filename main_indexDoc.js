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


// Registro de médico
document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("registro_medico.php", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (data.success) {
        alert(data.success);
        this.reset(); // Limpiar formulario después del registro
    } else {
        alert(data.error);
    }
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
