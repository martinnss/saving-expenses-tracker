
import OpenAI from "openai";
import apiKey from "./keys";

const openai = new OpenAI({
	apiKey: apiKey,
	dangerouslyAllowBrowser: true
});

async function categorizerGPT(listOfObjects) {

  const listOfSellers = listOfObjects

  // Utiliza el método map para obtener un array de todas las descripciones
  const descriptions = listOfSellers.map(objeto => objeto.desc);
  
  // Usa el método join para unir las descripciones con comas
  const textOfSellers = descriptions.join(', ');

  console.log("desc", textOfSellers)
  /*
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": 'Identify the precise business category associated with a given seller name, with a specific emphasis on establishments located in Chile. If the provided name appears to be a personal name, classify it as a "small business." Generate ajson ready to parse in javascript containing "seller" : "category" for every single seller'},
        {"role": "user", "content": textOfSellers}],
    model: "gpt-3.5-turbo-1106",
	temperature: 0.3
  });
  console.log(completion)
  const gptOutput = completion.choices[0].message.content*/

  const gptOutput="```json\n{\n  \"TRES CUOTAS PREC MP*MERCADO LIBRE\": \"E-commerce\",\n  \"Spotify P26C38BB67\": \"Streaming service\",\n  \"MERPAGO*ENEL\": \"Utilities\",\n  \"MERPAGO*MOVISTARHOGAR COM\": \"Telecommunications\",\n  \"MERPAGO*AGUASANDINAS\": \"Utilities\",\n  \"MERPAGO*CLAROTELEFONA\": \"Telecommunications\",\n  \"MERPAGO*TIENDACITROLA\": \"Retail\",\n  \"CECILIA ZUNIGA ESCUDERO\": \"Small business\",\n  \"PHARMACOSTA\": \"Pharmacy\",\n  \"LIB NACIONAL COSTANERA\": \"Bookstore\",\n  \"AMAZON.COM\": \"E-commerce\",\n  \"EMPORIO BAKERY\": \"Bakery\",\n  \"ALMACEN\": \"Convenience store\",\n  \"CRUZ VERDE CV 167\": \"Pharmacy\",\n  \"PAPACHECOS LASTARRIA\": \"Restaurant\",\n  \"MERPAGO*ROSA DE LAS MERC\": \"Retail\",\n  \"LIPIGAS OPL-RM-MTORRES\": \"Gas supplier\",\n  \"ALANIS Y RANDI\": \"Small business\",\n  \"LONCHERA SPA\": \"Restaurant\",\n  \"TOTTUS BUIN\": \"Supermarket\",\n  \"MERPAGO*BELOW\": \"Retail\",\n  \"CENTRO VETERINARIO V SALU\": \"Veterinary clinic\",\n  \"BOTILLERIA SEBASTIAN\": \"Liquor store\",\n  \"CARNES LOS ANDINOS\": \"Butcher shop\",\n  \"TIENDA DE CONVENIENCIA\": \"Convenience store\",\n  \"MERPAGO*BIPQR\": \"Transportation\",\n  \"FULLTEX\": \"Retail\",\n  \"TOTTUS LA FLORIDA DE 3 4\": \"Supermarket\",\n  \"OZ SPA\": \"Spa\",\n  \"DOS CUOTAS PRECI SPARTA INTERNET\": \"Internet service provider\"\n}\n```"
  
  // Extract JSON string and remove code block markdown
  const jsonString = gptOutput.slice(8, -4);

  // Log the extracted JSON string for debugging
  console.log("Extracted JSON String:", jsonString);

  // Parse JSON
  const jsonOutput = JSON.parse(jsonString);

  console.log("json",jsonOutput);

  // hacer un joint porporla desc y las categories como sale abajo



  // Accessing values by keys
  const value1 = jsonOutput["TRES CUOTAS PREC MP*MERCADO LIBRE"];
  const value2 = jsonOutput["Spotify P26C38BB67"];

  console.log("Value 1:", value1);
  console.log("Value 2:", value2);
  
 return textOfSellers
}

export default categorizerGPT