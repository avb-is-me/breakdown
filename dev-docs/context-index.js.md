# Breakdown of how to use chatgpt api

```javascript
(async () =&gt; {    var result = await callMessage("Your question and content")    const callMessage = async function(message) {
        try {
            var data = JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { "role": "system", "content": "YOU ARE" },
                    {
                        role: "user",
                        content: `${message}`,
                    },
                ],
            });
            var config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://api.openai.com/v1/chat/completions",
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI}`,
                    "Content-Type": "application/json",
                },
                data: data,
            };
    
            const result = await axios(config);
    
            const { choices } = result.data
            const mainChoice = choices[0]
            console.log("choices", choices)
            const { message } = mainChoice
            const { content } = message
            return { content }
        } catch (e) {
            console.log("UH oh SPAGHETTI O");
            return { message: "NOT GOOD" };
        }    }
   
})

```

Main thing is that you pass a json object with an array called messages, and the model type "gpt-3.5-turbo"(thought this really does not change"

A message object can have role and content
```javascript
                    { "role": "system", "content": "YOU a system that changes the tone of messages" }

```

This is an example of instructing how you want chat gpt to behave, versus when the role is user, then it will actually be better for it to interact with the content for example:

```javascript
{role: "user", content: `Here is a message I want you change the tone of : 'I am struggling with waking up in the morning and going to work'`}

```

Try it out



<shell-block command="node index.js --role_message=&quot;you are a system that organizes the tone of sentence&quot; --general_message=&quot;here is the data, blah blah&quot;" saved="true"></shell-block>
