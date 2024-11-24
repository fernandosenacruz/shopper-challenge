import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RideEstmate from './pages/RideEstimate';
import RideConfirm from './pages/RideConfirm';

function App() {
  return (
    <main
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80dvh',
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<RideEstmate />} />
          <Route path="/ride/confirm" element={<RideConfirm />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
