import { Route, Routes } from 'react-router-dom'
import { Home, RequestsList, Request, CreateRequest } from './components';
import Navbar from './components/Navbar';
import UserSummary from './components/UserSummary';

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/requests/create" element={<CreateRequest />} />
        <Route path="/users" element={<UserSummary />} />
        
        <Route path="/requests" element={<RequestsList />} />
        <Route path="/requests/:id/assign" element={<Request />} />
      </Routes>
    </>
  )
}

export default App
