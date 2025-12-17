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
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/leads" element={<LeadsPage />} />
          <Route path="/dashboard/appointments" element={<CalendarPage />} />
          <Route path="/dashboard/scripts" element={<ScriptsPage />} />
          <Route path="/dashboard/recordings" element={<RecordingsPage />} />
          <Route path="/dashboard/email-templates" element={<TemplatesPage />} />
          <Route path="/dashboard/automation" element={<AutomationPage />} />
          <Route path="/dashboard/ai-tool" element={<AIGeneratorPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/support" element={<SupportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </>
    </Suspense>
    </TenantProvider>
  );
}

export default App;
