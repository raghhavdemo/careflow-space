
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import pages
import Index from "./pages/Index";
import RegisterPatient from "./pages/RegisterPatient";
import RegisterDoctor from "./pages/RegisterDoctor";

// Patient routes
import PatientChat from "./pages/patient/PatientChat";
import SavedDoctors from "./pages/patient/SavedDoctors";
import FindDoctors from "./pages/patient/FindDoctors";
import PatientSettings from "./pages/patient/PatientSettings";

// Doctor routes
import DoctorChat from "./pages/doctor/DoctorChat";
import AddPatient from "./pages/doctor/AddPatient";
import DoctorSettings from "./pages/doctor/DoctorSettings";
import SymptomChecker from "./pages/doctor/SymptomChecker";

import NotFound from "./pages/NotFound";

// Create query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/register-patient" element={<RegisterPatient />} />
            <Route path="/register-doctor" element={<RegisterDoctor />} />
            
            {/* Patient Routes */}
            <Route path="/patient/chat" element={<PatientChat />} />
            <Route path="/patient/saved-doctors" element={<SavedDoctors />} />
            <Route path="/patient/find-doctors" element={<FindDoctors />} />
            <Route path="/patient/settings" element={<PatientSettings />} />
            
            {/* Doctor Routes */}
            <Route path="/doctor/chat" element={<DoctorChat />} />
            <Route path="/doctor/add-patient" element={<AddPatient />} />
            <Route path="/doctor/settings" element={<DoctorSettings />} />
            <Route path="/doctor/symptom-checker" element={<SymptomChecker />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
