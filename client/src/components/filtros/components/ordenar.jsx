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
          };
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
            };
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
          };
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
          };
          case "DASC": {
            return pokearray.sort((a, b) => {
                if (a.defensa < b.defensa) {
                  return 1;
                }
                if (a.defensa > b.defensa) {
                  return -1;
                }
                return 0;
              });
          };
          case "DDSC": {
            return pokearray.sort((a, b) => {
                if (a.defensa > b.defensa) {
                  return 1;
                }
                if (a.defensa < b.defensa) {
                  return -1;
                }
                return 0;
              });
          };
          case "VASC": {
            return pokearray.sort((a, b) => {
                if (a.velocidad < b.velocidad) {
                  return 1;
                }
                if (a.velocidad > b.velocidad) {
                  return -1;
                }
                return 0;
              });
          };
          case "VDSC": {
            return pokearray.sort((a, b) => {
                if (a.velocidad > b.velocidad) {
                  return 1;
                }
                if (a.velocidad < b.velocidad) {
                  return -1;
                }
                return 0;
              });
          };
          case "ALASC": {
            return pokearray.sort((a, b) => {
                if (a.altura < b.altura) {
                  return 1;
                }
                if (a.altura > b.altura) {
                  return -1;
                }
                return 0;
              });
          };
          case "ALDSC": {
            return pokearray.sort((a, b) => {
                if (a.altura > b.altura) {
                  return 1;
                }
                if (a.altura < b.altura) {
                  return -1;
                }
                return 0;
              });
          };
          case "PASC": {
            return pokearray.sort((a, b) => {
                if (a.peso < b.peso) {
                  return 1;
                }
                if (a.peso > b.peso) {
                  return -1;
                }
                return 0;
              });
          };
          case "PDSC": {
            return pokearray.sort((a, b) => {
                if (a.peso > b.peso) {
                  return 1;
                }
                if (a.peso < b.peso) {
                  return -1;
                }
                return 0;
              });
          };
          case "PREDEFINIDO": {
            return array
          }
          default: {
              return array
          }
      }
  }