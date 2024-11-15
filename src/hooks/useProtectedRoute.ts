import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';

const useProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const { addNotification } = useNotification();

    useEffect(() => {
        if (!isAuthenticated) {
            console.log("Redirecionando usuário")
            localStorage.setItem('redirectAfterLogin', router.asPath);
            addNotification('Você precisa estar logado para acessar esta página.', 'error');
            router.push('/login');
        }
    }, [isAuthenticated, router, addNotification]);
};

export default useProtectedRoute;
