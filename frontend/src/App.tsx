
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import AIAssistant from "./pages/AIAssistant";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signin from "./pages/Signin";

const queryClient = new QueryClient();


// Auth wrapper for protected routes
function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuth = localStorage.getItem('auth') === 'true';
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              localStorage.getItem('auth') === 'true' ? <Navigate to="/" replace /> : <Login />
            } />
            <Route path="/signin" element={
              localStorage.getItem('auth') === 'true' ? <Navigate to="/" replace /> : <Signin />
            } />
            <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/analytics" element={<RequireAuth><Analytics /></RequireAuth>} />
            <Route path="/ai-assistant" element={<RequireAuth><AIAssistant /></RequireAuth>} />
            <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
