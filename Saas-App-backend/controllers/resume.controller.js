const { generateAI } = require("../services/gemini.service")
const db = require("../config/mysql")

exports.generateResume = async(req,res)=>{

const { fullName,email,education,skills,experience,projects } = req.body

const prompt = `
Act as a professional resume writer.

Create a resume using this data.

Name:${fullName}
Education:${education}
Skills:${skills}
Experience:${experience}
Projects:${projects}
`

const resume = await generateAI(prompt)

await db.query(
`INSERT INTO resumes(full_name,email,education,skills,experience,projects,generated_resume)
VALUES (?,?,?,?,?,?,?)`,
[fullName,email,education,skills,experience,projects,resume]
)

res.json({resume})

}