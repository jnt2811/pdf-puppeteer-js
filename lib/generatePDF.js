const puppeteer = require("puppeteer");

module.exports.generatePDF = async (html = "", format = "a5") => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf({
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
