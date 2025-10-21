import React, { useState, useEffect, useCallback } from 'react';
import { getActiveSessions } from './services/sessionService';
import type { UserSession } from './types';
import UserCard from './components/UserCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import { RefreshCw, Users } from 'lucide-react';

const App: React.FC = () => {
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchSessions = useCallback(async () => {
    // Keep showing spinner on manual refresh, but not for background polling
    if (!sessions.length) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const data = await getActiveSessions();
      setSessions(data);
      setLastUpdated(new Date());
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      // Keep stale data on screen if poll fails
    } finally {
      setIsLoading(false);
    }
  }, [sessions.length]);

  useEffect(() => {
    fetchSessions();
    const intervalId = setInterval(fetchSessions, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSessions]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error && sessions.length === 0) {
      return <ErrorDisplay message={error} onRetry={fetchSessions} />;
    }
    if (sessions.length === 0) {
      return (
        <div className="text-center py-10">
          <Users className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-200">Nenhum usuário ativo</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Atualmente não há usuários com uma sessão ativa.</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sessions.map((session) => (
          <UserCard key={session.sessionkey} session={session} />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
                <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Sessões Ativas
              </h1>
              <p className="text-slate-500 dark:text-slate-400">Usuários online no momento.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             {lastUpdated && !isLoading && (
              <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
                Atualizado às: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={() => fetchSessions()}
              disabled={isLoading}
              className="flex items-center justify-center p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Atualizar sessões"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        <main>
          {error && sessions.length > 0 && (
            <div className="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Falha na atualização:</span> {error}. Exibindo últimos dados conhecidos.
            </div>
           )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;