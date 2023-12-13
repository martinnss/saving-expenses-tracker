
const jsonFromText = ({text}) => {

    if (text !== null && text !== undefined){
        // Paso 1: Encontrar el índice de inicio y fin de la tabla
        const startIndex = text.indexOf('2.PERÍODO ACTUAL');
        const endIndex = text.indexOf('3. CARGOS, COMISIONES, IMPUESTOS Y ABONOS');

        // Paso 2: Extraer la tabla utilizando substring
        const tableText = text.substring(startIndex, endIndex);

        // Utiliza una expresión regular para encontrar fechas en el formato 00/00/0000
        const regex = /\b\d{2}\/\d{2}\/\d{2}\b/g;

        // Encuentra todas las fechas en el string
        const fechas = tableText.match(regex);


        // Divide el string en sublistas usando las fechas como delimitadores
        const sublistas = tableText.split(regex);

        // Combina las fechas con las sublistas correspondientes
        const resultado = sublistas.map((sublista, index) => {
            return fechas[index] + ' ' + sublista.trim();
        });

        return resultado;

    } else {
        return null
    }
}

export default jsonFromText