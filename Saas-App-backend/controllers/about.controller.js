const { generateAI } = require("../services/gemini.service")

exports.generateBio = async(req,res)=>{

const { fullName,targetRole,keySkills,experience,careerGoals,tone } = req.body

const prompt = `
Write a LinkedIn About section.

Name:${fullName}
Role:${targetRole}
Skills:${keySkills}
Experience:${experience}
Goals:${careerGoals}

Tone:${tone}

Generate 3 variations.
`

const bio = await generateAI(prompt)

res.json({bio})

}