import React from "react";
import CSS from './index.module.css';
import NavBar from '../../components/navBar'
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions";
import defaultIMG from "../../imagenes/defaultcreate.gif"

const Crear = () => {
    const dispatch = useDispatch()
    const tipos = useSelector((store) => store.tipos)

    let [input, setInput] = React.useState({
        nombre: "", 
        vida: 1,
        ataque: 1,
        defensa: 1,
        velocidad: 1,
        altura: 1,
        peso: 1,
        imagen: defaultIMG,
        tipo: []
    });

    let handleChange = (e) => {
        e.preventDefault();
        setInput({...input, [e.target.name]: e.target.value});
    };

    let buttonChange = (e) => {
        e.preventDefault();
        let aux = input.tipo;
        aux.includes(e.target.value) || aux.length === 2 ? 
        alert("No te copes con los tipos!") : 
        aux.push(e.target.value)
        setInput({...input, tipo: aux});
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        if(input.tipo.length < 1) {
            alert("Ponele algun tipo maestro")
        } else if (!input.nombre){
            alert("Ponele nombre jefe")
        } else if (!/^[A-Za-z\s]+$/.test(input.nombre)){
            alert("Fijate que se te escapo algo que no es una letra en el nombre")
        }
        else {
            const pokePost = await fetch("http://localhost:3001/pokemons", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });
            const listo = await pokePost.json()
            alert(listo.res)
            if(listo.res.includes("10")) {
                dispatch(getAllPokemons())
                setInput({nombre: "", vida: 1, ataque: 1, defensa: 1, velocidad: 1, altura: 1, peso: 1, tipo: []})
            }
            
        }
    };
    
    return (
        <>
            <NavBar/>
            <form action="POST" onSubmit={handleSubmit}>
                <h1>POKECREACION</h1>
                <div>
                    <label>Pokenombre</label>
                    <input type="text" placeholder="Mandale nombre jefe!" minLength={3} maxLength={20} name={"nombre"} value={input.nombre}  
                        onChange={(e) => handleChange(e)}      
                    />
              
                    <label>Pokevida</label>
                    <input type="range" placeholder="1-100" min={1} max={100} name={"vida"} value={input.vida}  
                        onChange={(e) => handleChange(e)}      
                    />
                
                    <label>Pokeataque</label>
                    <input type="range" placeholder="1-100" min={1} max={100} name={"ataque"} value={input.ataque}  
                        onChange={(e) => handleChange(e)}      
                    />
              
                    <label>Pokedefensa</label>
                    <input type="range" placeholder="1-100" min={1} max={100} name={"defensa"} value={input.defensa}  
                        onChange={(e) => handleChange(e)}      
                    />
             
                    <label>Pokevelocidad</label>
                    <input type="range" placeholder="1-100" min={1} max={100} name={"velocidad"} value={input.velocidad}  
                        onChange={(e) => handleChange(e)}      
                    />
        
                    <label>Pokealtura</label>
                    <input type="range" placeholder="1-100" min={1} max={100} name={"altura"} value={input.altura}  
                        onChange={(e) => handleChange(e)}      
                    />

                    <label>Pokepeso</label>
                    <input type="range" placeholder="1-100" min={1} max={100} name={"peso"} value={input.peso}  
                        onChange={(e) => handleChange(e)} 
                    />
                </div>
                <div>
                    {tipos.map((tipo) => {
                        return (
                            <button key={tipo.id} onClick={(e) => buttonChange(e)} value={tipo.id}>{tipo.nombre}</button>
                        )
                    })}
                </div>
                <input type={"submit"}/>
            </form>
        </>
    )
}

export default Crear;