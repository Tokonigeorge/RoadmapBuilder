import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainDisplay from './view/mainDisplay';
import { AuthProvider } from '../AuthContext';
import store from './state/store';
import { Provider } from 'react-redux';
import Login from './view/pages/login';
import Register from './view/pages/register';
import ResetPassword from './view/pages/resetPassword';
import ProtectedRoute from './ProtectedRoutes';
import RoadmapViewer from './view/components/timeline';
import ResourcesViewer from './view/components/resourcesViewer';
import Dashboard from './view/pages/dashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Provider store={store}>
          <main>
            <Routes>
              <Route path='/' element={<MainDisplay />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/roadmap/:id' element={<RoadmapViewer />} />
              <Route path='/resources/:id' element={<ResourcesViewer />} />

              {/* Protected routes */}
              <Route
                path='/dashboard'
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </Provider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
