import OpenAI from "openai";
import apiKey from "./keys";

const openai = new OpenAI({
	apiKey: apiKey,
	dangerouslyAllowBrowser: true
});

async function runGPT() {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": 'Determine the specific business category for a given seller name, focusing on establishments in Chile. If the provided name corresponds to a personal name categorize it as a "small business" The output should solely indicate the category'},
        {"role": "user", "content": "Ekono, Hipermercados Líder, Paris.cl, Falabella, Ripley, Sodimac, Johnson's, La Polar, ABCDIN, La Fete, Casaideas, Zara Home, Hush Puppies, Librería Nacional, Ferouch, Yapo.cl, ABC Mayorista, PC Factory, Parisina, Perfumerías Avenida, Sybven, Cetrogar, Audiofoto, Opticas GMO, Caffarena, Jardín Infantil Los Enanitos, ABC Motos, Subway, Farmacias Salcobrand, Dairy Queen, Gasco, Tottus.cl, Easy.cl, Jumbo.cl, Derco, Sipcom, Zara, Skechers, Wrangler, Fotomundo, The North Face, Brooks Brothers, Reebok, Claro, Movistar, Entel, WOM, Virgin Mobile, Huawei Store, Sony Store."}],
    model: "gpt-3.5-turbo-1106",
	temperature: 0.3
  });

  console.log(completion);
}

export default runGPT


//estimar pricing

//estamos grstando aprox 10 tokens por seller. aprox 50/50 en prompt y en completion
//// para 1000 tokens son 100 sellers, el costo transaccional de esos 100 sellers son aprox 1.8 pesos 
///////////// si son 1000 maus con 3 subidas de 100 elementos-> 1000*3*1.8 = 5400 CLP 
