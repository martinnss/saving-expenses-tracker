function verifySaleOriginBancodeChile (fullText){
    // Step 2: Identify the start and end indices of the table
    const startIndex = fullText.indexOf('TOTAL PAT A LA CUENTA   0 $ C');
    const endIndex = fullText.indexOf('TOTAL TRANSACCIONES EN CUOTAS   ');

    // Step 3: Extract the table using substring
    const tableText = fullText.substring(startIndex, endIndex);

    

    // Step 4: Define a regular expression to find dates in the format 00/00/0000
    const regex = /\b\d{2}\/\d{2}\/\d{2}\b/g;

    // Step 5: Find all dates in the string
    const fechas = tableText.match(regex);
    
    // Step 6: Split the string into sublists using dates as delimiters
    const sublistas = tableText.split(regex);
    
    // Step 7: Combine dates with corresponding sublists
    const stringList = sublistas.map((sublista, index) => {
        const indexModifed = index - 1
        return fechas[indexModifed] + ' ' + sublista.trim();
    });
    
    // Paso 1: Eliminar el texto específico del elemento 0
    let elemento0 = stringList[0];
    elemento0 = elemento0.replace('undefined TOTAL PAT A LA CUENTA', '');

    // Paso 2: Eliminar números y signos de peso del elemento 0
    elemento0 = elemento0.replace(/[0-9$]/g, '');

    // Paso 3: Hacer append del elemento 0 al final del elemento 1
    let elemento1 = stringList[1];
    elemento1 += elemento0;

    // Paso 4: Eliminar el elemento 0 y asignar el resultado al índice 0
    stringList.splice(0, 1);  // Elimina el elemento 0
    stringList[0] = elemento1;

    console.log(stringList)




    //////////////////////////////////////////////////////
    // no se hará diferencia en deferred payment


    

    const resultado = [];

    stringList.forEach((string) => {
        const stringCleanOne = string.replace(/\$ /g, '$');
        const stringCleanTwo = stringCleanOne.replace(/\s*\*\s*/g, '*');
        const isDeferredPayment = / \d{2}\/\d{2} /.test(stringCleanTwo);

        if (isDeferredPayment){
        const listOfStrings = verifySaleOriginDeferredSantander(stringCleanTwo)


        const [fecha, lugarOperacion, monto, desc1, preciocuota, numCuota, desc2] = listOfStrings

        const [day, month, year] = fecha.split('/');

        let actualYear=parseInt(year)
        if (year <100){
            actualYear= actualYear+2000
        } 
        // Create a new Date object using the components
        const dateObject = new Date(`${actualYear}-${month}-${day}`);

        const montoTotal = convertCurrencyStringToInt(monto)
        const valorCuota = convertCurrencyStringToInt(preciocuota)
        

        const description = desc2

        let desc = description

        if(description.length >=20){
            desc = description.substring(0, 50);
        } 

        const objetoJson = {
            dateObject,
            lugarOperacion:"Pago en Cuotas",
            montoTotal,
            desc,
            valorCuota,
            numCuota,
        } 
        
        
        resultado.push(objetoJson);

        } else {
        const listOfStrings=verifySaleOriginSantander(stringCleanTwo)

        if(listOfStrings.length ===4) {
            const [fecha, lugarOperacion, monto, description] = listOfStrings;

            const [day, month, year] = fecha.split('/');

            let actualYear=parseInt(year)
            if (year <100){
            actualYear= actualYear+2000
            } 
            // Create a new Date object using the components
            const dateObject = new Date(`${actualYear}-${month}-${day}`);

            let desc = description

            if(description.length >=20){
            desc = description.substring(0, 25);
            } 

            const montoTotal =  convertCurrencyStringToInt(monto)


            const objetoJson = {
            dateObject,
            lugarOperacion,
            montoTotal,
            desc,
            valorCuota:"NA",
            numCuota:"NA",
            }
            resultado.push(objetoJson); 
        }
        }

    });

    const resultWithCategories= categorizerGPT(resultado)


    return resultWithCategories;
}

export default verifySaleOriginBancodeChile