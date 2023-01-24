import React, { useEffect, useState } from "react";

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

    const [lista, setLista] = useState([])
    const [subId, setSubId] = useState('')

    const capturarInputs = (e) =>{
        const {name,value} = e.target;
        setUser({...user,[name]:value})
    }

    const guardarDatos = async(e)=>{
        e.preventDefault();
        if (subId === ''){
            try {
                await addDoc(collection(db,'usuarios'), {
                    ...user
                })
                getLista()
            } catch (error) {
                console.log(error)
            }
        } 
        else{
            await setDoc(doc(db, "usuarios", subId),{
                ...user
            })
            getLista()
        } 
        
        setUser({...valorInicial})
        setSubId('')
    }

    //funcion para renderizar la lista de usuarios

    useEffect(()=>{
        
        if (lista.length === 0){
            getLista()
        }


    },[lista])


    const getLista = async()=>{
        try {
            const querySnapshot = await getDocs(collection(db,'usuarios'))
            const docs = []
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id})
            })
            console.log('recuperadatos')
            setLista(docs)
            
            
        } catch (error) {
            console.log(error)
            
        }

        
    }


    // funcion para eliminar usuarios

    const deleteUser = async(id) =>{
        await deleteDoc(doc(db, "usuarios", id))
    }

    const getOne = async(id)=>{
        try {
            const docRef = doc(db, "usuarios", id)
            const docSnap = await getDoc(docRef)
            setUser(docSnap.data())
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{
        if(subId !== ''){
            getOne(subId)
        }

    },[subId])


  

    return(
        <div className="container" >
         <p>Bienvenido, <strong>{correoUsuario}</strong> Haz iniciado sesión</p>
            <button className="btn btn-primary" onClick ={()=>signOut(auth)}>
                Cerrar sesión
            </button>

            <hr className="linea"/>


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
                               {subId === '' ? 'Guardar':'Actualizar'}
                            </button>
                        </div>
                    </form>

                </div>
                <div className="col-md-8">
                    <h2 className='text-center mb-5'>Lista de usuarios</h2>
                    <div className='container card'>
                        <div className= 'card-body'>
                            {
                                lista.map(list =>(
                                    <div key={list.id}>
                                        <p>Cedula: {list.cedula}</p>
                                        <p>Nombre: {list.nombre}</p>
                                        <p>Ciudad: {list.ciudad}</p>
                                        <p>Direccion: {list.direccion}</p>
                                        <p>Incidente: {list.incidente}</p>


                                        <button className="btn btn-danger" onClick={()=>deleteUser(list.id)}>
                                            Eliminar
                                        </button>
                                        <button className="btn btn-success m-1" onClick={()=>setSubId(list.id)}>
                                            Actualizar
                                        </button>
                                        <hr />


                                    </div>
                                ))
                            }

                        </div>
                    </div>

                </div>
              
            </div>

        </div>
    )
}




export default Home