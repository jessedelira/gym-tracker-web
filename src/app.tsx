import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './providers/auth-provider';
import Landing from './pages/landing-page';

import { About } from './pages/about-page';
import Layout from './components/layout/layout';
import Login from './pages/auth/login-page';
import SignUp from './pages/auth/signup-page';
import Home from './pages/home-page';
import ManageRoutines from './pages/routines/manage-routines-page';
import ManageAccount from './pages/settings/manage-account-page';
import Settings from './pages/settings/settings-page';
import TrainingManagePage from './pages/training-manage-page';
import ViewEditRoutines from './pages/routines/view-edit-routines-page';
import CreateRoutine from './pages/routines/create-routine-page';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              {/* Public Routes*/}
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected Routes*/}
              <Route path="/home" element={<Home />} />
              <Route path="/training" element={<TrainingManagePage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/account" element={<ManageAccount />} />
              <Route path="/training/routines" element={<ManageRoutines />} />
              <Route
                path="/training/routines/:routineId"
                element={<ViewEditRoutines />}
              />
              <Route
                path="/training/routines/create"
                element={<CreateRoutine />}
              />
              <Route
                path="/training/sessions"
                element={<div>session training hehe</div>}
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
