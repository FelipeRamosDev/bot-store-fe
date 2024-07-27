import '../style/scss/style.scss';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../style/darkTheme';

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <main>
        <h1>BotStore - Frontend</h1>
      </main>
    </ThemeProvider>
  );
}
