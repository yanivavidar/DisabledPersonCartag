// App.js
import React from "react";
import DataFetcher from "./DataFetcher";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1>בדיקת תג נכה לרכב</h1>
      <h4>נוצר על ידי יניב אבידר</h4>
      <a href="https://yanivavidar-engineer.netlify.app/#home">האתר של יניב</a>
      <ErrorBoundary>
        <DataFetcher />
      </ErrorBoundary>
    </div>
  );
};

// Wrap App in React.memo for potential performance optimization
export default React.memo(App);
