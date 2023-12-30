import { ReactNode } from 'react';
import { ReactQueryProvider } from './react-query-provider';

interface LayoutProps {
  children?: ReactNode
}

 
export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
