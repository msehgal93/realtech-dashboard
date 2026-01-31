import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TenantProvider } from "./contexts/TenantContext";
import Home from "./components/home";
import LeadsPage from "./components/leads/LeadsPage";
import CalendarPage from "./components/calendar/CalendarPage";
import ScriptsPage from "./components/scripts/ScriptsPage";
import RecordingsPage from "./components/recordings/RecordingsPage";
import TemplatesPage from "./components/templates/TemplatesPage";
import AutomationPage from "./components/automation/AutomationPage";
import AIGeneratorPage from "./components/ai-generator/AIGeneratorPage";
import SettingsPage from "./components/settings/SettingsPage";
import SupportPage from "./components/support/SupportPage";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";

function App() {
  return (
    <TenantProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/appointments" element={<CalendarPage />} />
          <Route path="/scripts" element={<ScriptsPage />} />
          <Route path="/recordings" element={<RecordingsPage />} />
          <Route path="/email-templates" element={<TemplatesPage />} />
          <Route path="/automation" element={<AutomationPage />} />
          <Route path="/ai-tool" element={<AIGeneratorPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </>
    </Suspense>
    </TenantProvider>
  );
}

export default App;
