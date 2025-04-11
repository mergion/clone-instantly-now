
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard
    navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-instantly-blue/10">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-instantly-blue mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-instantly-dark">Loading Email Campaign Manager...</h1>
      </div>
    </div>
  );
};

export default Index;
