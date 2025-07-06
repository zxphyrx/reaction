import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Channel from "./pages/Channel";
import About from "./pages/About"
import Alert from "./components/Alert";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channel" element={
          <>
            <Alert title="Error">
              No channel specified. Try <a href="/channel/0">channel 0</a>
            </Alert>
          </>
        }>
        </Route>
        <Route path="/channel/:channelId" element={<Channel />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App;