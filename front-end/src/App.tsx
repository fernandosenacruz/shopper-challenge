import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RideEstmate from './pages/RideEstimate';
import RideConfirm from './pages/RideConfirm';
import RideProvider from './contexts/rideContext';

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
      <RideProvider>
        <Router>
          <Routes>
            <Route path="/ride/confirm" element={<RideConfirm />} />
            <Route path="/" element={<RideEstmate />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Router>
      </RideProvider>
    </main>
  );
}

export default App;
