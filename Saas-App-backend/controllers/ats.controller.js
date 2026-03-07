const { generateAI } = require("../services/gemini.service")

exports.analyzeResume = async(req,res)=>{

const { resumeContent, jobDescription } = req.body

const prompt = `
Act as ATS.

Compare resume with job description.

Return:
score
missing keywords
action items
`

const analysis = await generateAI(prompt)

res.json({analysis})

}