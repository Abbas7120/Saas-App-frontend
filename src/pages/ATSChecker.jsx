import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ScanSearch, Loader2, Copy, Check } from "lucide-react";
// import { callAITool } from "@/lib/ai";
import { postJSON } from "../lib/api"
import { toast } from "sonner";

const btn =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
const ghost = `${btn} hover:bg-accent hover:text-accent-foreground h-9 px-3`;
const heroFull = `${btn} bg-blue-600 text-primary-foreground font-semibold shadow-lg hover:opacity-90 h-10 px-4 w-full`;
const textareaClass =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px] ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const ATSChecker = () => {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!resume.trim()) {
  //     toast.error("Please paste your resume");
  //     return;
  //   }
  //   setLoading(true);
  //   // try {
  //   //   const res = await callAITool("ats-checker", { resume, jobDescription });
  //   //   setResult(res);
  //   //   toast.success("Analysis complete!");
  //   // } catch (err) {
  //   //   toast.error(err.message);
  //   // } finally {
  //   //   setLoading(false);
  //   // }
  // };

  const handleSubmit = async (e) => {

e.preventDefault()

if (!resume.trim()) {
toast.error("Please paste your resume")
return
}

setLoading(true)

try {

const res = await postJSON("/api/ats/analyze-text", {
resumeContent: resume,
jobDescription
})

setResult(res.analysis)

toast.success("Analysis complete!")

} catch (err) {

toast.error(err.message)

} finally {

setLoading(false)

}

}
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
  <div className="min-h-screen py-10 flex justify-center">
      <div className="container max-w-6xl px-6">
        <Link to="/dashboard" className={`${ghost} mb-6`}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8 flex items-center gap-3">
            <div
              className="rounded-lg p-3"
              style={{
                background:
                  "linear-gradient(135deg, hsl(262 83% 58%), hsl(280 70% 55%))",
              }}
            >
              <ScanSearch className="h-6 w-6 text-card" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                ATS Resume Checker
              </h1>
              <p className="text-sm text-muted-foreground">
                Score your resume against ATS systems
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-xl border border-border bg-card p-6 card-shadow"
            >
              <div>
                <label className="text-sm font-medium text-foreground">
                  Your Resume *
                </label>
                <textarea
                  className={textareaClass}
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste your entire resume text here..."
                  rows={10}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Job Description (optional)
                </label>
                <textarea
                  className={textareaClass}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description to check keyword match..."
                  rows={6}
                />
              </div>
              <button type="submit" className={heroFull} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Analyzing...
                  </>
                ) : (
                  "Check ATS Score"
                )}
              </button>
            </form>

            <div className="rounded-xl border border-border bg-card p-6 card-shadow">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display font-semibold text-card-foreground">
                  Analysis Results
                </h2>
                {result && (
                  <button
                    className={`${ghost} h-8 w-8 p-0`}
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
              {result ? (
                <div className="prose prose-sm max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm text-card-foreground">
                  {result}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Paste your resume and click Check to get your ATS score and
                  improvement suggestions.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ATSChecker;
