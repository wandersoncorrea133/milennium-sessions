import React from 'react';
import type { UserSession } from '../types';

interface UserCardProps {
  session: UserSession;
}

const UserCard: React.FC<UserCardProps> = ({ session }) => {
  const { sessionkey, username, creation_time } = session;

  const formatCreationTime = (dateString: string): string => {
    // Extrai o timestamp do formato "/Date(1761051439088-180)/"
    const match = dateString.match(/\/Date\((\d+).*\)\//);
    if (!match || !match[1]) {
      return 'Data inválida';
    }
    const timestamp = parseInt(match[1], 10);
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR'); // Formata para o padrão brasileiro
  };

  const handleCancelSession = () => {
    console.log(`Canceling session for key: ${sessionkey}`);
    // Este é um placeholder para a funcionalidade futura
    alert(`A funcionalidade para cancelar a sessão do usuário ${username} (${sessionkey}) será implementada no futuro.`);
  };

  const fallbackAvatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(username)}`;
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 relative">
            <img 
              className="h-16 w-16 rounded-full object-cover border-2 border-slate-200 dark:border-slate-600" 
              src={fallbackAvatarUrl} 
              alt={`Avatar de ${username}`} 
            />
            <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-400 ring-2 ring-white dark:ring-slate-800" title="Ativo"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-slate-900 dark:text-white truncate" title={username}>
              {username}
            </p>
             <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate font-mono" title={sessionkey}>
                {sessionkey}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium">Iniciou em:</span>
            <br />
            {formatCreationTime(creation_time)}
          </p>
        </div>
      </div>
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3">
         <button 
           onClick={handleCancelSession}
           className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 transition"
         >
           Cancelar Sessão
         </button>
      </div>
    </div>
  );
};

export default UserCard;
