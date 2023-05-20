import { OpenAI } from "langchain/llms/openai";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { readFileSync } from "fs";
import path from "path";
import { HumanChatMessage } from "langchain/schema";

let storedMemory: string;

export const getNewMessage = async (input: string) => {
  try {
    // get api key
    const directory = path.join(process.cwd(), "keys/open-ai-key");
    const apiKey = readFileSync(directory, "utf8");

    // retrieve memory
    let memory: ConversationSummaryMemory;
    let memoryStatus = "new";
    if (storedMemory) {
      memoryStatus = "retrieved";
      // memory = storedMemory;
      const preservedMemory = JSON.parse(storedMemory);
      memory = new ConversationSummaryMemory({
        memoryKey: "chat_history",
        llm: new OpenAI({
          openAIApiKey: apiKey,
          modelName: "gpt-3.5-turbo",
          temperature: 0.1,
        }),
      });
      memory.buffer = preservedMemory.buffer;

      // re-populate message history
      const preservedChatHistory = preservedMemory.chatHistory;
      preservedChatHistory.forEach(
        (message: {
          from: "HumanChatMessage" | "AIChatMessage";
          message: string;
        }) => {
          if (message.from === "HumanChatMessage") {
            memory.chatHistory.addUserMessage(message.message);
          } else {
            memory.chatHistory.addAIChatMessage(message.message);
          }
        }
      );
    } else {
      memory = new ConversationSummaryMemory({
        memoryKey: "chat_history",
        llm: new OpenAI({
          openAIApiKey: apiKey,
          modelName: "gpt-3.5-turbo",
          temperature: 0,
        }),
      });

      // storedMemory = memory;
    }

    // feed input to AI
    const model = new ChatOpenAI({
      openAIApiKey: apiKey,
      temperature: 0.9,
      modelName: "gpt-3.5-turbo",
    });

    // TODO: handle tip?  ${hasTip ? `You just received a tip for $${tipAmount}!` : ""}
    const prompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        `
      Respond truthfully. Do not say you know anything that you don't know.

      Current conversation:
      {chat_history}
      `
      ),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);
    const chain = new LLMChain({ llm: model, prompt, memory });
    const response = await chain.call({ input });

    // store memory
    const storedMessages = await memory.chatHistory.getMessages();
    const chatHistory = storedMessages.map((message) => ({
      from: message.constructor.name,
      message: message.text,
    }));

    storedMemory = JSON.stringify({
      buffer: memory.buffer,
      chatHistory,
    });

    const textBot = new ChatOpenAI({
      openAIApiKey: apiKey,
      temperature: 0,
      modelName: "gpt-3.5-turbo",
    });

    const formattedResponse = await textBot.call([
      new HumanChatMessage(
        `Add line breaks to the following message so that it sounds like its coming from one person who is texting another. Remove "." characters at the end of sentences to make it seem more natural.
        
        ${response.text}`
      ),
    ]);

    return {
      text: formattedResponse.text.toLowerCase(),
      memoryStatus,
      memory: JSON.stringify({
        chatHistory: await memory.loadMemoryVariables({}),
      }),
    };
  } catch (e: any) {
    console.log("Error:", e);
  }
};

export default getNewMessage;
