import React from "react";
import c from './index.module.css';
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

    let borrar = (e) => {
        e.preventDefault();
        let borrado = input.tipo;
        let value = e.target.value
        setInput({...input, tipo: borrado.filter((tipo) => tipo !== value.toString())})
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

    let pokeTipos = [];

    tipos.length ? tipos.map((tipo) => tipo.id.toString() === input.tipo[0] ? pokeTipos.push(tipo) : tipo.id.toString() === input.tipo[1] ? pokeTipos.push(tipo) : console.log("Ninguno")) : console.log("Cargando")

    const colorTipo = {
        default: "#2864b4",
        steel: "#565554", 
        dark: "#000000",
        shadow: "#511730",
        bug: "#26de81",
        dragon: "#ffeaa7",
        electric: "#fed330",
        fairy: "#FF0069",
        fighting: "#30336b",
        fire: "#f0932b",
        flying: "#81ecec",
        grass: "#00b894",
        ground: "#EFB549",
        ghost: "#a55eea",
        ice: "#74b9ff",
        normal: "#95afc0",
        poison: "#6c5ce7",
        psychic: "#a29bfe",
        rock: "#B5BD89",
        water: "#0190FF",
        unknown: "#CC5E5E"
      };
      
    let colorEstilo;
    input.tipo.length ? colorEstilo = colorTipo[pokeTipos[0].nombre] : colorEstilo = colorTipo.default

    return (
        <>
            <NavBar/>
            <form action="POST" onSubmit={handleSubmit} className={c.form} >
                <div className={c.todo} style={{background: `radial-gradient(circle at 50% -170%, ${colorEstilo} 85%, #ffffff 36%)`}}>
                    <h1 className={c.titulo}>POKECREACIÓN</h1>

                    <div className={c.nombre}>
                        <label>Pokenombre</label>
                        <input className={c.input} type="text" placeholder="Mandale nombre jefe!" minLength={3} maxLength={20} name={"nombre"} value={input.nombre}  
                            onChange={(e) => handleChange(e)}/>
                    </div>

                    <div className={c.container}>
                            <div className={c.estadisticas}>
                                <label className={c.color}>Pokevida</label>
                                <input type="range" placeholder="1-100" min={1} max={300} name={"vida"} value={input.vida} onChange={(e) => handleChange(e)} className={c.barra}/>
                                <span className={(c.rango, c.cambio)}>{input.vida}</span>
                            </div>
                            <div className={c.estadisticas}>
                                <label className={c.color}>Pokeataque</label>
                                <input type="range" placeholder="1-100" min={1} max={200} name={"ataque"} value={input.ataque} onChange={(e) => handleChange(e)} className={c.barra}/>
                                <span className={(c.rango, c.cambio)}>{input.ataque}</span>
                            </div>

                            <div className={c.estadisticas}>
                                <label className={c.color}>Pokedefensa</label>
                                <input type="range" placeholder="1-100" min={1} max={300} name={"defensa"} value={input.defensa} onChange={(e) => handleChange(e)} className={c.barra}/>
                                <span className={(c.rango, c.cambio)}>{input.defensa}</span>
                            </div>

                            <div className={c.estadisticas}>
                                <label className={c.color}>Pokevelocidad</label>
                                <input type="range" placeholder="1-100" min={1} max={300} name={"velocidad"} value={input.velocidad} onChange={(e) => handleChange(e)} className={c.barra}/>
                                <span className={(c.rango, c.cambio)}>{input.velocidad}</span>
                            </div>
                
                            <div className={c.estadisticas}>
                                <label className={c.color}>Pokealtura</label>
                                <input type="range" placeholder="1-100" min={1} max={100} name={"altura"} value={input.altura} onChange={(e) => handleChange(e)} className={c.barra}/>
                                <span className={(c.rango, c.cambio)}>{input.altura / 10} m</span>
                            </div>

                            <div className={c.estadisticas}>
                                <label className={c.color}>Pokepeso</label>
                                <input type="range" placeholder="1-100" min={1} max={1000} name={"peso"} value={input.peso} onChange={(e) => handleChange(e)} className={c.barra}/>
                                <span className={(c.rango, c.cambio)}>{input.peso / 10} kg</span>
                            </div>
                    </div>
                    <div className={c.botones}>
                        {tipos.map((tipo) => {
                            return (
                                <button className={c.boton} key={tipo.id} onClick={(e) => buttonChange(e)} value={tipo.id}>{tipo.nombre.charAt(0).toUpperCase() + tipo.nombre.slice(1)}</button>
                            )
                        })}
                    </div>
                    <div className={c.tipos}>
                        {input.tipo.length ? 
                        pokeTipos.map((tipo) => {return <div className={c.seleccionados} key={tipo.id}><button className={c.borrar} onClick={(e) => borrar(e)} value={tipo.id}>X {tipo.nombre.charAt(0).toUpperCase() + tipo.nombre.slice(1)}</button></div>}) : 
                        <div><span>Sin tipo!</span></div>}
                    </div>
                    <input className={c.subir} type={"submit"}/>
                </div>
            </form>
        </>
    )
}

export default Crear;