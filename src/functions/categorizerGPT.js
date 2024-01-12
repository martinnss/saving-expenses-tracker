
import OpenAI from "openai";
import apiKey from "./keys";

const openai = new OpenAI({
	apiKey: apiKey,
	dangerouslyAllowBrowser: true
});

let count = 0

// Function to add categories to transactions
function addCategoriesToTransactions(transactions, categoryObject) {
  return transactions.map(transaction => {
    const sellerName = transaction.desc;
    const category = categoryObject[sellerName];
    if (category===undefined) {
      return { ...transaction, category: "To be defined" };
    } else {
      return { ...transaction, category };
    }
  });
}

async function categorizerGPT(listOfObjects) {

  const listOfSellers = listOfObjects

  // Utiliza el método map para obtener un array de todas las descripciones
  const descriptions = listOfSellers.map(objeto => objeto.desc);
  
  // Usa el método join para unir las descripciones con comas
  const textOfSellers = descriptions.join(', ');




  
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": 'Identify a category associated with a given seller name. If the provided name appears to be a personal name, classify it as a "small business." Generate ajson ready to parse in javascript containing "seller" : "category" for every single seller'},
        {"role": "user", "content": textOfSellers}],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
	  temperature: 0.3
  });

  const gptOutput = completion.choices[0].message.content 
  const jsonString = gptOutput
/*

  
  const jsonString=`
  {
    "JUMBO COSTANERA CEN SANTIAGO": "Supermarket",
    "HDI SEGUROS SA SANTIAGO": "Insurance",
    "MERPAGO*SOCIEDAD GA PROVIDENCIA": "Financial Services",
    "FARMACIA NETFARMA SANTIAGO": "Pharmacy",
    "MERPAGO*ENTELPCSMOV LAS CONDES": "Telecommunications",
    "CLARO 11001SANTIAG": "Telecommunications",
    "MERPAGO*TRANSVIPWEB SANTIAGO": "Transportation",
    "DECATHLON COSTAN CE TASA INT. 2,98%": "Sporting Goods",
    "MP *NUNEZ Y ZUN TASA INT. 2,98%": "Retail",
    "ADIDAS ORIGINALS OE TASA INT. 2,96%": "Sporting Goods",
    "CLINICA QUIROPRACTI TASA INT. 0,00%": "Healthcare",
    "UNIRED CL ENEL TASA INT. 0,00%": "Utilities",
    "TERMAS DEL SOL TASA INT. 0,00%": "Hospitality",
    "C. VERDE A. VARAS 9 TASA INT. 2,88%": "Restaurant",
    "CAFE Y RESTAURANT C TASA INT. 2,88%": "Restaurant",
    "HOTEL VERSALLES TASA INT. 0,00%": "Hospitality",
    "LOMITOS PORKY SPA TASA INT. 2,88%": "Restaurant",
    "UNIRED CL VESPUCIO TASA INT. 0,00%": "Utilities",
    "AUTOPISTA CENTRAL TASA INT. 0,00%": "Transportation",
    "STA ISABEL AV OSSA TASA INT. 0,00%": "Retail",
    "SIRIO SPA TASA INT. 2,88%": "Beauty and Wellness",
    "PARIS INTERNET TCOM TASA INT. 2,88%": "Retail",
    "FALABELLA COSTANERA TASA INT. 0,00%": "Retail",
    "DJI DRONESTORE COST TASA INT. 2,88%": "Electronics",
    "SOC COMERCIAL LAS B TASA INT. 0,00%": "Retail",
    "STA ISABEL JM CARRE TASA INT. 0,00%": "Retail",
    "AUTOPLANET GRAN AV TASA INT. 2,88%": "Automotive",
    "SALON UNISEX OSCAR TASA INT. 0,00%": "Beauty and Wellness",
    "ABUUA FLORES SPA TASA INT. 2,88%": "Florist",
    "COMERCIAL H Y P LTD TASA INT. 0,00%": "Retail",
    "COMERCIAL H Y P LTD TASA INT. 2,91%": "Retail",
    "CAFE DE LOLOL TASA INT. 0,00%": "Restaurant",
    "COMERCIAL DE PABLO TASA INT. 0,00%": "Retail",
    "VESPUCIO NORTE TASA INT. 0,00%": "Retail",
    "AUTOPISTA N VESP SU TASA INT. 0,00%": "Transportation",
    "SOCIEDAD CONCESIONA TASA INT. 0,00%": "Transportation",
    "RUTA DEL MAIPO SC S TASA INT. 0,00%": "Transportation",
    "TELETON TASA INT. 0,00%": "Nonprofit",
    "SHEIN TASA INT. 2,91%": "Fashion",
    "ALVAREZ DE SARRATEA TASA INT. 0,00%": "Retail",
    "PASSARO GONZALEZ LE TASA INT. 2,91%": "Legal Services",
    "RIPLEY PLAZA OESTE TASA INT. 0,00%": "Retail",
    "JUMBO EL LLANO TASA INT. 0,00%": "Supermarket"
  }
  `*/
  // Log the extracted JSON string for debugging
  console.log(jsonString)
  // Parse JSON
  const jsonOutput = JSON.parse(jsonString);


  // hacer un joint porporla desc y las categories como sale abajo

  const transactionsWithCategories = addCategoriesToTransactions(listOfSellers, jsonOutput);


 return transactionsWithCategories
}

export default categorizerGPT