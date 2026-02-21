import { Route, Router } from '@solidjs/router';

import NotFound from './routes/[...404]';
import { LoginPage } from './routes/login';

import { LandingPage } from './routes';
import { RegisterUserPage } from './routes/register-user';
import { AuthProvider } from './contexts/auth-context';
import { Home } from './routes/home';
import { Layout } from './components/layout/layout';
import { PublicOnly } from './components/auth-guards/public-only';
import { Protected } from './components/auth-guards/protected';
import { Settings } from './routes/settings';
import { ManagePage } from './routes/manage/manage';
import { ManageRoutines } from './routes/manage/routine/manage-routines';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path={'/'} component={Layout}>
          {/* Public routes - all nested under PublicOnly guard */}
          <Route path="/" component={PublicOnly}>
            <Route path="/" component={LandingPage} />
            <Route path="/register" component={RegisterUserPage} />
            <Route path="/login" component={LoginPage} />
          </Route>

          {/* Protected routes - all nested under Protected guard */}
          <Route path="/" component={Protected}>
            <Route path="/home" component={Home} />
            <Route path="/settings" component={Settings} />
            {/* Manage */}
            <Route path="/manage" component={ManagePage} />
            <Route path="/manage/routines" component={ManageRoutines} />
          </Route>

          {/* Not Found */}
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </AuthProvider>
  );
}
