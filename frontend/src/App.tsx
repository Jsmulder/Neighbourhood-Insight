
import { useEffect, useState } from 'react';
import { fetchHealth, type HealthResponse } from './api/healthApi';

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <h1>Neighbourhood Insight</h1>
      <h2>Backend connection</h2>

      {loading && <p>Checking backend connection...</p>}

      {error && <p>Connection failed: {error}</p>}

      {health && (
        <div>
          <p>Status: {health.status}</p>
          <p>Application: {health.application}</p>
        </div>
      )}
    </main>
  );
}

export default App;
