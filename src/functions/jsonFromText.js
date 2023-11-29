
const jsonFromText = ({text}) => {

    if (text !== null && text !== undefined){
        console.log(text)
        // Paso 1: Encontrar el índice de inicio y fin de la tabla
        const startIndex = text.indexOf('2.PERÍODO ACTUAL');
        const endIndex = text.indexOf('3. CARGOS, COMISIONES, IMPUESTOS Y ABONOS');

        // Paso 2: Extraer la tabla utilizando substring
        const tablaTexto = text.substring(startIndex, endIndex);

        // Paso 3: Mostrar la tabla
        console.log(tablaTexto);
        return tablaTexto

    } else {
        return null
    }
}

export default jsonFromText