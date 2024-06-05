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

  fazer_login(email, senha);
}

function fazer_login(email, senha) {
  console.log(email, senha);
  
  $.ajax({
    url: "http://localhost:80/clinica_salutare_backend/login.php",
    method: "POST",

    data: JSON.stringify({
      email,
      senha,
    }),

    crossDomain: true,

    contentType: "application/json",

    success: function (res) {
      var data = JSON.parse(res);

      var user = data[0];

      localStorage.setItem("user", JSON.stringify(user)); //guardando no navegador  usuario que pegou no BD

      window.location.href = "/index.html";
    },
  });
  
}
