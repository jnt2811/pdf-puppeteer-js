const { generatePDF } = require("../lib/generatePDF");

module.exports = async (data) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        * {
          box-sizing: border-box;
          font-size: 13px;
          font-family: "Times New Roman", Times, serif;
        }
        
        body {
          font-family: "Cabin";
          padding: 0px;
          margin: 0px;
        }
        
        .w-50 {
          // width: 50%;
        }

        .header {
          padding: 0px 25px;
        }
        
        .logo {
          min-width: 40px;
          width: 40px;
          height: 40px;
        }
        
        .logo img {
          width: 100%;
          height: 100%;
        }
        
        .time-title {
          margin-bottom: 3px;
        }
        
        .hospital {
          font-weight: bold;
          font-size: 20px;
        }
        
        .hotline {
          font-weight: normal;
        }
        
        .title {
          font-size: 30px;
          text-transform: uppercase;
          font-weight: bold;
          padding-block: 20px;
          border-bottom: 0.5px solid #D0D0D0;
          
        }
        
        .body {
          padding: 0 25px;
        }
        
        .body .wrapper {
          border-bottom: 0.5px solid #D0D0D0;
          padding-block: 15px;
        }
        
        .body .wrapper:last-child {
          border: none;
        }
        
        .label {
          font-weight: bold;
        }
        
        .drug {
          margin-bottom: 10px;
        }

        .drug .quantity {
          white-space: nowrap;
        }
        
        .drug:last-child {
          margin-bottom: 0px;
        }
        
        .drug * {
          font-size: 15px;
        }
        
        .drug .name {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .drug .usage {
          font-size: 12px;
        }
        
        .drug .usage span {
          font-weight: 600;
          font-size: 12px;
        }
        
        .message,
        .sign-ctn {
          width: 50%;
        }
        
        .message .subtitle {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .message .content {
          font-size: 12px;
        }
        
        .sign {
          margin-right: 50px;
        }
        
        .sign .subtitle {
          font-size: 15px;
          font-weight: 600;
        }
        
        .sign .doctor {
          margin-top: 100px;
          font-weight: 600;
        }
        
        .note {
          font-style: italic;
          font-size: 12px;
          margin-top: 50px;
        }
        
        .re-check {
          font-size: 15px;
        }
        
        .re-check span {
          font-size: 15px;
          font-weight: 600;
        }    

        .d-flex {
          display: flex;
          gap: 10px;
        }
        .d-flex.align-items-center {
          align-items: center;
        }
        .d-flex.justify-content-between {
          justify-content: space-between;
        }
        .d-flex.justify-content-center {
          justify-content: center;
        }
        .text-center {
          text-align: center;
        }
        .text-right {
          text-align: end;
        }
        .mb-3 {
          margin-bottom: 10px;
        }

        .total {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .date-xxx {
          font-weight: 600;
        }
      </style>

      <title>Don thuoc</title>
    </head>

    <body>
      <div class="header">
        <div class="d-flex align-items-center">
          ${
            !!data.hospital.avatar
              ? `<div class="logo d-flex align-items-center justify-content-center">
              <img src=${data.hospital.avatar} alt="" />
            </div>`
              : ""
          }

          <div>
            <div class="hospital">${data.hospital.name}</div>
            <div class="hotline">Địa chỉ: ${data.hospital.address}</div>
          </div>
        </div>
      </div>
  
      <div class="title text-center">Đơn thuốc</div>
  
      <div class="body">
        <div class="wrapper">
          <div class="d-flex justify-content-between mb-3">
            <div><span class="label">Họ & Tên: </span>${
              data.benh_nhan.ho_ten
            }</div>
  
            <div><span class="label">Độ tuổi: </span>${
              data.benh_nhan.tuoi
            }</div>
  
            <div><span class="label">Giới tính: </span>${
              data.benh_nhan.gioi_tinh
            }</div>
          </div>
  
          <div class="mb-3">
            <span class="label">Địa chỉ: </span>${data.benh_nhan.dia_chi}
          </div>
  
          <div class="mb-3">
            <span class="label">Sinh hiệu: </span>${data.sinh_hieu}
          </div>
  
          <div>
            <span class="label">Chẩn đoán bệnh chính: </span>${data.chuan_doan_benh_chinh
              .map((item, index) => (index != 0 ? ", " : "") + item.ten_benh)
              .join("")}
          </div>
        </div>
  
        <div class="wrapper">
          ${data.thuoc
            .map(
              (item, index) =>
                `<div class="drug d-flex align-items-center justify-content-between">
                <div>
                  <div class="name">${index + 1}. ${item.ten_thuoc}</div>
                  <div class="usage">
                    <span>Cách dùng: </span>${item.cach_dung}
                  </div>
                </div>
                <div class="quantity">${item.so_luong}</div>
              </div>`
            )
            .join("")}
        </div>
  
        <div class="wrapper">
          <div class="d-flex justify-content-between">
            <div class="total">Cộng khoản: ${data.thuoc.length}</div>

            <div style="margin-right: 28px;">${data.date}</div>
          </div>

          <div class="d-flex justify-content-between">
            <div class="message">
              <div class="subtitle">Lời dặn:</div>
              <div class="content">
                ${data.loi_dan}
              </div>
            </div>
  
            <div class="sign text-center">
              <div class="subtitle">Bác sĩ kê đơn</div>
              <div class="doctor">${data.bac_si.ho_ten}</div>
            </div>
          </div>
  
          ${
            !!data.ngay_tai_kham
              ? `<div class="note">Khám lại đem theo đơn thuốc này</div>`
              : ""
          }
        </div>
  
        ${
          !!data.ngay_tai_kham
            ? `<div class="wrapper re-check"><span>Ngày tái khám: </span>${data.ngay_tai_kham}</div>`
            : ""
        }
      </div>
    </body>
  </html>`;

  return await generatePDF(html, "a5");
};
