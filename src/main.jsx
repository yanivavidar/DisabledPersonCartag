import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Check if the service worker is supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Error registering Service Worker:", error);
      });
  });
}

// Render the App component
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The following can be used for production builds to improve performance
// if (process.env.NODE_ENV === 'production') {
//   // ReactDOM.createRoot(document.getElementById('root')).render(<App />);
// }
