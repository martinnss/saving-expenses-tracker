import OpenAI from "openai";
import apiKey from "./keys";






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



async function categorizerGPTEmails(listOfObjects) {

  const listOfSellers = listOfObjects
  // Utiliza el método map para obtener un array de todas las descripciones
  const descriptions = listOfSellers.map(objeto => objeto.desc);
  
  console.log(descriptions)
  // Usa el método join para unir las descripciones con comas
  const textOfSellers = descriptions.join('| ');

  console.log(textOfSellers)

  /*
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
  });

  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": 'Identify a category associated with a given seller name. If the provided name appears to be a personal name, classify it as a "small business." Generate ajson ready to parse in javascript containing "seller" : "category" for every single seller'},
        {"role": "user", "content": textOfSellers}],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
	  temperature: 0.4
  });
  */
  try {
    // Realizar el llamado a la ruta de Express
    const response = await fetch('https://saving-backend-3ngcl3pz5-martinnss.vercel.app/get-category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textOfSellers }),
    });

    // Verificar si la respuesta es exitosa (código 200)
    if (response.ok) {
        const completion = await response.json();
        // Manejar la data según sea necesario
        const gptOutput = completion.choices[0].message.content 
        const jsonString = gptOutput
      
        // Log the extracted JSON string for debugging
        // Parse JSON
        const jsonOutput = JSON.parse(jsonString);
      
        console.log(jsonOutput)
        // hacer un joint porporla desc y las categories como sale abajo
      
        const transactionsWithCategories = addCategoriesToTransactions(listOfSellers, jsonOutput);
      
        
        return transactionsWithCategories
    } else {
        // Manejar errores de respuesta
        console.error('Error en la respuesta del servidor:', response.status);
    } 
  } catch (error) {
    // Manejar errores de red u otros
    console.error('Error en la solicitud:', error.message);
  }
}

export default categorizerGPTEmails