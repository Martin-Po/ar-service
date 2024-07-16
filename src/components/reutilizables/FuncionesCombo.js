const TotalCombo = ({ combo, monedasList }) => {
    const ANS = [{moneda: {name: ''}, precio:0}]


    monedasList.forEach((moneda, index) => {
    let aux = 0
    combo.productos.forEach(producto => {
            if(producto.moneda.id === moneda.id)
                {
                    aux += producto.precio
                }
            
        });
        if(aux !== 0)
            {ANS[index] = {moneda: moneda, precio: aux}}
    });

    return ANS    
       
}

const TotalComboString = ({ combo, monedasList }) => {
    const ANS = [{moneda: {name: ''}, precio:0}]

    console.log(combo);
    console.log(monedasList);
    monedasList.forEach((moneda, index) => {
    let aux = 0
    combo.productos.forEach(producto => {
        console.log(producto);
        console.log(moneda.id);
            if((producto.moneda.id === moneda.id)||(producto.moneda === moneda.id))
                {
                    console.log(producto.precio);
                    aux += producto.precio
                }
            
        });
        if(aux !== 0)
            {ANS[index] = {moneda: moneda, precio: aux}}
    });

    return ANS.map(precio=>  ( precio.moneda.name + ' ' + precio.precio)).join(' + ')    
       
}

export {TotalCombo, TotalComboString}