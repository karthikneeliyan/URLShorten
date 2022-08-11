import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import { Dashboard } from "./components/dashboard";

export const urlDetailsContext = React.createContext<any>({ urls: [] });
const { Provider, Consumer } = urlDetailsContext;

function App() {
  const [urls, setUrls] = useState<any>([{}]);
  useEffect(() => {
    async function fetchurl() {
      const urls = await (await fetch("http://localhost:3333/api/all")).json();
      console.log(urls);
      setUrls(urls);
    }
    fetchurl();
  }, []);
  return (
    <Provider value={{ urls: urls, setUrls: setUrls }}>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
