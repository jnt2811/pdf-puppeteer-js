const express = require("express");
const {
  dataDonThuoc,
  dataPhieuTiepDon,
  dataPhieuThuPhiDichVu,
  dataPhieuTomTatKham,
} = require("./data");
const don_thuoc = require("./render/don_thuoc");
const phieu_tom_tat_kham = require("./render/phieuTomTatKham");

function pbcopy(data) {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

const app = express();
const port = process.env.PORT || 3113;

app.use("/", async (req, res) => {
  // const pdf = await don_thuoc(dataDonThuoc);
  const pdf2 = await phieu_tom_tat_kham(dataPhieuTomTatKham);

  // const pdfBase64 = pdf.toString("base64");
  // const pdfBase64_2 = pdf2.toString("base64");
  // pbcopy(pdfBase64_2);
  // pbcopy(pdfBase64);

  res.set("Content-Type", "application/pdf");
  return res.send(pdf2);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}\n`);
});
