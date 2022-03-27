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
          padding-left: 50px;
          padding-right: 50px;
        }
        h2 {
          margin-block: 0;
          margin-bottom: 5px;
          font-size: 16px;
        }
  
        .title {
          font-weight: 700;
  
          text-transform: uppercase;
        }
        .header {
          font-size: 28px;
          font-style: normal;
          font-weight: 700;
          line-height: 32px;
          padding-top: 40px;
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
          padding-top: 10px;
        }
        .title > div:first-child {
          padding-bottom: 5px;
        }
        .contentWrap {
          padding: 50px;
          padding-top: 0px;
        }
        .c {
          display: flex;
          flex-direction: row;
          padding-bottom: 10px;
        }
        .col {
          display: flex;
          flex-direction: column;
          width: 33.33%;
        }
        .col > div {
          padding-bottom: 10px;
        }
        .contentTitle {
          padding-bottom: 10px;
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
          /* display: flex;
          justify-content: space-between; */
          padding-top: 15px;
        }
        .foot > div {
          padding-bottom: 12px;
        }
        .hoaDon {
          display: flex;
          justify-content: space-between;
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
      </style>
    </head>
    <body>
      <div class="titleWrap">
        <div class="imgTitle">
          <img
            class="avatar"
            src="${data.hospital.avatar}"
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
            Điện thoại: ${data.hospital.phone}
          </div>
        </div>
      </div>
      <div class="header">PHIẾU TÓM TẮT KHÁM</div>
      <div class="contentWrap">
        <h2 class="contentTitle">Thông tin bệnh nhân</h2>
        <div class="c">
          <div class="col">
            <div>Mã bệnh nhân: <span class="bold"> ${
              data.benh_nhan.ma_benh_nhan
            }</span></div>
            <div>Ngày sinh: ${data.benh_nhan.ngay_sinh}</div>
          </div>
          <div class="col">
            <div>Tên bệnh nhân: <span class="bold"> ${
              data.benh_nhan.ten_benh_nhan
            }</span></div>
            <div>Giới tính: ${data.benh_nhan.gioi_tinh}</div>
          </div>
          <div class="col">
            <div>Đối tượng: ${data.benh_nhan.doi_tuong}</div>
            <div>Số điện thoại: ${data.benh_nhan.sdt}</div>
          </div>
        </div>
  
        <h2 class="contentTitle">Chỉ số sinh tồn</h2>
  
        <table>
          <tr>
            <td>Mạch: <span class="bold">${
              data.chi_so_sinh_ton.mach
            }</span> lần/phút</td>
            <td>Nhiệt độ: <span class="bold">${
              data.chi_so_sinh_ton.nhiet_do
            }</span> độ C</td>
            <td>Sp02: <span class="bold"> ${
              data.chi_so_sinh_ton.Sp02
            }</span> %</td>
          </tr>
          <tr>
            <td class="">Nhịp thở: <span class="bold">${
              data.chi_so_sinh_ton.nhip_tho
            }</span> nhịp/phút</td>
            <td class="" colspan="2">
              Huyết áp: 
              ${data.chi_so_sinh_ton.huyet_ap.map((huyet_ap, currentValue) => {
                return `
                  <span class="bold">${huyet_ap}</span> mmHg 
                  `;
              })}
              
              
            </td>
          </tr>
        </table>
        <div class="foot">
          <div>
            <span class="bold">Lý do khám</span>:  ${
              data.tom_tat_kham.ly_do_kham
            }
          </div>
          <div>
            <span class="bold">Quá trình bệnh lý</span>:${
              data.tom_tat_kham.qua_trinh_benh_ly
            }
          </div>
          <div>
            <span class="bold">Tiền sử bản thân</span>: ${
              data.tom_tat_kham.tien_su_ban_than
            }
          </div>
          <div>
            <span class="bold">Tiền sử gia đình</span>: ${
              data.tom_tat_kham.tien_su_gia_dinh
            }
          </div>
          <div>
            <span class="bold">Khám lâm sàng</span>: ${
              data.tom_tat_kham.kham_lam_sang
            }
          </div>
          <div>
          <span class="bold">Mã bệnh chính:</span> 
          ${data.tom_tat_kham.ma_benh_chinh.map((ma_benh_chinh, index) => {
            return `
            <span class="bold">${ma_benh_chinh}</span> - Bệnh chính ${index + 1}
              `;
          })}
            
          </div>
          <div>
          <span class="bold">Mã bệnh kèm theo: </span> 
          ${data.tom_tat_kham.ma_benh_kem_theo.map(
            (ma_benh_kem_theo, index) => {
              return `
            <span class="bold">${ma_benh_kem_theo}</span> - Bệnh kèm theo ${
                index + 1
              }
              `;
            }
          )}
            
          </div>
          <div>
            <span class="bold">Chẩn đoán lâm sàng</span>:  ${
              data.tom_tat_kham.chan_doan_lam_sang
            }
          </div>
          <div>
            <span class="bold">Chẩn đoán xác định</span>:  ${
              data.tom_tat_kham.chan_doan_xac_dinh
            }
          </div>
          <div>
            <span class="bold">Cách giải quyết</span>:  ${
              data.tom_tat_kham.cach_giai_quyet
            }
          </div>
          <div>
            <span class="bold">Ghi chú</span>:  ${data.tom_tat_kham.ghi_chu}
          </div>
          <div>
            <span class="bold">Kết quả điều trị</span>:  ${
              data.tom_tat_kham.ket_qua_dieu_tri
            }
          </div>
          <div>
            <span class="bold">Xử trí</span>:  ${data.tom_tat_kham.xu_tri}
          </div>
          <div class="date">${data.ngay_tao}</div>
        </div>
      </div>
    </body>
  </html>

  `;

  return await generatePDF(html, "a4");
};
