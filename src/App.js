import { useState, useEffect } from "react"
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import { Provider } from "./components/ui/provider"
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/index'
import OnlineCommunity from "./pages/online-community"
import Support from "./pages/support"

function App() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (window.location.hash === '#subscribe_successful') {
      setShowMessage(true)
    } else {
      setShowMessage(false)
    }
  }, [window.location.hash])

  return (
    <Router>
      <Provider>

        <Nav />

        <Container mx="auto" maxW={800} minH='100vh' pb={8}>
          {showMessage && (
            <div
              style={{
                color: '#d4edda',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '6px',
                margin: '2rem auto',
                maxWidth: '600px'
              }}
            >
              ご登録ありがとうございます！🎉<br />
              ご入力いただいたメールアドレスに、今後の手順や参加情報を送信しました。
              メールをご確認ください。
            </div>
          )}
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
