const { Router } = require('express');
const fetch = require('node-fetch');
const {Pokemon, Type} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res) => {
    let poketipos = (await fetch ('https://pokeapi.co/api/v2/type/')
                            .then((poketipos) => poketipos.json()))
    poketipos.results.map((poketipo) => Type.create({ nombre: poketipo.name }))
    res.status(200).send("")
});

router.get('/pokemons', async (req, res) => {
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
        res.status(200).json(pokeapi);
    });
});


router.post('/pokemons', async (req, res) => {
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
});

module.exports = router;


