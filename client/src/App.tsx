import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RedirectPage from "@/pages/RedirectPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={RedirectPage} />
      {/* Fallback to redirect page by default */}
      <Route component={RedirectPage} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
