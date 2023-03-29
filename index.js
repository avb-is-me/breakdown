(async () => {

    async function getArgs () {
        const args = {};
        var thing = "is coooolsxsdfdsfdfddksnfjdna!!!"
        process.argv
            .slice(2, process.argv.length)
            .forEach( arg => {
            // long arg
            if (arg.slice(0,2) === '--') {
                const longArg = arg.split('=');
                const longArgFlag = longArg[0].slice(2,longArg[0].length);
                const longArgValue = longArg.length > 1 ? longArg[1] : true;
                args[longArgFlag] = longArgValue;
            }
            // flagsaaaa
            else if (arg[0] === '-') {
                const flags = arg.slice(1,arg.length).split('');
                flags.forEach(flag => {
                args[flag] = true;
                });
            }
        });
        return args;
    }

    const callMessage = async function() {
        const args = await getArgs();
        console.log(args)
        try {
            var data = JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { "role": "system", "content": args.role_message.trim() },
                    {
                        role: "user",
                        content: args.general_message.trim(),
                    },
                ],
            });
            console.log(data)
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

    var result = await callMessage()

   
})()