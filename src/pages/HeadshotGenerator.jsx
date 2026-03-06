import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Loader2, Upload, Download } from "lucide-react";
// import { callAIImage, fileToBase64 } from "@/lib/ai";
import { toast } from "sonner";

const btn =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
const ghost = `${btn} hover:bg-accent hover:text-accent-foreground h-9 px-3`;
const heroFull = `${btn} bg-blue-600 text-primary-foreground font-semibold shadow-lg hover:opacity-90 h-10 px-4 w-full`;

const HeadshotGenerator = () => {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [base64, setBase64] = useState("");
  const fileRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max file size is 5MB");
      return;
    }
    // const b64 = String(await fileToBase64(file));
    // setBase64(b64);
    // setPreview(b64);
    // setResult(null);
  };

  const handleProcess = async () => {
    if (!base64) {
      toast.error("Upload a photo first");
      return;
    }
    setLoading(true);
    //     try {
    //       const res = await callAIImage("headshot", base64);
    //       if (res.image) { setResult(res.image); toast.success("Headshot generated!"); }
    //       else toast.error("Could not process image");
    //     } catch (err) { toast.error(err.message); } finally { setLoading(false); }
    //
  };

  const downloadImage = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = "professional-headshot.png";
    a.click();
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
                  "linear-gradient(135deg, hsl(150 60% 45%), hsl(172 66% 50%))",
              }}
            >
              <Camera className="h-6 w-6 text-card" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                AI Headshot Generator
              </h1>
              <p className="text-sm text-muted-foreground">
                Professional headshots from your photos
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div
                onClick={() => fileRef.current?.click()}
                className="flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-8 transition-colors hover:border-primary"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Upload"
                    className="max-h-[280px] rounded-lg object-contain"
                  />
                ) : (
                  <>
                    <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
                    <p className="font-medium text-card-foreground">
                      Upload your photo
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Clear face photo, PNG or JPG up to 5MB
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
              <button
                className={heroFull}
                disabled={loading || !preview}
                onClick={handleProcess}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  "Generate Headshot"
                )}
              </button>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 card-shadow">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display font-semibold text-card-foreground">
                  Professional Headshot
                </h2>
                {result && (
                  <button
                    className={`${ghost} h-8 w-8 p-0`}
                    onClick={downloadImage}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                )}
              </div>
              {result ? (
                <div className="flex items-center justify-center">
                  <img
                    src={result}
                    alt="Headshot"
                    className="max-h-[300px] rounded-lg object-contain"
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Upload a clear photo of yourself to generate a professional
                  headshot.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeadshotGenerator;
