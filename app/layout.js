import './globals.css';

export const metadata = {
  title: 'ThoughtShare',
  description: 'Share your thoughts about life and anything else.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
