import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './providers/auth-provider';
import Landing from './pages/landing-page';
import Login from './pages/login-page';
import SignUp from './pages/signup-page';

import Layout from './layout/layout';
import Home from './pages/home-page';
import ManageAccount from './pages/manage-account-page';
import Settings from './pages/settings-page';
import TrainingManagePage from './pages/training-manage-page';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/training" element={<TrainingManagePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/account" element={<ManageAccount />} />
              <Route path="/training/routines" element={<div>route training hehe</div>}/>
              <Route path="/training/sessions" element={<div>session training hehe</div>}/>

            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
