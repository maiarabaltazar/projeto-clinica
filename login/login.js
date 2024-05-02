document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector(".login form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        var emailInput = document.getElementById(".login input[type='text']");
        var senhaInput = document.getElementById(".login input[type='password']");
        var email = emailInput.value;
        var senha = senhaInput.value;

        if (email === "" || senha === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (!validarEmail(email)) {
            alert("Por favor, insira um endereço de e-mail válido.");
            return;
        }

        window.location.href = "/index.html";
        form.reset(); 
    });
});

function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
