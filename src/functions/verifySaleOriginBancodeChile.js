import convertCurrencyStringToInt from "./convertCurrencyStringToInt";
import verifySaleOriginDeferredSantander from "./verifySaleOriginDeferredSantander";


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




    //////////////////////////////////////////////////////
    // no se hará diferencia en deferred payment


    

    const resultado = [];

    stringList.forEach((string) => {

        const wordsArray = string.split(/\s+/);
        // Encuentra el índice del último elemento que contiene '%'
        const indexOfPercent = wordsArray.lastIndexOf(
            wordsArray.find(element => element.includes('%'))
        );
        const indexOfDollar = wordsArray.indexOf(
            wordsArray.find(element => element.includes('$'))
        );

        // Une todas las cadenas desde el principio hasta el elemento encontrado en el paso 1 y desde el número encontrado en el paso 2 hasta el final
        const firstElements = wordsArray.slice(0, 2)
        const descElements = wordsArray.slice(2, indexOfDollar).join(" ") 
        const restOfelements = wordsArray.slice(indexOfDollar);
        
        const resultFirstClean = firstElements.concat(descElements,restOfelements)
        const filteredArrayWithourDollar = resultFirstClean.filter(element => element !== "$");
        


        

        const preFiltered = filteredArrayWithourDollar.slice(0,7)
        

        let finalResult = []

        if ( (!isNaN(Number(filteredArrayWithourDollar[7])) && filteredArrayWithourDollar[7].length === 1 ) || filteredArrayWithourDollar[7].includes("TOTAL")) {
            const indexOfD = filteredArrayWithourDollar.findIndex(element => element === "D");
            const placeOfBuyD = filteredArrayWithourDollar.slice(indexOfD+1)

            const indexOfMensual = filteredArrayWithourDollar.findIndex(element => element === "MENSUAL");
            const placeOfBuy = filteredArrayWithourDollar.slice(indexOfMensual+1)

            if(indexOfD===-1){
                finalResult = preFiltered.concat(placeOfBuy)
            } else if (indexOfMensual===-1){
                finalResult = preFiltered.concat(placeOfBuyD)
            }

        } else {
            finalResult = filteredArrayWithourDollar
        }

        //Ajustar result en los lugares de compra y desp ajustar [fecha, lugarOperacion, monto, desc1, preciocuota, numCuota, desc2]
        //para que todo pueda seguir el mismo flujo y no sea necesario seguir modificando
        const indexOfC = finalResult.findIndex(element => element === "C");
        let cityRestante = []

        if( indexOfC!==-1){
            const preC = finalResult.slice(0,indexOfC)
            const restanteCityElemento = finalResult.slice(indexOfC+1).join(" ")
            
            cityRestante = restanteCityElemento

            finalResult = preC
        } else {
            finalResult = finalResult
        }


        if (finalResult.length >8){
            const preJoint = finalResult.slice(0,7)
            const preJointCity = finalResult.slice(7).join(" ")

            finalResult = preJoint.concat(preJointCity)
        }

        
        
        console.log("result",finalResult)

        const listOfStrings = finalResult
        
        /* put pud de verify sale origin
                0
        : 
        "20/11/23"
        1
        : 
        "$112.491"
        2
        : 
        "$112.491"
        3
        : 
        "0,00 % DOS CUOTAS PRECI "
        4
        : 
        "56.245"
        5
        : 
        "02/02"
        6
        : 
        "SPARTA INTERNET" */

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


        });

    // al final ajustar la ciudad 


    console.log(resultado)
    //const resultWithCategories= categorizerGPT(resultado)


    //return resultWithCategories;
}

export default verifySaleOriginBancodeChile