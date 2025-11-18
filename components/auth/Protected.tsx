import { useRouter } from 'next/router';
import { useEffect, useState, ReactNode } from 'react';
import { authService } from '@/lib/auth/auth.service';

interface ProtectedProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const Protected = ({ children, requireAuth = true }: ProtectedProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = authService.isAuthenticated();

        if (!isAuthenticated && requireAuth) {
          router.replace('/admin/login');
          return;
        }

        if (isAuthenticated) {
          const result = await authService.getProfile();

          if (result.success) {
            setIsAuthorized(true);
            setIsLoading(false);
          } else {
            authService.logout();
            router.replace('/admin/login');
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        authService.logout();
        router.replace('/admin/login');
      }
    };

    checkAuth();
  }, [router, requireAuth]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="mt-4 text-gray-600">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  // Render children only if authorized
  if (!requireAuth || isAuthorized) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
};

export default Protected;
