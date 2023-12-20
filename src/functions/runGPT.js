import OpenAI from "openai";
import apiKey from "./keys";

const openai = new OpenAI({
	apiKey: apiKey,
	dangerouslyAllowBrowser: true
});

async function runGPT() {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": 'Determine the specific business category for a given seller name, focusing on establishments in Chile. If the provided name corresponds to a personal name categorize it as a "small business" The output should solely indicate the category'},
        {"role": "user", "content": "jumbo sa"}],
    model: "gpt-3.5-turbo",
	temperature: 0.3
  });

  console.log(completion);
}

//export default runGPT


//estimar pricing