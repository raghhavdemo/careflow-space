
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/ui-components/Logo";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-healthcare-50 to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Logo size="lg" className="mb-6 justify-center" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white backdrop-blur-lg bg-opacity-70 rounded-xl shadow-xl border border-gray-100 p-8 text-center"
        >
          <div className="relative mx-auto w-16 h-16 mb-4">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
            <div className="relative flex items-center justify-center w-full h-full">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-gray-900">404</h1>
          <p className="text-xl text-gray-600 mb-6">Page not found</p>
          <p className="text-gray-500 mb-8">
            We couldn't find the page you were looking for. The page may have been moved or doesn't exist.
          </p>

          <Button
            onClick={() => navigate("/")}
            className="flex items-center justify-center bg-healthcare-600 hover:bg-healthcare-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
