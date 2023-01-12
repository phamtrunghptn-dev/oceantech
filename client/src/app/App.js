import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import LeadershipPending from './scenes/leadership_pending/LeadershipPending';
import LeadershipApproved from "./scenes/leadership_approved/LeadershipApproved";
import EmployeeManageCreate from "./scenes/ME_create/EmployeeManageCreate";
import EmployeeMainManager from "./scenes/ME_manage/EmployeeMainManager";
import EmployeeManageRemove from "./scenes/ME_remove/EmployeeManageRemove";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/team" element={<Team />} />
              <Route path="/leadership-pending" element={<LeadershipPending />} />
              <Route path="/leadership-approved" element={<LeadershipApproved />} />
              <Route path="/manage-employee-create" element={<EmployeeManageCreate />} />
              <Route path="/manage_employee_manage" element={<EmployeeMainManager />} />
              <Route path="/manage_employee_remove" element={<EmployeeManageRemove />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
