const { Router } = require('express');
const fetch = require('node-fetch');
const {Pokemon, Type} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res) => {
    try {
        let poketipos = (await fetch ('https://pokeapi.co/api/v2/type/')
        .then((poketipos) => poketipos.json()))
        poketipos.results.map((poketipo) => Type.create({ nombre: poketipo.name }))
        res.status(200).send("Esta todo ok master")
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/pokemons/:id', async (req, res) => {
    try {
        const id = req.params.id
        if(id.length < 3) {
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
        } else {
            let pokeDatos = await Pokemon.findOne({ where: { id: id }, include: Type});
            const pokeTipo = pokeDatos.types.map((tipo) => tipo.nombre)
            const {nombre, vida, ataque, defensa, velocidad, altura, peso} = pokeDatos;
            res.status(200).send({
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
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/pokemons', async (req, res) => {
    try {
    const pokeNombre = req.query.name
    if(!pokeNombre){
        let pokemones = [];
        for(let i = 1; i <= 40; i++) {
            pokemones.push(fetch (`https://pokeapi.co/api/v2/pokemon/${i}`)) 
        };
        Promise.all(pokemones)
        .then((pokeinfo) => Promise.all(pokeinfo.map(pi => pi.json())))
        .then(pokedatos => {
            let pokeapi = pokedatos.map(pd => {return {
                nombre: pd.name, 
                imagen: pd.sprites.other["official-artwork"].front_default, 
                tipos: pd.types.map((tipo) => tipo.type.name)}
            });
            res.status(200).send(pokeapi);
        });
    } else {
        const pokeBusqueda = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeNombre}`)
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
            res.status(200).send(pokeBusqueda);
    }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/pokemons', async (req, res) => {
  try {
    const {nombre, vida, ataque, defensa, velocidad, altura, peso, tipo} = req.body;
    
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
        }
        });
    if(pokeCreado){
        await instance.addTypes(tipo)
        res.status(200).send(`Se creo todo de 10! Tu pokeID es: ${instance.id}`)
    } else {
        res.status(400).send('Te ganaron el nombre, cambialo!')
    };
  } catch (error) {
      res.status(400).send(error)
  }
});

module.exports = router;


