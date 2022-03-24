const { generatePDF } = require("../lib/generatePDF");

module.exports = async (data) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      * {
        box-sizing: border-box;
        font-size: 14px;
        font-family: "Times New Roman", Times, serif;
      }
      body {
        padding: 0px;
        margin: 0px;
      }
      h1 {
        font-size: 40px;
        margin: 10px 0px 20px 0px;
      }
      h2 {
        font-size: 20px;
      }
      .d-flex {
        display: flex;
      }
      .wrapper {
        padding: 20px 70px;
        border-bottom: 1px solid #EBEBEB;
      }
      .wrap-1 {
        gap: 15px;
        padding-top: 0px;
      }
      .justify-center {
        justify-content: center;
      }
      .wrap-1 h2 {
        margin: 0px;
        width: 50vw;
      }
      .wrap-3 {
        margin: -15px 0px -10px 0px;
        gap: 50px;
      }
      .title-1 {
        text-align: center;
      }
      .avatar {
        width: 40px;
        height: 40px;
      }
      .footer {
        position: absolute;
        bottom: 0px;
        text-align: center;
        width: 100%;
        border-top: 1px solid #ebebeb;
        padding-top: 20px;
      }
      .warning {
        margin-top: 5px;
        font-style: italic;
      }
    </style>

    <title>Don thuoc</title>
  </head>

  <body>

      <div class="wrapper d-flex justify-center wrap-1">
        <img
          src="${data.hospital.avatar}"
          alt=""
          class="avatar"
        />

        <div class="word">
          <h2>${data.hospital.name}</h2>
          <div class="sdt">${data.hospital.phone}</div>
        </div>
      </div>

      <div class="wrapper">
        <div class="title-1">
          <h1>STT: 13</h1>
          <h2>${data.nhan_vien.benh_vien}</h2>
          <h2>${data.nhan_vien.ho_ten}</h2>
        </div>

        <div class="textfield">
          <p>Địa chỉ: ${data.nhan_vien.dia_chi}</p>

          <div class="d-flex wrap-3">
            <p>Giới tính: ${data.nhan_vien.gioi_tinh}</p>
            <p>Năm sinh: ${data.nhan_vien.nam_sinh}</p>
          </div>

          <h2>Bảo hiểm</h2>

          <p>Số thẻ BHYT:  ${data.nhan_vien.nam_sinh}</p>
          <p>Hạn thẻ đến: ${data.nhan_vien.so_the_BHYT}</p>
          <p>Đối tượng: ${data.nhan_vien.doi_tuong}</p>
          <p style="margin-bottom: 0px">Khám ngày: ${data.nhan_vien.kham_ngay}</p>
        </div>
      </div>

      <p style="text-align: center">Quét mã QR để kiểm tra trạng thái khám bệnh</p>

      <div class="footer">
        <div>Người ĐT: Quản trị hệ thống</div>
        <div class="warning">Phiếu chỉ có giá trị trong ngày!</div>
      </div>
  </body>
</html>

  `;

  return await generatePDF(html, "a5");
};
