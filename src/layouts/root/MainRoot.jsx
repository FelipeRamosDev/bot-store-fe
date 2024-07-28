import RootProvider from "@/providers/RootProvider";

export default function RootLayout({ children }) {
   return <html lang="en">
      <body>
         <main>
            <RootProvider>
               {children}
            </RootProvider>
         </main>
      </body>
   </html>;
}
