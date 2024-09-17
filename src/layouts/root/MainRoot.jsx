import RootProvider from "@/providers/RootProvider";

export default function RootLayout({ children }) {
   return <html lang="en">
      <body>
         <RootProvider>
            {children}
         </RootProvider>
      </body>
   </html>;
}