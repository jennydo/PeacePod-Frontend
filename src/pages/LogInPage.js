import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useSpotifyContext } from "../hooks/useSpotifyContext"

const LogInPage = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useAuthContext()
  const { dispatch: spotifyDispatch } = useSpotifyContext()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:4000/api/users/logIn', {
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    })

    const json = await response.json()

    if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: "LOGIN", payload: json})
      // if (json.user.spotifyCode !== '') {
      //   // localStorage.setItem('spotifyCode', JSON.stringify(json.user.spotifyCode))
      //   spotifyDispatch({type: 'SET_SPOTIFY_CODE', payload: json.user.spotifyCode})
      // }
      setIsLoading(false)
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>username address:</label>
      <input 
        type="username" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default LogInPage