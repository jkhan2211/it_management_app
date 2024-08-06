import './globals.css';

export const metadata = {
  title: 'Inventory App',
  description: 'An example inventory app built with Next.js',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
