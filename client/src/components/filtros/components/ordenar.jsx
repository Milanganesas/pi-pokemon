export const ordenar = (array, filtro) => {
    let pokearray = [...array]
    switch (filtro) {
        case "ASC": {
            return  pokearray.sort((a, b) => {
              if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                return 1;
              }
              else if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                return -1;
              } else {
                return 0;
              }
                });
          }
          case "DSC": {
              return pokearray.sort((a, b) => {
                if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                  return 1;
                }
                else if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                  return -1;
                } else {
                  return 0;
                }
                  });
            }
          case "AASC": {
            return pokearray.sort((a, b) => {
                if (a.ataque < b.ataque) {
                  return 1;
                }
                if (a.ataque > b.ataque) {
                  return -1;
                }
                return 0;
              });
          }
          case "ADSC": {
            return pokearray.sort((a, b) => {
                if (a.ataque > b.ataque) {
                  return 1;
                }
                if (a.ataque < b.ataque) {
                  return -1;
                }
                return 0;
              });
          }
          case "PREDEFINIDO": {
            return array
          }
          default: {
              return array
          }
      }
  }