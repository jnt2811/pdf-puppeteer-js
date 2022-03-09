const puppeteer = require("puppeteer");

module.exports.generatePDF = async (html = "", format = "a5") => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--use-gl=egl"],
    ignoreDefaultArgs: ["--disable-extensions"],
  });
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf({
    path: "don_thuoc.pdf",
    format,
    margin: {
      top: 20,
      bottom: 50,
    },
  });

  await page.close();
  await browser.close();

  return pdfBuffer;
};
