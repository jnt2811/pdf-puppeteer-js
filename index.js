const express = require("express");
const path = require("path");
const { dataDonThuoc } = require("./data");
const don_thuoc = require("./render/don_thuoc");

function pbcopy(data) {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

const app = express();
const port = process.env.PORT || 5001;

app.use(express.static(path.join(__dirname, "public")));

app.use("/pdf", async (req, res) => {
  const pdf = await don_thuoc(dataDonThuoc);

  const pdfBase64 = pdf.toString("base64");
  // pbcopy(pdfBase64);

  res.set("Content-Type", "application/pdf");
  res.send(pdf);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}\n`);
});