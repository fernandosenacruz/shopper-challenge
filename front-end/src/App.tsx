import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RideEstmate from './pages/RideEstimate';
import RideConfirm from './pages/RideConfirm';
import RideEstimateProvider from './contexts/rideEstimate';

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
      <RideEstimateProvider>
        <Router>
          <Routes>
            <Route path="/ride/confirm" element={<RideConfirm />} />
            <Route path="/" element={<RideEstmate />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Router>
      </RideEstimateProvider>
    </main>
  );
}

export default App;
