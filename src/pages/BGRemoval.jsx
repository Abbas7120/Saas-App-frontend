import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Eraser, Loader2, Upload, Download } from "lucide-react";
// import { callAIImage, fileToBase64 } from "@/lib/ai";
import { toast } from "sonner";

const btn =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
const ghost = `${btn} hover:bg-accent hover:text-accent-foreground h-9 px-3`;
const heroFull = `${btn} bg-blue-600 text-primary-foreground font-semibold shadow-lg hover:opacity-90 h-10 px-4 w-full`;

const BGRemoval = () => {
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
      toast.error("Please upload an image first");
      return;
    }
    setLoading(true);
    //     try {
    //       const res = await callAIImage("bg-removal", base64);
    //       if (res.image) { setResult(res.image); toast.success("Background removed!"); }
    //       else toast.error("Could not process image");
    //     } catch (err) { toast.error(err.message); } finally { setLoading(false); }
    //
  };

  const downloadImage = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = "no-background.png";
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
                  "linear-gradient(135deg, hsl(340 75% 55%), hsl(10 80% 55%))",
              }}
            >
              <Eraser className="h-6 w-6 text-card" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Background Removal
              </h1>
              <p className="text-sm text-muted-foreground">
                AI-powered clean background removal
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
                      Click to upload image
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 5MB
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
                    Processing...
                  </>
                ) : (
                  "Remove Background"
                )}
              </button>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 card-shadow">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display font-semibold text-card-foreground">
                  Result
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
                <div
                  className="flex items-center justify-center rounded-lg bg-muted p-4"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%23ccc'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23ccc'/%3E%3C/svg%3E\")",
                  }}
                >
                  <img
                    src={result}
                    alt="Result"
                    className="max-h-[300px] object-contain"
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Upload an image and click Remove Background to see the result.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BGRemoval;
