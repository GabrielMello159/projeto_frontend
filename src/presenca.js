const dominio = "https://chamada-api.azurewebsites.net/";

    async function registrarUsuario() {
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      if (!nome || !email || !senha) {
        return alert("Preencha todos os campos!");
      }

      try {
        const response = await fetch("https://chamada-api.azurewebsites.net/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha })
        });

        if (response.ok) {
          alert("Cadastro realizado com sucesso!");
          window.location.href = "login.html";
        } else {
          const erro = await response.json();
          alert("Erro ao cadastrar: " + erro.message);
        }
      } catch (err) {
        alert("Erro de conexão: " + err.message);
      }
    }

async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const response = await fetch(`${dominio}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  if (!response.ok) return alert("Login inválido");

  const data = await response.json();
  localStorage.setItem("token", data.token);
  alert("Login realizado com sucesso!");
  window.location.href = "presenca.html";
}

async function registrarPresenca() {
  const token = localStorage.getItem("token");
  const presenca = {
    nome: document.getElementById("nome").value,
    ra: document.getElementById("ra").value,
    turma: document.getElementById("turma").value,
    data: document.getElementById("data").value
  };

  const response = await fetch(`${dominio}/presenca`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(presenca)
  });

  if (response.ok) alert("Presença registrada!");
  else alert("Erro ao registrar presença.");


  obterPresencas(); 
}

  await obterPresencas(); 
};

  const response = await fetch(`${dominio}/presenca`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(presenca)
  });

  if (response.ok) alert("Presença registrada!");
  else alert("Erro ao registrar presença.");

  await obterPresencas(); 


async function obterPresencas() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${dominio}/presenca`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await response.json();
  const tabela = document.getElementById("tabela-presencas");

  tabela.innerHTML = data
    .map(
      (p) =>
        `<tr>
          <td>${p.id}</td>
          <td>${p.nome}</td>
          <td>${p.ra}</td>
          <td>${p.turma}</td>
          <td>${p.data}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="deletarPresenca(${p.id})">
              Delete
            </button>
          </td>
        </tr>`
    )
    .join("");
}

async function deletarPresenca(id) {
  const token = localStorage.getItem("token");
  if (!confirm(`Deseja realmente deletar a presença de ID ${id}?`)) return;

  try {
    const response = await fetch(`${dominio}/presenca/${id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      }
    });

    if (response.ok) {
      alert("Presença deletada com sucesso!");
      obterPresencas();
    } else {
      const erro = await response.json();
      alert("Erro ao deletar presença: " + erro.message);
    }
  } catch (err) {
    alert("Erro de conexão: " + err.message);
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

