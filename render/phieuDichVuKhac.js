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
        font-size: 13px;
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
        font-size: 15px;
      }

      .title h2 {
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
        font-size: 13px;
        font-style: normal;
        font-weight: 700;
        padding-bottom: 20px;
        text-align: center;
      }
      
      .textBelowTitle1,
      .textBelowTitle2 {
        
        font-size: 13px;
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
      .col>div>span{
        text-transform: uppercase;
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
        max-height: 55px;
        max-width: 55px;
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
        
        line-height: 11px;
        text-align: center;
        
      }
      .stt{
        width:40px;
      }
      
    </style>
  </head>
  <body>
    <div class="titleWrap">
      <div class="imgTitle">
      ${
        !!data.hospital.avatar
          ? `<img
        class="avatar"
        src=${data.hospital.avatar}
        alt=""
      />`
          : ""
      }
        
      </div>
      <div class="title">
        <h2>S??? Y T??? H??NG Y??N</h2>
        <h2>${data.hospital.name}</h2>
        <div class="textBelowTitle2">
        ??i???n tho???i: ${data.hospital.phone}
        </div>
      </div>
    </div>
    <div class="header1">STT: 13</div>
    <div class="header">${data.hospital.name}</div>
    <div class="contentWrap">
      <div class="c">
        <div class="col">
          <div>H??? v?? t??n b???nh nh??n: <span class="bold"> ${
            data.benh_nhan.ten_benh_nhan
          }</span></div>

          <div>Ng??y sinh: ${data.benh_nhan.ngay_sinh}</div>
        </div>
        <div class="col">
          <div>M?? b???nh nh??n: <span class="bold"> ${
            data.benh_nhan.ma_benh_nhan
          }</span></div>
          <div>Gi???i t??nh: ${data.benh_nhan.gioi_tinh}</div>
        </div>
      </div>
      <div class="thongtincuoi">
        ?????a ch???: ${data.benh_nhan.dia_chi}
      </div>

      <h2 class="contentTitle">D???ch v???</h2>

      <table>
        <tr>
          <td class="stt">STT</td>
          <td>T??n d???ch v???</td>
        </tr>
        ${data.dich_vu
          .map((dich_vu, index) => {
            return `
          <tr>
          <td>${index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
          <th class="">${dich_vu}</th>
        </tr>
          `;
          })
          .join("")}
        
      </table>

      <div class="foot">
        <div>
          <div>S??? th??? BHYT:<span class="bold"> ${
            data.bao_hiem.so_the
          }</span></div>
          <div>?????i t?????ng: <span class="bold"> ${
            data.bao_hiem.doi_tuong
          }</span></div>
        </div>
        <div class="hoaDon">
          <div>H???n th??? ?????n: ${data.bao_hiem.han_the_den}</div>
          <div>Kh??m ng??y: <span class="bold"> ${
            data.bao_hiem.kham_ngay
          }</span></div>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="alert">Phi???u c?? gi?? tr??? trong ng??y</div>
  </body>
</html>

  `;

  return await generatePDF(html, "a5");
};
