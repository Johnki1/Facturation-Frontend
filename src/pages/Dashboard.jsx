import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import websocket from '../services/websocket';

const API_URL = 'apiunoigualados.up.railway.app';

const getAuthToken = () => localStorage.getItem('jwtToken');

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error('No se encontró un token válido.');
        }
        const response = await axios.get(`${API_URL}/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        setError('No se pudieron cargar las estadísticas. Verifique su sesión.');
      }
    };

    fetchStats();

    const handleDashboardUpdate = (newStats) => {
      setStats(newStats);
    };

    const handleNotification = (message) => {
      setNotification(message);
    };

    // Conectar WebSocket
    const token = getAuthToken();
    if (token) {
      websocket.connect(handleNotification, handleDashboardUpdate);
    }

    // Cleanup
    return () => {
      websocket.disconnect();
    };
  }, []);

  const handleCloseNotification = () => setNotification(null);

  if (error) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!stats) return <Typography>Cargando...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ color: 'var(--text-color)' }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Tarjeta de Ventas Diarias */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, backgroundColor: 'var(--background-color)' }}>
            <Typography variant="h6" sx={{ color: 'var(--text-color)' }}>
              Ventas Diarias
            </Typography>
            <Typography variant="h4" sx={{ color: 'var(--text-color)' }}>
              ${stats.dailySales ? stats.dailySales.toFixed(2) : '0.00'}
            </Typography>
          </Paper>
        </Grid>

        {/* Tarjeta de Ventas Semanales */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, backgroundColor: 'var(--background-color)' }}>
            <Typography variant="h6" sx={{ color: 'var(--text-color)' }}>
              Ventas Semanales
            </Typography>
            <Typography variant="h4" sx={{ color: 'var(--text-color)' }}>
              ${stats.weeklySales ? stats.weeklySales.toFixed(2) : '0.00'}
            </Typography>
          </Paper>
        </Grid>

        {/* Tarjeta de Ventas Mensuales */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, backgroundColor: 'var(--background-color)' }}>
            <Typography variant="h6" sx={{ color: 'var(--text-color)' }}>
              Ventas Mensuales
            </Typography>
            <Typography variant="h4" sx={{ color: 'var(--text-color)' }}>
              ${stats.monthlySales ? stats.monthlySales.toFixed(2) : '0.00'}
            </Typography>
          </Paper>
        </Grid>

        {/* Tarjeta de Productos Más Vendidos */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, backgroundColor: 'var(--background-color)' }}>
            <Typography variant="h6" sx={{ color: 'var(--text-color)' }}>
              Productos Más Vendidos
            </Typography>
            {stats.bestSellingProducts && stats.bestSellingProducts.length > 0 ? (
              <ul>
                {stats.bestSellingProducts.map((product) => (
                  <li key={product.name} style={{ color: 'var(--text-color)' }}>
                    {product.name} - {product.quantitySold} vendidos ($
                    {product.totalIncome ? product.totalIncome.toFixed(2) : '0.00'})
                  </li>
                ))}
              </ul>
            ) : (
              <Typography sx={{ color: 'var(--text-color)' }}>
                No hay productos vendidos aún.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Notificación WebSocket */}
      <Snackbar open={!!notification} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity="warning">
          {notification?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
