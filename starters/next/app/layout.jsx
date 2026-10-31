import 'dawn-and-dusk/styles.css';
import { ThemeScript } from 'dawn-and-dusk/theme';

export const metadata = { title: 'My dawn & dusk app' };
export default function RootLayout({ children }) {
  return <html lang="en" suppressHydrationWarning><head><ThemeScript /></head><body>{children}</body></html>;
}
