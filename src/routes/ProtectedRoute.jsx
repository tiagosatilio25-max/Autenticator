import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isAuth, carregando, children }) {
  if (carregando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff' }}>
        <h2>A carregar...</h2>
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}