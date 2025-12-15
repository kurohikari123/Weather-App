//define the context for user login and verification by setting the token
import {createContext, useContext, useState, useEffect}  from 'react'

const AuthContext = createContext()

export function AuthProvider({children}){

  const [token,setToken] = useState(null)// State triggers a render
  
  //load the token from local storage if set
  useEffect(()=>{
    const saved = localStorage.getItem("token")
    if(saved) setToken(saved)//by doing this the site re renders and thus keeps the user logged in
  },[])
  
  //set the token and store it on login
  const login = (newToken)=>{
    setToken(newToken)
    localStorage.setItem("token",newToken)
  }
  
  //remove the token and delete from storage when logout
  const logout = ()=>{
    setToken(null)
    localStorage.removeItem("token")
  }

  //also need to wrap the children by the AuthContext and return it
  return(
      <AuthContext.Provider value={{token,login,logout}}>
          {children}
      </AuthContext.Provider>
  )
}

//creates a custom hook that will be easy to use instead of writing the entire return statement
export function useAuth(){
    return useContext(AuthContext)
  }
