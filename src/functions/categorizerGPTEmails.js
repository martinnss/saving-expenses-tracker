import OpenAI from "openai";
import apiKey from "./keys";

const openai = new OpenAI({
	apiKey: apiKey,
	dangerouslyAllowBrowser: true
});




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

  // Log the extracted JSON string for debugging
  // Parse JSON
  const jsonOutput = JSON.parse(jsonString);


  // hacer un joint porporla desc y las categories como sale abajo

  const transactionsWithCategories = addCategoriesToTransactions(listOfSellers, jsonOutput);

  
  return transactionsWithCategories
}

export default categorizerGPTEmails