import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainDisplay from './view/mainDisplay';
import { AuthProvider } from '../AuthContext';
import store from './state/store';
import { Provider } from 'react-redux';
import Login from './view/pages/login';
import Register from './view/pages/register';
import ResetPassword from './view/pages/resetPassword';
import ProtectedRoute from './ProtectedRoutes';

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

              {/* Protected routes */}
              <Route element={<ProtectedRoute children={undefined} />}>
                {/* Add protected routes here */}
                {/* For example: <Route path="/dashboard" element={<Dashboard />} /> */}
              </Route>
            </Routes>
          </main>
        </Provider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
