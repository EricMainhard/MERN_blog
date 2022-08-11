import './App.css';
import { Container } from '@mui/material';
import { Home } from './pages/Home/Home';
import { Topbar } from './components/Topbar/Topbar';
import { SinglePage } from './pages/SinglePage/SinglePage';
import { WritePage } from './pages/WritePage/WritePage.jsx';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage'; 
import { LoginPage } from './pages/LoginPage/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <div className="App">
          <Topbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/write" element={<WritePage/>}/>
            <Route path="/posts/:id" element={<SinglePage/>}/>
            <Route path="/profile" element={<SettingsPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </div>
      </Container>
    </BrowserRouter>
  )
}

export default App
