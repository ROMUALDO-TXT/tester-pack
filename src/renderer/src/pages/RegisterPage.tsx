import React, { useState } from 'react';
import { useEnvironment } from '../contexts/EnvironmentContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const { startEnvironment } = useEnvironment();
  const navigate = useNavigate();

  const [port, setPort] = useState<number>(null);
  const [domain, setDomain] = useState<string>('');

  const handleRegister = () => {
    if (!port || !domain) {
      alert('Preencha todos os campos.');
      return;
    }

    startEnvironment({ port, domain }).then(() => navigate('/dashboard'));
  };
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Register Environment</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="port"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Port
          </label>
          <input
            id="port"
            type="number"
            value={port}
            onChange={(e) => setPort(Number(e.target.value))}
            placeholder="Enter the port"
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="domain"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Username
          </label>
          <input
            id="domain"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter your domain"
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Iniciar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
