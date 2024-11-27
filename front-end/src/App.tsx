import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RideEstmate from './pages/RideEstimate';
import RideConfirm from './pages/RideConfirm';
import RideProvider from './contexts/rideContext';
import Rides from './pages/Rides';

function App() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        width: '100vw',
        margin: '0 auto',
        padding: '0',
      }}
    >
      <RideProvider>
        <Router>
          <Routes>
            <Route path="/ride/confirm" element={<RideConfirm />} />
            <Route path="/rides" element={<Rides />} />
            <Route path="/" element={<RideEstmate />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Router>
      </RideProvider>
    </main>
  );
}

export default App;
