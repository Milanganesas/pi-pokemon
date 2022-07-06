const { Router } = require('express');
const fetch = require('node-fetch');
const {Pokemon, Tipo} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res) => {
    const pokeDatos = await fetch('https://pokeapi.co/api/v2/type');
    const pokeTipos = await pokeDatos.json();
    for( pTipo of pokeTipos.results ) {
        const existe = await Tipo.findOne({where: { nombre: pTipo.name }})
        if(existe) return res.json(await Tipo.findAll())
        await Tipo.create({ nombre: pTipo.name})
    }
    res.json(await Tipo.findAll());
})

router.get('/pokemons/:id', async (req, res) => {
    try {
        const { id } = req.params
        if(id.length > 3) {
            let pokeDatos = await Pokemon.findOne({ where: { id: id }, include: Tipo});
            const pokeTipo = pokeDatos.tipos.map((tipo) => tipo.nombre)
            const {nombre, vida, ataque, defensa, velocidad, altura, peso, imagen} = pokeDatos;
            res.status(200).send({
                nombre,
                vida,
                ataque,
                defensa,
                velocidad,
                altura,
                peso,
                imagen,
                pokeTipo
            })
        } else {
            const pokeID = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((pokemon) => pokemon.json())
            .then((pokedatos) => {return {
                nombre: pokedatos.name,
                vida: pokedatos.stats[0].base_stat,
                ataque: pokedatos.stats[1].base_stat,
                defensa: pokedatos.stats[2].base_stat,
                velocidad: pokedatos.stats[5].base_stat,
                altura: pokedatos.height,
                peso: pokedatos.weight,
                tipos: pokedatos.types.map((tipo) => tipo.type.name),
                imagen: pokedatos.sprites.other["official-artwork"].front_default
                }
            })
            res.status(200).send(pokeID);
        }
    } catch (error) {
        res.status(400).send('No maestro no existe ese ID en ningun lado!');
    }
})

router.get('/pokemons', async (req, res) => {
    const pokeNombre = req.query.name
    try {
    if(pokeNombre){
        let pokeDatos = await Pokemon.findOne({ where: { nombre: pokeNombre.toUpperCase() }, include: Tipo});
        if(!pokeDatos) {
            const pokeBusqueda = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeNombre.toLowerCase()}`)
            .then((pokemon) => pokemon.json())
            .then((pokedatos) => {return {
                id: pokedatos.id,
                nombre: pokedatos.name,
                vida: pokedatos.stats[0].base_stat,
                ataque: pokedatos.stats[1].base_stat,
                defensa: pokedatos.stats[2].base_stat,
                velocidad: pokedatos.stats[5].base_stat,
                altura: pokedatos.height,
                peso: pokedatos.weight,
                tipos: pokedatos.types.map((tipo) => tipo.type.name),
                imagen: pokedatos.sprites.other["official-artwork"].front_default
                }
            })
            res.status(200).send(pokeBusqueda);
        } else {
            const pokeTipo = pokeDatos.Tipos.map((tipo) => tipo.nombre)
            const {id, nombre, vida, ataque, defensa, velocidad, altura, peso} = pokeDatos;
            res.status(200).send({
                id,
                nombre,
                vida,
                ataque,
                defensa,
                velocidad,
                altura,
                peso,
                pokeTipo
            })
        }
    } else {
        let pokemones = [];
        for(let i = 1; i <= 200; i++) {
            pokemones.push(fetch (`https://pokeapi.co/api/v2/pokemon/${i}`)) 
        };

        const db = await Pokemon.findAll({ include: [{
            model: Tipo,
            through: { attributes: [] },
            attributes: ["nombre"]
        }],
        attributes: ["id", "nombre", "vida", "ataque", "defensa", "velocidad", "altura", "peso", "imagen"]
        })

        Promise.all(pokemones)
        .then((pokeinfo) => Promise.all(pokeinfo.map(pi => pi.json())))
        .then(pokedatos => {
            let pokeapi = pokedatos.map(pd => {return { // concatenar db
                id: pd.id,
                nombre: pd.name, 
                vida: pd.stats[0].base_stat,
                ataque: pd.stats[1].base_stat,
                defensa: pd.stats[2].base_stat,
                velocidad: pd.stats[5].base_stat,
                altura: pd.height,
                peso: pd.weight,
                imagen: pd.sprites.other["official-artwork"].front_default,
                tipos: pd.types.map((tipo) => tipo.type.name)}
            });
        
        res.status(200).send([...db, ...pokeapi]);
        });
    }
    } catch (error) {
        res.status(400).send('El nombre no esta en ningun lado amigo.');
    }
});

router.post('/pokemons', async (req, res) => {
  try {
    const {nombre, vida, ataque, defensa, velocidad, altura, peso, imagen, tipo} = req.body;
    
    const [instance, pokeCreado] = await Pokemon.findOrCreate({
        where: { nombre: nombre.toUpperCase() },
        defaults: {
        nombre,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        imagen,
        }
        });
    if(pokeCreado){
        await instance.addTipos(tipo)
        res.json({res: `Se creo todo de 10! Tu pokeID es: ${instance.id}`})
    } else {
        res.json({res: 'Te ganaron el nombre, cambialo!'})
    };
  } catch (error) {
      res.status(400).send(error)
  }
});

module.exports = router;