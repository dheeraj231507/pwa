"use client";

import StyledComponentsRegistry from "./registery";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Swreg from "./components/Swreg";

// export const metadata = {
//     title: "Oneup",
//     description: "A project using the app directory.",
// };

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta
          title="Oneup"
          aria-description="A project using the app directory."
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="CodeUp" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/images/icon-192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="384x384"
          href="/images/icon-384.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/images/icon-512.png"
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="CodeUp" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/images/icon-192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="384x384"
          href="/images/icon-384.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/images/icon-512.png"
        />
      </head>
      <body>
        <SessionProvider>
          <Swreg />
          <StyledComponentsRegistry>
            <script
              src="https://accounts.google.com/gsi/client"
              async
              defer
            ></script>
            {children}
          </StyledComponentsRegistry>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
