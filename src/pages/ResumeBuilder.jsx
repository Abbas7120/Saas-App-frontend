import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Loader2, Copy, Check } from "lucide-react";
// import { callAITool } from "@/lib/ai";
import { toast } from "sonner";

const btn =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
const ghost = `${btn} hover:bg-accent hover:text-accent-foreground h-9 px-3`;
const heroFull = `${btn} bg-blue-600 text-primary-foreground font-semibold shadow-lg hover:opacity-90 h-10 px-4 w-full`;
const inputClass =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const textareaClass = `${inputClass} min-h-[80px]`;

const ResumeBuilder = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: "",
    projects: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.education || !form.skills) {
      toast.error("Please fill in name, education, and skills");
      return;
    }
    setLoading(true);
    // try {
    //   const res = await callAITool("resume-builder", form);
    //   setResult(res);
    //   toast.success("Resume generated!");
    // } catch (err) {
    //   toast.error(err.message || "Failed to generate resume");
    // } finally {
    //   setLoading(false);
    // }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied to clipboard");
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
            <div className="bg-blue-600 rounded-lg p-3">
              <FileText className="h-6 w-6 text-card" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Resume Builder
              </h1>
              <p className="text-sm text-muted-foreground">
                AI-powered professional resume creation
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-xl border border-border bg-card p-6 card-shadow"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Full Name *
                  </label>
                  <input
                    className={inputClass}
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Email *
                  </label>
                  <input
                    className={inputClass}
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Phone
                </label>
                <input
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+1 234 567 890"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Education *
                </label>
                <textarea
                  className={textareaClass}
                  value={form.education}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, education: e.target.value }))
                  }
                  placeholder="B.Tech Computer Science, XYZ University, 2024"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Skills *
                </label>
                <textarea
                  className={textareaClass}
                  value={form.skills}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, skills: e.target.value }))
                  }
                  placeholder="React, TypeScript, Python, Machine Learning..."
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Experience
                </label>
                <textarea
                  className={textareaClass}
                  value={form.experience}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, experience: e.target.value }))
                  }
                  placeholder="Intern at ABC Corp, Built REST APIs..."
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Projects
                </label>
                <textarea
                  className={textareaClass}
                  value={form.projects}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, projects: e.target.value }))
                  }
                  placeholder="E-commerce app using React, ML model for sentiment analysis..."
                  rows={3}
                />
              </div>
              <button type="submit" className={heroFull} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  "Generate Resume"
                )}
              </button>
            </form>

            <div className="rounded-xl border border-border bg-card p-6 card-shadow">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display font-semibold text-card-foreground">
                  Generated Resume
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
                  Fill in your details and click Generate to create your
                  AI-powered resume.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
