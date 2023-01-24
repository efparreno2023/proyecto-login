import React, { useState } from 'react'
import Uno from '../images/1.png'
import Dos from '../images/2.jpg'
import Tres from '../images/3.png'
import Cuatro from '../images/4.png'
import Cinco from '../images/5.png'



import appFirebase from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(appFirebase)

const Login = () => {
    const [registro, setRegistro] = useState(false)

    const hadlerSubmit = async (e) => {
        e.preventDefault()
        const correo = e.target.email.value;
        const contraseña = e.target.contraseña.value;
        // nuevo prueba
        if (registro) {
            await createUserWithEmailAndPassword(auth, correo, contraseña)
        }
        else {
            await signInWithEmailAndPassword(auth, correo, contraseña)
        }



    }

    return (
        <div className='principal'>
            <div className="row container p-4">
                <div className="col-md-8">
                    <div id="carouselExample" className="carousel slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={Dos} alt="" className="tamaño-imagen" />
                            </div>
                            <div className="carousel-item">
                                <img src={Cuatro} alt="" className="tamaño-imagen" />
                            </div>
                            <div className="carousel-item">
                                <img src={Cinco} alt="" className="tamaño-imagen" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>


                <div className="col-md-4">
                    <div className="mt-5 ms-5">
                        <h1>{registro ? 'Registrate' : 'Iniciar sesion'}</h1>
                        <form onSubmit={hadlerSubmit}>
                            <div className='mb-3'>
                                <label className='form-label'>Correo electronico: </label>
                                <input type="email" className='form-control' placeholder='Ingresar email' id='email' required />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Contraseña: </label>
                                <input type="password" className='form-control' placeholder='Ingresa la contraseña' id='contraseña' required />
                            </div>
                            <button className='btn btn-primary' type='submit'>
                                {registro ? 'Registrate' : 'Iniciar sesion'}
                            </button>
                        </form>
                        <div className='form-group'>
                            <button className='btn btn-secondary mt-4 form-control' onClick={() => setRegistro(!registro)}>
                                {registro ? '¿Ya tienes una cuenta? Inicia sesion' : '¿No tienes una cuenta? Registrate'}
                            </button>


                        </div>

                    </div>


                </div>
            </div>

        </div>



    )

}


export default Login
