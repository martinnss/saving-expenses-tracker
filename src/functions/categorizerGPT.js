
import OpenAI from "openai";
import apiKey from "./keys";

const openai = new OpenAI({
	apiKey: apiKey,
	dangerouslyAllowBrowser: true
});

async function categorizerGPT(listOfObjects) {

    const listOfSellers = listOfObjects
    console.log(typeof listOfObjects)
    // Utiliza el método map para obtener un array de todas las descripciones
    const descriptions = listOfSellers.map(objeto => objeto.description);

    // Usa el método join para unir las descripciones con comas
    const resultado = descriptions.join(', ');
  /*const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": 'Determine the specific business category for a given seller name, focusing on establishments in Chile. If the provided name corresponds to a personal name categorize it as a "small business" The output should solely indicate the category'},
        {"role": "user", "content": "Ekono, Hipermercados Líder, Paris.cl, Falabella, Ripley, Sodimac, Johnson's, La Polar, ABCDIN, La Fete, Casaideas, Zara Home, Hush Puppies, Librería Nacional, Ferouch, Yapo.cl, ABC Mayorista, PC Factory, Parisina, Perfumerías Avenida, Sybven, Cetrogar, Audiofoto, Opticas GMO, Caffarena, Jardín Infantil Los Enanitos, ABC Motos, Subway, Farmacias Salcobrand, Dairy Queen, Gasco, Tottus.cl, Easy.cl, Jumbo.cl, Derco, Sipcom, Zara, Skechers, Wrangler, Fotomundo, The North Face, Brooks Brothers, Reebok, Claro, Movistar, Entel, WOM, Virgin Mobile, Huawei Store, Sony Store."}],
    model: "gpt-3.5-turbo-1106",
	temperature: 0.3
  });

  console.log(completion);
  */
 return resultado
}

export default categorizerGPT