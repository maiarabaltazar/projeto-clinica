document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("cadastro-form");
  var senhaInput = document.getElementById("senha");
  var senhaRequisitos = document.getElementById("senha-requisitos");
  var infoSenhaButton = document.getElementById("info-senha");

  form.addEventListener("submit", function (event) {
    console.log(event);
    event.preventDefault(); // Evita que o formulário seja enviado automaticamente

    // Validação dos campos
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var cpf = document.getElementById("cpf").value;
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("confirmarsenha").value;
    ("");
    if (
      nome === "" ||
      email === "" ||
      cpf === "" ||
      senha === "" ||
      confirmarSenha === ""
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    // Verificação do e-mail
    if (!validarEmail(email)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return;
    }

    // Verificação do CPF
    if (!validarCPF(cpf)) {
      alert("Por favor, insira um CPF válido.");
      return;
    }

    // Verificação da senha
    var requisitos = [];
    if (senha.length < 6) {
      requisitos.push("Mínimo 6 caracteres");
    }
    if (!/[a-z]/.test(senha)) {
      requisitos.push("Pelo menos uma letra minúscula");
    }
    if (!/[A-Z]/.test(senha)) {
      requisitos.push("Pelo menos uma letra maiúscula");
    }
    if (!/[\W_]/.test(senha)) {
      requisitos.push("Pelo menos um caractere especial");
    }

    if (requisitos.length > 0) {
      alert(
        "A senha não atende aos seguintes requisitos:\n\n" +
          requisitos.join("\n")
      );
      return;
    }

    if (
      nome &&
      nome.length > 0 &&
      email &&
      email.length > 0 &&
      cpf &&
      cpf.length > 0 &&
      senha &&
      senha.length > 0
    ) {
      // Se todos os campos estiverem preenchidos corretamente, redirecione para outra página
      $.ajax({
        url: "http://localhost:80/clinica_salutare_backend/cadastro.php",
        method: "POST",

        data: JSON.stringify({
          nome,
          email,
          cpf,
          senha,
        }),

        crossDomain: true,

        contentType: "application/json",

        success: function (res) {
          console.log(res);
          alert("Cadastrado com sucesso!");
          window.location.href = "/login/login.html";
        },
      });
    }
  });

  infoSenhaButton.addEventListener("click", function () {
    alert(
      "Requisitos da senha:\n- Mínimo 6 caracteres\n- Pelo menos uma letra minúscula\n- Pelo menos uma letra maiúscula\n- Pelo menos um caractere especial"
    );
  });
});

function validarEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
  if (
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return false;
  }
  var soma = 0;
  var resto;
  for (var i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false;
  }
  soma = 0;
  for (var i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }
  return true;
}
