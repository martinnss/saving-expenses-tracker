
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
  console.log(listOfObjects)

  // Utiliza el método map para obtener un array de todas las descripciones
  const descriptions = listOfSellers.map(objeto => objeto.desc);
  
  // Usa el método join para unir las descripciones con comas
  const textOfSellers = descriptions.join(', ');


  count++;
  console.log("categorizer render number: ",count);


  /*
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": 'Identify the precise business category associated with a given seller name, with a specific emphasis on establishments located in Chile. If the provided name appears to be a personal name, classify it as a "small business." Generate ajson ready to parse in javascript containing "seller" : "category" for every single seller'},
        {"role": "user", "content": textOfSellers}],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
	  temperature: 0.3
  });

  const gptOutput = completion.choices[0].message.content 
  const jsonString = gptOutput*/



  const jsonString=`
  {
    "MP*MERCADO LIBRE": "e-commerce",
    "SPARTA INTERNET": "internet service provider",
    "LONCHERA SPA": "food truck",
    "AHUM L644 J.BALMACEDA 124": "smokehouse",
    "SINATRAS COFFEE BREAK LTD": "coffee shop",
    "CLEVER": "small business",
    "MERRELL FLORIDA CENTER": "shoe store",
    "EASY FLORIDA": "home improvement store",
    "PARKING MALL FLORIDA CENT": "parking facility",
    "Spotify P277AE88E3": "music streaming service",
    "10 DE JULIO": "small business",
    "MERPAGO*BIPQR": "public transportation payment",
    "CRUZVERDE CV 1134": "pharmacy",
    "MERPAGO*ROSA DE LAS MERC": "marketplace payment",
    "DULCE & SALADO": "bakery",
    "EMPORIO BAKERY": "bakery",
    "MAXI GRUPO SPA": "business services",
    "CECILIA ZUNIGA ESCUDERO": "small business",
    "PETROBRAS AV MATTA 1345": "gas station",
    "CAFETERIA LAIK": "cafe",
    "MERPAGO*MOVISTARHOGAR": "telecommunications",
    "MERPAGO*ENEL": "utility payment",
    "MERPAGO*CLAROTELEFONA": "telecommunications",
    "MERPAGO*AGUASANDINAS": "utility payment",
    "ASAHI PROVIDENCIA": "restaurant",
    "LIPIGAS OPL-RM-MTORRES": "gas supplier",
    "MERPAGO*3PRODUCTOS": "marketplace payment",
    "DISTRIBUIDORA EL TURCO": "distributor",
    "MERPAGO*FUENTES PICEROS": "marketplace payment",
    "MT AUT LOS LEONES NORTE": "car dealership",
    "HYM COSTANERA CENTER": "clothing store",
    "BIG O PIZZA": "pizza restaurant",
    "WORLD TRADE CENTER DE 3 4": "office building",
    "COMERCIALIZADORA PRIETO Y": "retail store",
    "CENTRO VETERINARIO V SALU": "veterinary clinic",
    "FERRETERIA EL TORREON": "hardware store",
    "HONG SHUN": "restaurant",
    "CV 037": "pharmacy",
    "OPENAI": "technology company",
    "LATAM.COM XP OTRAS": "airline",
    "INVERSIONES GUEVARA SPA": "investment firm",
    "INVERSIONES GUEVARA SPA M": "investment firm"
  }
  `
  // Log the extracted JSON string for debugging
  console.log(jsonString)
  // Parse JSON
  const jsonOutput = JSON.parse(jsonString);


  // hacer un joint porporla desc y las categories como sale abajo

  const transactionsWithCategories = addCategoriesToTransactions(listOfSellers, jsonOutput);


 return transactionsWithCategories
}

export default categorizerGPT