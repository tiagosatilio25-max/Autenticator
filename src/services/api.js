const API = 'http://localhost:3000';

async function tratarResposta(response) {
  let dados = {};
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    dados = await response.json();
  }

  if (!response.ok) {
    throw new Error(dados.mensagem || 'Erro na requisição');
  }
  return dados;
}

export async function cadastrar(usuario, senha) {
  const response = await fetch(`${API}/registrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha })
  });
  return tratarResposta(response);
}

export async function login(usuario, senha) {
  const response = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha })
  });
  return tratarResposta(response);
}

export async function validarToken(token) {
  const response = await fetch(`${API}/perfil`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return tratarResposta(response);
}