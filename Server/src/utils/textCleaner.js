export function cleanText(text) {

  if (!text) return "";

  return text
    .replace(/\r\n/g, " ")      // remove windows line breaks
    .replace(/\n/g, " ")        // remove new lines
    .replace(/\t/g, " ")        // remove tabs
    .replace(/\s+/g, " ")       // multiple spaces → single
    .replace(/[^\x20-\x7E]/g, "") // remove weird unicode chars
    .trim();

}