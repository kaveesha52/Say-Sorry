import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const urlPath = req.url === "/" ? "/index.html" : req.url;
    
    // Try to serve static files from dist/client
    const clientPath = path.join(process.cwd(), "dist/client", urlPath.replace(/^\//, ""));
    
    if (fs.existsSync(clientPath) && fs.statSync(clientPath).isFile()) {
      const ext = path.extname(clientPath);
      const contentTypes = {
        ".html": "text/html; charset=utf-8",
        ".js": "application/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".woff2": "font/woff2",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".mp3": "audio/mpeg",
      };
      
      const contentType = contentTypes[ext] || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      
      if ([".woff2", ".png", ".jpg", ".gif", ".mp3"].includes(ext)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
      
      const content = fs.readFileSync(clientPath);
      return res.send(content);
    }
    
    // Fallback to index.html for client-side routing
    const indexPath = path.join(process.cwd(), "dist/client", "index.html");
    if (fs.existsSync(indexPath)) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      return res.send(fs.readFileSync(indexPath));
    }
    
    res.status(404).send("Not Found");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}
