import { Navigate, Link } from 'react-router-dom'
import "./login.css"
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth'
import { useAuth } from '../contexts/authContext'
import { useState } from 'react'

function Login() {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
            // doSendEmailVerification()
        }
    }

   

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main >
                <div className='loginmain' >
                    <div>
                            <h3 >Welcome Back</h3>
                    </div>
                    <form
                        onSubmit={onSubmit}
                    >
                        <div>
                            <label >
                                Email
                            </label> <br />
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>


                        <div>
                            <label >
                                Password
                            </label> <br />
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>

                        {errorMessage && (
                            <span >{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                        <br /> <br />
                    <p className="">Dont have an account? <Link to={'/signup'} className="hover:underline font-bold">Sign up</Link></p>

                </div>
            </main>
        </div>
    )
}

export default Login