const { generatePDF } = require("../lib/generatePDF");

module.exports = async (data) => {
  const html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500&display=swap"
      rel="stylesheet"
    />

    <style>
      * {
        /* margin: 0;   */
        box-sizing: border-box;
        font-size: 15px;
        font-family: "Times New Roman", Times, serif;
      }
      body{
          margin: 0;
      }

      .container {
        /* width: 341px; */
      
        background: #ffffff;
        
      }
      .wrap1 {
        padding-bottom: 12px;
        margin: auto;
        width: 341px;
        height: auto;
      }
      .wrap2 {
        height: auto;
        width: 341px;
        margin: auto;
      }
      .wrap3 {
        padding-top: 14px;
        padding-bottom: 14px;
        width: 341px;
        margin: auto;
        text-align: center;
        font-weight: 600;
      }
      .icon > img {
        width: 58.75px;
        height: 58.75px;
      }
      .title {
        display: flex;
        margin-top: 22px;
        
        
      }
      .title > .icon {
        margin-right: 18.5px;
      }
      .name > b {
        font-size: 23.85px;
        
        margin-bottom: 6.9px;
      }

      .sdt {
        font-size: 14.64px;
        color: #808080;
        margin-top: 6.9px;
      }
      
      .line {
        width:100%;
        height: 1px;
        border-bottom: 1px solid #dcdeec;
      }
      .title2 > h1 {
        font-size: 36px;
        text-align: center;
        font-weight: 700;
      }
      .title2 > p {
        line-height: 24.3px;
        font-size: 19px;

        /* color: #1d2646; */
        text-align: center;
        font-weight: 800;
        margin-bottom: 0;
      }
      .underTitle2{
        margin-top: 14px;
      }
      .textfield {
        margin-top: 21px;
      }
      .textfield > p,
      .info > p {
        font-weight: 400;
        font-size: 15px;
        font-style: normal;
        margin-bottom: 0;
      }
      .info {
        margin-top: 0px;
        display: flex;
      }
      .info > p {
        margin-right: 26px;
        margin-bottom: 0;
      }
      .miniField > h1 {
        margin-top: 22px;
        margin-bottom: 12px;

        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 22px;
        /* identical to box height */

        /* color: #1d2646; */
      }
      
      .miniField > p {
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 17px;
      }
      .footerText {
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 17px;
        text-align: center;

        /* color: #1d2646; */
      }
      .alert {
        font-style: italic;
        font-weight: 400;
        font-size: 15px;
        line-height: 17px;
        text-align: center;
        /* identical to box height */

        color: #f45f5d;
      }
    </style>

    <title>Don thuoc</title>
  </head>

  <body>
    <div class="container">
      <div class="wrap1">
        <div class="title">
          <div class="icon">
            <img
              src="${data.hospital.avatar}"
              alt=""
            />
          </div>
          <div class="word">
            <div class="name"><b>${data.hospital.name}</b></div>
            <div class="sdt">${data.hospital.phone}</div>
          </div>
        </div>
      </div>

      <div class="line"></div>

      <div class="wrap2">
        <div class="title2">
          <h1>STT: 13</h1>
          <p>${data.nhan_vien.benh_vien}</p>
          <p class="underTitle2">${data.nhan_vien.ho_ten}<p/>
          
        </div>
        <div class="textfield">
          <p>Địa chỉ: ${data.nhan_vien.dia_chi}</p>
          <div class="info">
            <p>Giới tính: ${data.nhan_vien.gioi_tinh}</p>
            <p>Năm sinh: ${data.nhan_vien.nam_sinh}</p>
          </div>
          <div class="miniField">
            <h1>Bảo hiểm</h1>
            <p>Số thẻ BHYT:  ${data.nhan_vien.nam_sinh}</p>
            <p>Hạn thẻ đến: ${data.nhan_vien.so_the_BHYT}</p>
            <p>Đối tượng: ${data.nhan_vien.doi_tuong}</p>
            <p>Khám ngày: ${data.nhan_vien.kham_ngay}</p>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="wrap3">
      <p>Quét mã QR để kiểm tra trạng thái khám bệnh</p></div>

      <div class="line"></div>
      <p class="footerText">Người ĐT: Quản trị hệ thống</p>
      <p class="alert">Phiếu chỉ có giá trị trong ngày !</p>
    </div>
  </body>
</html>

  `;

  return await generatePDF(html, "a5");
};
