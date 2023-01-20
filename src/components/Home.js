import React, { useState } from "react";

import appFirebase from "../credenciales"
import{getAuth, signOut} from 'firebase/auth'
import{getFirestore, collection, addDoc, getDocs,doc,deleteDoc, getDoc, setDoc} from 'firebase/firestore'



const auth = getAuth(appFirebase)
const db = getFirestore(appFirebase)
const Home = ({correoUsuario}) => {


    const valorInicial ={
        cedula: '',
        nombre: '',
        ciudad: '',
        direccion: '',
        incidente: ''
    }

    const [user, setUser]= useState(valorInicial)

    const capturarInputs = (e) =>{
        const {name,value} = e.target;
        setUser({...user,[name]:value})
    }

    const guardarDatos = async(e)=>{
        e.preventDefault();
        console.log(user)
        try {
            await addDoc(collection(db,'usuarios'), {
                ...user
            })
        } catch (error) {
            console.log(error)
        }
        setUser({...valorInicial})
    }
    return(
        <div className="container">
         <p>Bienvenido, <strong>{correoUsuario}</strong> Haz iniciado sesión</p>
            <button className="btn btn-primary" onClick ={()=>signOut(auth)}>
                Cerrar sesión
            </button>

            <hr/>


            <div className = 'row'>
                <div className = "col-md-4" >
                    <h3 className='text-center mb-3'>Ingresar usuarios</h3>
                    <form onSubmit={guardarDatos}>
                        <div className="card card-body">
                            <div className="form-group">
                                <input type="text" name= 'cedula' className= 'form-control mb-3' placeholder = 'Ingrese su cédula'
                                onChange={capturarInputs} value={user.cedula}/>
                                <input type="text" name= 'nombre' className= 'form-control mb-3' placeholder = 'Ingrese su nombre completo'
                                onChange={capturarInputs} value={user.nombre}/>
                                 <input type="text" name= 'ciudad' className= 'form-control mb-3' placeholder = 'Ingrese la ciudad del incidente'
                                onChange={capturarInputs} value={user.ciudad}/>
                                <input type="text" name= 'direccion' className= 'form-control mb-3' placeholder = 'Ingresa la direccion del incidente'
                                onChange={capturarInputs} value={user.direccion}/>
                                <textarea  name= 'incidente' className= 'form-control mb-3' placeholder = 'Describa el incidente'
                                onChange={capturarInputs} value={user.incidente}/>
                            </div>
                            <button className="btn btn-primary">
                                Guardar
                            </button>
                        </div>
                    </form>

                </div>
                <div className="col-md-8">
                    <h2 className='text-center mb-5'>Lista de usuarios</h2>

                </div>
              
            </div>

        </div>
    )
}




export default Home