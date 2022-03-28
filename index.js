const express = require("express");
const { dataPhieuTomTatKham } = require("./public/data/dataPhieuTomTatKham");
const { dataPhieuDichVuKhac } = require("./public/data/dataPhieuDichVuKhac");
const don_thuoc = require("./render/don_thuoc");
const phieuDichVuKhac = require("./render/phieuDichVuKhac");
const phieu_dich_vu_khac = require("./render/phieuDichVuKhac");
const phieuTomTatKham = require("./render/phieuTomTatKham");

function pbcopy(data) {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

const app = express();
const port = process.env.PORT || 3113;

app.use("/", async (req, res) => {
  const pdf = await phieuTomTatKham(dataPhieuTomTatKham);

  // const pdfBase64 = pdf.toString("base64");
  // pbcopy(pdfBase64);

  res.set("Content-Type", "application/pdf");
  return res.send(pdf);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}\n`);
});
