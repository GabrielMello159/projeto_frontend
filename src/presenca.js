const dominio = "http://localhost:3000";

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
}

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
        `<tr><td>${p.id}</td><td>${p.nome}</td><td>${p.ra}</td><td>${p.turma}</td><td>${p.data}</td></tr>`
    )
    .join("");
}
