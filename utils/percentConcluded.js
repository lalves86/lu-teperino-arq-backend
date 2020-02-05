module.exports = {
  calculate(etapas) {

      let etapasTotais = 0;
      let etapasConcluidas = 0;

      etapas.map(item => {
        etapasTotais++;

        if(item.checked) {
          etapasConcluidas++;
        }

      });   
    
    return etapasConcluido = (etapasConcluidas/etapasTotais)*100;
  }
}  
