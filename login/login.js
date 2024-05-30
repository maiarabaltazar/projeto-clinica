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

  testelogin(email, senha);

  
}

function testelogin(email, senha) {
  console.log(email, senha)
    // fetch("http://localhost/clinica_salutare_backend/login.php", {
    //   method: "POST", 
    //   body: JSON.stringify ({
    //     "email": email,
    //     "senha": senha
    // },)
    // }).then((value)=>{
    //   console.log (value);
    //   window.location.href = "/index.html";
    // })
    $.ajax({
      url: "http://localhost:80/clinica_salutare_backend/login.php",
      method: "POST",

      data: JSON.stringify( {
        email,
        senha,
      }),

      crossDomain: true,
      
      
      contentType:'application/json',
      

      success: function (res) {
        console.log (res);
      window.location.href = "/index.html";
       
      },
    });
  // $.support.cors = true;
  // $.post("http://localhost:80/clinica_salutare_backend/login.php", {
  //   email: "maiaraemuitolinda@gmail.com",
  //   senha: "maiaralinda",
  // }, function(a, b, c){
  //   console.log ("alguma coisa")
  // }, "json");
}
