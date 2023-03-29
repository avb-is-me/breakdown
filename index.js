(async () => {

    var result = await callMessage("Your question and content")

    const callMessage = async function(message) {
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
        }

    }
   
})