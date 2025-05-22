
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/hooks/useAuth";

// Layouts
import AppLayout from "@/components/layout/AppLayout";

// Pages
import Home from "@/pages/Home";
import EmployeeDashboard from "@/pages/EmployeeDashboard";
import ManagementDashboard from "@/pages/ManagementDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Protected Routes */}
            <Route element={<AppLayout />}>
              <Route path="/employee" element={<EmployeeDashboard />} />
              <Route path="/management" element={<ManagementDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            
            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
