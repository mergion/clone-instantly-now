
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 bg-instantly-blue/10 rounded-full flex items-center justify-center">
            <div className="text-4xl font-bold text-instantly-blue">404</div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-instantly-dark mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button className="instantly-btn-primary flex items-center gap-2" asChild>
            <Link to="/">
              <Home size={16} />
              <span>Go to Dashboard</span>
            </Link>
          </Button>
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link to="/">
              <ArrowLeft size={16} />
              <span>Go Back</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
