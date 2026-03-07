const { generateAI } = require("../services/gemini.service")

exports.generatePost = async(req,res)=>{

const { topic,tone,contentType } = req.body

const prompt = `
Write a ${contentType} LinkedIn post about ${topic}

Tone:${tone}

Include hashtags.
`

const post = await generateAI(prompt)

res.json({post})

}