import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Routers from './routers/Routers';
function App() {
  return (
    <>
    <Header />
    <main>
      <Routers />
    </main>
    <Footer />
    </>
  );
}

export default App;
