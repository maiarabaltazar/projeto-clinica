
function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  function login() {
    var emailInput = document.getElementById("email");
    var senhaInput = document.getElementById("password");
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
  }