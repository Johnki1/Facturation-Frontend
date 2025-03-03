import { Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.5, // Cada bloque aparece con un delay progresivo
      duration: 0.8,
    },
  }),
};

const Home = () => {
  // Array de citas con su texto y referencia
  const quotes = [
    {
      text: `"Mejor son dos que uno, porque tienen mejor paga de su trabajo."`,
      reference: "(Eclesiastés 4:9)",
    },
    {
      text: `"Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto."`,
      reference: "(Eclesiastés 4:12)",
    },
    {
      text: `"En todo tiempo ama el amigo; es como un hermano en tiempo de angustia."`,
      reference: "(Proverbios 17:17)",
    },
    {
      text: `"Amarás a tu prójimo como a ti mismo."`,
      reference: "(Mateo 22:39)",
    },
  ];

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        p: 4,
        textAlign: 'center',
      }}
    >
      {/* Título principal */}
      <motion.div initial="hidden" animate="visible" variants={textVariants} custom={0}>
        <Typography variant="h2" gutterBottom sx={{ color: 'var(--text-color)' }}>
          MejorSonDosQueUno
        </Typography>
      </motion.div>

      {/* Mapeo de cada cita */}
      {quotes.map((quote, index) => (
        <motion.div key={index} initial="hidden" animate="visible" variants={textVariants} custom={index + 1}>
          <Typography variant="h5" gutterBottom sx={{ color: 'var(--text-color)' }}>
            {quote.text}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ color: 'var(--text-color)' }}>
            {quote.reference}
          </Typography>
        </motion.div>
      ))}

      {/* Texto descriptivo */}
      <motion.div initial="hidden" animate="visible" variants={textVariants} custom={quotes.length + 1}>
        <Typography variant="body1" paragraph sx={{ color: 'var(--text-color)', maxWidth: '800px' }}>
          La unión es la fuerza que impulsa el crecimiento y la superación; el amigo siempre está presente, el amor nos impulsa a cuidar de nuestro prójimo, y la ayuda mutua aligera cualquier carga. En Uno igual a dos creemos que cada encuentro es una oportunidad para tejer lazos de solidaridad y colaboración, creando una comunidad en la que el apoyo mutuo y la cooperación hacen que, en conjunto, seamos más fuertes y capaces de alcanzar metas que solos parecerían inalcanzables.
          <br /><br />
          En Uno igual a dos creemos que la fuerza y la creatividad emergen cuando nos unimos, demostrando que, en verdad, uno solo se convierte en dos al compartir, colaborar y crecer en comunidad.
        </Typography>
      </motion.div>

      {/* Botón para ver el menú */}
      <motion.div initial="hidden" animate="visible" variants={textVariants} custom={quotes.length + 2}>
        <Button variant="contained" color="primary" size="large">
          Ver Menú
        </Button>
      </motion.div>
    </Container>
  );
};

export default Home;
