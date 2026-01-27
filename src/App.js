import { useEffect } from "react"
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import { Provider } from "./components/ui/provider"
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/index'
import OnlineCommunity from "./pages/online-community"
import Support from "./pages/support"

function App() {
  useEffect(() => {
    if (window.location.hash === "#subscribe_successful") {
      console.log("Add a success message");
    }
  }, [window.location.hash]);

  return (
    <Router>
      <Provider>

        <Nav />

        <Container mx="auto" maxW={800} minH='100vh' pb={8}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/online-community" element={<OnlineCommunity />} />
            <Route path="/support" element={<Support />} />
          </Routes>

          <Footer />

        </Container>
      </Provider >
    </Router>
  );
}

export default App;
