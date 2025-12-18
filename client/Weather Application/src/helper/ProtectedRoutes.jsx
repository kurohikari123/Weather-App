import {Navigate} from 'react-router-dom'
import {useAuth} from './AuthContext.jsx'

export default function ProtectedRoute({children}){
  const {token,loading} = useAuth()

  if(loading) return <div>Loading...</div>

  //Check if the token exist if it does not exist send then back to the login screen
  if(!token){
    return <Navigate to='/' replace />
  }

  return children
}
