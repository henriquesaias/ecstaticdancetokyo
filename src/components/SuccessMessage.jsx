import { useEffect, useState } from 'react'

export default function SubscribeMessage() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    setShowMessage(window.location.hash === '#subscribe_successful')

    const handleNavigation = () => {
      setShowMessage(window.location.hash === '#subscribe_successful')
    }

    window.addEventListener('popstate', handleNavigation) // back/forward buttons

    const pushState = window.history.pushState
    const replaceState = window.history.replaceState

    window.history.pushState = function (...args) {
      pushState.apply(this, args)
      handleNavigation()
    }

    window.history.replaceState = function (...args) {
      replaceState.apply(this, args)
      handleNavigation()
    }

    return () => {
      window.removeEventListener('popstate', handleNavigation)
      window.history.pushState = pushState
      window.history.replaceState = replaceState
    }
  }, [])

  if (!showMessage) return null

  return (
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
  )
}