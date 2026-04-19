import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse").default;

export async function parsePDFBuffer(buffer) {
  try {
    if (!buffer) {
      throw new Error("PDF buffer missing");
    }

    const data = await pdfParse(buffer);

    return {
      pages: data.numpages,
      text: data.text || ""
    };

  } catch (error) {
    console.error("PDF parsing error:", error.message);
    throw new Error("Failed to parse PDF");
  }
}