
function minhas_consultas() {
  var user = JSON.parse(localStorage.getItem("user"));
  $.ajax({
      url: "http://localhost/clinica_salutare_backend/minhas_consultas.php?id_pacientes=" + user.id,
      method: "GET",
      contentType: "application/json",
      success: function (res) {
          console.log(res);
          var data = JSON.parse(res);
          var consultasmarcadas = $("#consultasmarcadas");
          console.log(consultasmarcadas);
          consultasmarcadas.empty();  // Limpar a lista antes de adicionar novos elementos
          data.forEach(function (e, i) {
              console.log(e);
              var el = `
                  <div class="list-group-item list-group-item-action" aria-current="true">
                      <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">${e.especialidade}</h5>
                          <small>${e.dataehora}</small>
                      </div>
                      <button class="btn btn-danger btn-sm desmarcar-consulta" data-id="${e.id}">Desmarcar Consulta</button>
                  </div>`;
              consultasmarcadas.append($(el));
          });

          $(".desmarcar-consulta").on("click", function() {
              var consultaId = $(this).data("id");
              desmarcar_consulta(consultaId);
          });
      },
      error: function (xhr, status, error) {
          console.error("Erro ao buscar consultas:", status, error);
      }
  });
}

minhas_consultas();

function desmarcar_consulta(id) {
  $.ajax({
      url: "http://localhost:80/clinica_salutare_backend/desmarcar_consulta.php",
      method: "DELETE",
      data: JSON.stringify({
          id
      }),
      crossDomain: true,
      contentType: "application/json",
      success: function (res) {
          console.log(res);
          window.location.reload();
      },
      
  });
}
