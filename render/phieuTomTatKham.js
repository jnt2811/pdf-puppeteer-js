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
        .title h2 {
          text-transform: uppercase;
          font-weight: 700;
        }
        .header {
          font-size: 28px;
          font-style: normal;
          font-weight: 700;
          line-height: 32px;
          padding-top: 25px;
          padding-bottom: 25px;
          text-align: center;
        }
        .textBelowTitle1,
        .textBelowTitle2 {
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          padding-bottom: 2px;
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
          white-space: nowrap;
          overflow: hidden;
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
        table tr td {
            width: 33.333%;
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
          line-height: 1.6;
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
          <h2>S??? Y T???  ${data.hospital.so_y_te}</h2>
          <h2>${data.hospital.name}</h2>
          <div class="textBelowTitle1">
          ?????a ch???: ${data.hospital.address}
          </div>
          <div class="textBelowTitle2">
            ??i???n tho???i: ${data.hospital.phone}
          </div>
        </div>
      </div>
      <div class="header">PHI???U T??M T???T KH??M</div>
      <div class="contentWrap">
        <h2 class="contentTitle">Th??ng tin b???nh nh??n</h2>
        <div class="c">
          <div class="col">
            <div>M?? b???nh nh??n: <span class="bold"> ${
              data.benh_nhan.ma_benh_nhan
            }</span></div>
            <div>Ng??y sinh: ${data.benh_nhan.ngay_sinh}</div>
          </div>
          <div class="col">
            <div>T??n b???nh nh??n: <span class="bold"> ${
              data.benh_nhan.ten_benh_nhan
            }</span></div>
            <div>Gi???i t??nh: ${data.benh_nhan.gioi_tinh}</div>
          </div>
          <div class="col">
            <div>?????i t?????ng: ${data.benh_nhan.doi_tuong}</div>
            <div>S??? ??i???n tho???i: ${data.benh_nhan.sdt}</div>
          </div>
        </div>

        <h2 class="contentTitle">Ch??? s??? sinh t???n</h2>

        <table>
          <tr>
            <td>M???ch: <span class="bold">${
              data.chi_so_sinh_ton.mach
            }</span> l???n/ph??t</td>

            <td>Nhi???t ?????: <span class="bold">${
              data.chi_so_sinh_ton.nhiet_do
            }</span> ????? C</td>

            <td>Sp02: <span class="bold"> ${
              data.chi_so_sinh_ton.Sp02
            }</span> %</td>
          </tr>

          <tr>
            <td>Nh???p th???: <span class="bold">${
              data.chi_so_sinh_ton.nhip_tho
            }</span> nh???p/ph??t</td>

            <td colspan="2">
              Huy???t ??p:
              ${data.chi_so_sinh_ton.huyet_ap
                .map((huyet_ap) => {
                  return `
                  <span class="bold">${huyet_ap}</span> mmHg
                  `;
                })
                .join("-")}

            </td>
          </tr>
        </table>
        <div class="foot">
          <div>
            <span class="bold">L?? do kh??m</span>:  ${
              data.tom_tat_kham.ly_do_kham
            }
          </div>
          <div>
            <span class="bold">Qu?? tr??nh b???nh l??</span>:${
              data.tom_tat_kham.qua_trinh_benh_ly
            }
          </div>
          <div>
            <span class="bold">Ti???n s??? b???n th??n</span>: ${
              data.tom_tat_kham.tien_su_ban_than
            }
          </div>
          <div>
            <span class="bold">Ti???n s??? gia ????nh</span>: ${
              data.tom_tat_kham.tien_su_gia_dinh
            }
          </div>
          <div>
            <span class="bold">Kh??m l??m s??ng</span>: ${
              data.tom_tat_kham.kham_lam_sang
            }
          </div>
          <div>
          <span class="bold">M?? b???nh ch??nh:</span>
          <span class="bold">${data.tom_tat_kham.ma_benh_chinh.id}</span> - ${
    data.tom_tat_kham.ma_benh_chinh.name
  }
          </div>
          <div>
          <span class="bold">M?? b???nh k??m theo:</span>
          ${data.tom_tat_kham.ma_benh_kem_theo
            .map((ma_benh_kem_theo) => {
              return `
            <span class="bold">${ma_benh_kem_theo.id}</span> - ${ma_benh_kem_theo.name}`;
            })
            .join(";")}

          </div>
          <div>
            <span class="bold">Ch???n ??o??n l??m s??ng</span>:  ${
              data.tom_tat_kham.chan_doan_lam_sang
            }
          </div>
          <div>
            <span class="bold">Ch???n ??o??n x??c ?????nh</span>:  ${
              data.tom_tat_kham.chan_doan_xac_dinh
            }
          </div>
          <div>
            <span class="bold">C??ch gi???i quy???t</span>:  ${
              data.tom_tat_kham.cach_giai_quyet
            }
          </div>
          <div>
            <span class="bold">Ghi ch??</span>:  ${data.tom_tat_kham.ghi_chu}
          </div>
          <div>
            <span class="bold">K???t qu??? ??i???u tr???</span>:  ${
              data.tom_tat_kham.ket_qua_dieu_tri
            }
          </div>
          <div>
            <span class="bold">X??? tr??</span>:  ${data.tom_tat_kham.xu_tri}
          </div>
          <div class="date">${data.ngay_tao}</div>
        </div>
      </div>
    </body>
  </html>

  `;

  return await generatePDF(html, "a4");
};
