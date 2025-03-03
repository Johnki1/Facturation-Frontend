import { Container, Typography, Button } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom sx={{ color: 'var(--text-color)' }}>
        MejorSonDosQueUno
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: 'var(--text-color)' }}>
        disfruta de lo mejor
      </Typography>
      <Button variant="contained" color="primary">
        Ver Menú
      </Button>
    </Container>
  );
};

export default Home;