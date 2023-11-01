import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:8000/api/")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
}

export default App;
