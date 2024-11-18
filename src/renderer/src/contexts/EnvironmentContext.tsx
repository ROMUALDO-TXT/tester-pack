import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

interface EnvironmentContextProps {
  env: { port: number; domain: string };
  tunnelUrl: string | null;
  serverUrl: string | null;
  startEnvironment<T extends boolean>(
    params?: T extends true ? { port: number; domain: string } : never
  ): Promise<void>;
  stopEnvironment: () => Promise<void>;
  cleanEnvironment: () => Promise<void>;
  restartEnvironment: () => Promise<void>;
}

const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(
  undefined
);

const EnvironmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const env = useRef({
    port: 3000,
    domain: '',
  });
  const [tunnelUrl, setTunnelUrl] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState<string | null>(null);

  const cleanEnvironment = async () => {
    await stopEnvironment();

    env.current = {
      port: 3000,
      domain: '',
    };
    setTunnelUrl(null);
    setServerUrl(null);
  };

  const startEnvironment = async <T extends boolean>(
    params?: T extends true ? { port: number; domain: string } : never
  ) => {
    try {
      if (params) {
        env.current = params;
      }

      const serverUrl = await window.electronAPI.invoke<string>(
        'start-express',
        env.current.port
      );
      setServerUrl(serverUrl);

      console.log(env.current);

      const tunnelUrl = await window.electronAPI.invoke<string>(
        'start-localtunnel',
        {
          port: env.current.port,
          domain: env.current.domain,
        }
      );
      setTunnelUrl(tunnelUrl);
    } catch (error) {
      console.error('Erro ao iniciar ambiente:', error);
    }
  };

  const stopEnvironment = async () => {
    try {
      await window.electronAPI.invoke('stop-express');
      await window.electronAPI.invoke('stop-localtunnel');

      setTunnelUrl(null);
      setServerUrl(null);
    } catch (error) {
      console.error('Erro ao parar ambiente:', error);
    }
  };

  const restartEnvironment = async () => {
    await stopEnvironment();
    await startEnvironment();
  };

  return (
    <EnvironmentContext.Provider
      value={{
        env: env.current,
        tunnelUrl,
        serverUrl,
        startEnvironment,
        stopEnvironment,
        cleanEnvironment,
        restartEnvironment,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = (): EnvironmentContextProps => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error(
      'useEnvironment must be used within an EnvironmentProvider'
    );
  }
  return context;
};

export default EnvironmentProvider;
