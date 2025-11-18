import { useRouter } from 'next/router';
import { authService } from '@/lib/auth/auth.service';
import { useEffect, useState, ReactNode } from 'react';

interface NonProtectedProps {
  children: ReactNode;
  redirectTo?: string;
}

const NonProtected = ({ children, redirectTo = '/admin/dashboard' }: NonProtectedProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = authService.isAuthenticated();

        if (isAuthenticated) {
          const result = await authService.getProfile();

          if (result.success) {
            router.replace(redirectTo);
            return;
          } else {
            authService.logout();
            setCanAccess(true);
            setIsLoading(false);
          }
        } else {
          setCanAccess(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        authService.logout();
        setCanAccess(true);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, redirectTo]);

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
          <p className="mt-4 text-gray-600">Memeriksa status login...</p>
        </div>
      </div>
    );
  }

  // Render children only if user can access (not authenticated)
  if (canAccess) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
};

export default NonProtected;
