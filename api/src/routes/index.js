const { Router } = require('express');
const fetch = require('node-fetch');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

let pokefiltro = (pokeinfo, pokearray) => {
    let {name, height, weight, sprites, stats, types} = pokeinfo
    pokearray.push({
        nombre: name,
        vida: stats[0].base_stat,
        ataque: stats[1].base_stat,
        defensa: stats[2].base_stat,
        velocidad: stats[5].base_stat,
        altura: height,
        peso: weight,
        imagen: sprites.other["official-artwork"].front_default,
        tipo: types.map((poketype) => poketype.type.name)
    })
}

router.get('/pokemons', async (req, res) => {
    let pokemones = [];
    for(let i = 1; i <= 40; i++) {
        let pokedatos = await fetch (`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(pokedata => pokedata.json())
        await pokefiltro(pokedatos, pokemones)
    }
    res.status(200).send(pokemones)
})


module.exports = router;


