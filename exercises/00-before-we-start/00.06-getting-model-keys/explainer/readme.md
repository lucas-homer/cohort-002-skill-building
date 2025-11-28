To run any of the exercises in skill building or the project, you will need to grab an API key from some kind of AI service.

The one I recommend you use is [Gemini](https://aistudio.google.com/api-keys). The reason for that is all you need is a Google account and you can get an API key for free that will allow you to complete the course.

It might get a little bit rate-limited inside the eval section. Since with evals you push through a lot of data in your system and really kind of push it to its limits.

But even if you add your credit card, it's really not going to charge you much, especially if you stick to Gemini 2.5 Flash.

**However, you really can use any kind of model you like.** If you already have access to Anthropic, OpenAI, or some other kind of model provider that will work absolutely fine with this course.

And because we're using the [AI SDK](https://ai-sdk.dev/providers/ai-sdk-providers), you can just plug it in.

## A Word of Caution About Local Models

One thing I would urge you to be cautious about, though, is using local models. Unless you're really experienced with local models and you've got a piece of hardware that can run them really effectively, then you might not find they perform particularly well with the course.

## Setting Up Your API Key

Once you've got your API key, you need to stick it in `.env`—both in the skill building and in the project repos since they both use AI.

### For Gemini

First, [get your Gemini API key](https://aistudio.google.com/api-keys).

Then add it to your `.env` file:

```
GOOGLE_GENERATIVE_AI_API_KEY="your-api-key-here"
```

Replace `your-api-key-here` with the actual API key you generated.

### For Other Providers

If you're using a different provider like Anthropic or OpenAI:

1. Check the [AI SDK providers documentation](https://ai-sdk.dev/providers/ai-sdk-providers) for your specific provider
2. Install the required provider package from the AI SDK
3. Add the appropriate environment variable to your `.env` file
4. Do a find and replace with any of the Google models that I've used and replace it with your own

```
google('gemini-2.5-flash') -> openai('gpt-4.1-mini')
```

So once you have a `.env` file with an API key in, you are good to go.

Nice work, and I will see you in the next one.
