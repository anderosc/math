import  { useState } from 'react'
import "./signup.css"
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'

const SignUp = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [username, setUsername] = useState('');
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password, username)
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main>
                <div className="mainsignup">
                        <div >
                            <h3>Create a New Account</h3>
                        </div>


                    <form
                        onSubmit={onSubmit}
                        className="space-y-4"
                    >   
                        <div>
                            <label>Username</label> <br />
                            <input
                                type="text"
                                required
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>
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
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>

                        <div>
                            <label >
                                Confirm Password
                            </label> <br />
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button> <br /> <br />
                        <div className="text-sm text-center">
                            Already have an account? {'   '}
                            <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default SignUp