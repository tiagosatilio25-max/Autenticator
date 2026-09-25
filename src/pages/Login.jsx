import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

export default function Login({ setIsAuth, setUsuarioLogado }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await login(usuario, senha);
      
      localStorage.setItem("token", resposta.token);
      if (resposta.usuario) {
        localStorage.setItem("usuario", JSON.stringify(resposta.usuario));
        setUsuarioLogado(resposta.usuario);
      }
      
      setIsAuth(true);
      navigate("/sucesso");
    } catch (err) {
      setErro(err.message || "Usuário ou senha incorretos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logoIcon}>🔐</div>
          <h2 style={styles.title}>Bem-vindo de volta</h2>
          <p style={styles.subtitle}>Acesse sua conta para continuar</p>
        </div>

        {erro && <div style={styles.errorContainer}>⚠️ {erro}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            style={{
              ...styles.button,
              opacity: carregando ? 0.7 : 1,
              cursor: carregando ? "not-allowed" : "pointer"
            }}
          >
            {carregando ? "Autenticando..." : "Entrar no Sistema"}
          </button>
        </form>

        <div style={styles.footer}>
          <span>Ainda não possui uma conta? </span>
          <Link to="/cadastro" style={styles.link}>
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "20px"
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px 32px",
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)"
  },
  header: {
    textAlign: "center",
    marginBottom: "28px"
  },
  logoIcon: {
    fontSize: "36px",
    marginBottom: "8px"
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#f8fafc",
    margin: "0 0 6px 0"
  },
  subtitle: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: 0
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#cbd5e1"
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box"
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)"
  },
  errorContainer: {
    padding: "10px 14px",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "8px",
    color: "#fca5a5",
    fontSize: "13px",
    marginBottom: "20px",
    textAlign: "center"
  },
  footer: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "14px",
    color: "#94a3b8"
  },
  link: {
    color: "#818cf8",
    fontWeight: "600",
    textDecoration: "none"
  }
};