const { generatePDF } = require("../lib/generatePDF");

module.exports = async (data) => {
  const html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        font-family: "Times New Roman", Times, serif;
        font-size: 10px;
      }
      .titleWrap {
        display: flex;
        flex-direction: row;
        padding-left: 20px;
        padding-right: 20px;
      }
      h2 {
        margin-block: 0;
        margin-bottom: 5px;
        font-size: 12px;
      }

      .title {
        font-weight: 700;

        text-transform: uppercase;
      }
      .header1 {
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 34px;
        padding-top: 10px;
        padding-bottom: 5px;
        text-align: center;
      }
      .header {
        font-size: 10px;
        font-style: normal;
        font-weight: 700;
        /* padding-top: 40px; */
        padding-bottom: 30px;
        text-align: center;
      }
      .textBelowTitle1,
      .textBelowTitle2 {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        padding-bottom: 2px;
      }
      .textBelowTitle1 {
        padding-top: 5px;
      }
      .title > div:first-child {
        padding-bottom: 5px;
      }
      .contentWrap {
        padding: 20px;
        padding-top: 0px;
      }
      .thongtincuoi {
        padding-bottom: 10px;
      }
      .c {
        display: flex;
        flex-direction: row;
        /* padding-bottom: 10px; */
      }
      .col {
        display: flex;
        flex-direction: column;
        width: 50%;
      }
      .col > div {
        padding-bottom: 10px;
      }
      .contentTitle {
        padding-top:5px;
        padding-bottom: 5px;
      }
      .bold {
        font-weight: bold;
      }
      th,
      td {
        padding: 10px;
        border: 0.5px solid #333333;
        box-sizing: border-box;
        text-align: start;
      }
      .noBorder2 {
        border-right: none;
      }
      thead > td {
        font-weight: 700;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      .noBorder {
        border-left: none;
      }
      .total {
        text-align: end;
        border-right: none;
      }
      .totalText {
        border-left: none;
      }
      .foot {
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
      }
      .foot > div > div {
        padding-bottom: 5px;
      }
      .hoaDon {
        display: flex;
        flex-direction: column;
      }
      .hoadonTotal {
        display: flex;
        justify-content: space-between;
        min-width: 280px;

        flex-direction: column;
      }
      .hoadonTotal2,
      .hoadonTotal3 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .hoadonTotal2 {
        border-bottom: 1px solid black;
      }
      .hoadonTotal3 {
        padding-top: 10px;
      }

      .hoadonTotal > div {
        white-space: nowrap;
        overflow: hidden;
      }

      .tien > div,
      .tenTien > div {
        padding-bottom: 10px;
      }
      .date {
        padding-top: 24px;
        font-style: italic;
        float: right;
      }
      .avatar {
        max-height: 69px;
        max-width: 69px;
        padding-right: 15px;
      }
      .line {
        border-bottom: 0.5px dashed #000000;
      }
      .alert {
        padding-top: 30px;
        padding-bottom: 30px;
        font-style: italic;
        font-weight: 400;
        font-size: 10px;
        line-height: 11px;
        text-align: center;
        color: #f34946;
      }
    </style>
  </head>
  <body>
    <div class="titleWrap">
      <div class="imgTitle">
        <img
          class="avatar"
          src="https://printgo.vn/uploads/file-logo/1/x512x512.747d5219a89da42fe2408c84760b2bf3.ai.1.png.pagespeed.ic.onO18wiIuj.webp"
          alt=""
        />
      </div>
      <div class="title">
        <h2>SỞ Y TẾ HƯNG YÊN</h2>
        <h2>${data.hospital.name}</h2>
        <div class="textBelowTitle1">
        ${data.hospital.address}
        </div>
        <div class="textBelowTitle2">
        ${data.hospital.phone}
        </div>
      </div>
    </div>
    <div class="header1">STT: 13</div>
    <div class="header">${data.hospital.name}</div>
    <div class="contentWrap">
      <h2 class="contentTitle">Thông tin bệnh nhân</h2>
      <div class="c">
        <div class="col">
          <div>Họ và tên bệnh nhân: <span class="bold"> ${
            data.benh_nhan.ten_benh_nhan
          }</span></div>

          <div>Ngày sinh: ${data.benh_nhan.ngay_sinh}</div>
        </div>
        <div class="col">
          <div>Mã bệnh nhân: <span class="bold"> ${
            data.benh_nhan.ma_benh_nhan
          }</span></div>
          <div>Giới tính: ${data.benh_nhan.gioi_tinh}</div>
        </div>
      </div>
      <div class="thongtincuoi">
        Địa chỉ: ${data.benh_nhan.dia_chi}
      </div>

      <h2 class="contentTitle">Dịch vụ</h2>

      <table>
        <tr>
          <td>STT</td>
          <td>Tên dịch vụ</td>
        </tr>
        ${data.dich_vu.map((dich_vu, index) => {
          return `
          <tr>
          <td>${index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
          <th class="">${dich_vu}</th>
        </tr>
          `;
        })}
        
      </table>
      <div class="foot">
        <div>
          <div>Số thẻ BHYT:<span class="bold"> ${
            data.bao_hiem.so_the
          }</span></div>
          <div>Đối tượng: <span class="bold"> ${
            data.bao_hiem.doi_tuong
          }</span></div>
        </div>
        <div class="hoaDon">
          <div>Hạn thẻ đến: ${data.bao_hiem.han_the_den}</div>
          <div>Khám ngày: <span class="bold"> ${
            data.bao_hiem.kham_ngay
          }</span></div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="alert">Phiếu có giá trị trong ngày</div>
  </body>
</html>

  `;

  return await generatePDF(html, "a5");
};
