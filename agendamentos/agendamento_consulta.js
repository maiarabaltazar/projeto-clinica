function agendar_consulta() {
  var user = JSON.parse(localStorage.getItem("user"));
  var especialidadesInput = document.getElementById("especialidades");
  var dateInput = document.getElementById("date");
  var especialidades = especialidadesInput.value;
  var date = dateInput.value;



  $.ajax({
    url: "http://localhost/clinica_salutare_backend/agendar_consulta.php",
    method: "POST",

    data: JSON.stringify({
      id_pacientes: user.id,
      id_especialidades: especialidades,
      dataehora: date,
    }),

    crossDomain: true,

    contentType: "application/json",

    success: function (res) {
      console.log(res);
      window.location.href = "/agendamentos/minhas_consultas.html";
      
    },
  });
}

function pegar_especialidades() {
  $.ajax({
    url: "http://localhost:80/clinica_salutare_backend/especialidades.php",

    method: "GET",

    contentType: "application/json",

    success: function (res) {
      console.log(res);

      var data = JSON.parse(res);

      var especialidades = $("#especialidades");
      console.log(especialidades);
      data.forEach(function (e, i) {
        console.log(e);
        especialidades.append($("<option />").val(e.id).text(e.nome));
      });
    },
  });
}

pegar_especialidades();
