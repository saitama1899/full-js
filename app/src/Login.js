import LoginForm from './components/LoginForm'
import { useUser } from './hooks/useUser'

const Login = () => {

  const { user, addUser, handleLogOut } = useUser()

  return (
    <>
    {
      user
        ? <>
            <div>
              <button onClick={handleLogOut}>Log out</button>
            </div>
          </>
        : <LoginForm addUser={addUser} />
    }  
    </>
  )
}

export default Login