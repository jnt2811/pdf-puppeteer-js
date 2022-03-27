const { generatePDF } = require("../lib/generatePDF");

module.exports = async (data) => {
  // ham tinh tong DS hoa don
  const countToTalSum = (ds_nhom_dv = []) => {
    return ds_nhom_dv.reduce((prevVal, nhom_dv) => {
      const ds_dich_vu = nhom_dv.dich_vu;
      const sum = ds_dich_vu.reduce((_prevVal, dich_vu) => {
        return _prevVal + Number(dich_vu.thanh_tien);
      }, 0);
      return prevVal + sum;
    }, 0);
  };

  // ham tinh tong ds dich vu
  const countSum = (ds_dich_vu = []) => {
    return ds_dich_vu.reduce((prevVal, dich_vu) => {
      return prevVal + Number(dich_vu.thanh_tien);
    }, 0);
  };

  const formatPrice = (value) => {
    if (!value) return 0;

    const price = Number(value);

    if (isNaN(price)) return 0;

    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const countQuantity = (ds_nhom_dv = []) => {
    let currentArr = [];
    for (let i = 0; i < ds_nhom_dv.length; i++) {
      currentArr = [...currentArr, ...ds_nhom_dv[i].dich_vu];
    }
    return currentArr.length;
  };

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
        padding-top: 5px;
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
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
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
        text-align: end;
      }
      .date {
        padding-top: 24px;
        font-style: italic;
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
        <h2>SỞ Y TẾ ${data.hospital.so_y_te}</h2>
        <h2>${data.hospital.name}</h2>
        <div class="textBelowTitle1">
          Địa chỉ : ${data.hospital.address}
        </div>
        <div class="textBelowTitle2">
          Điện thoại: ${data.hospital.phone}
        </div>
      </div>
    </div>
    <div class="header">PHIẾU THU PHÍ DỊCH VỤ</div>
    <div class="contentWrap">
      <h2 class="contentTitle">Thông tin bệnh nhân</h2>
      <div class="c">
        <div class="col">
          <div>Mã bệnh nhân: <span class="bold"> ${
            data.benh_nhan.ma_benh_nhan
          }</span></div>
          <div>Giới tính: ${data.benh_nhan.gioi_tinh}</div>
          <div>Số điện thoại: ${data.benh_nhan.sdt}</div>
          <div>Lý do miễn giảm : ${data.benh_nhan.ly_do_mien_giam}</div>
        </div>
        <div class="col">
          <div>Tên bệnh nhân: <span class="bold"> Alex Bách</span></div>
          <div>Đối tượng: Thu phí</div>
          <div>Địa chỉ: Số 18 phố Đại linh, Trung Văn</div>
        </div>
        <div class="col">
          <div>Tuổi: 22</div>
          <div>Ngày sinh: 22/02/2000</div>
        </div>
      </div>

      <table>
        <tr>
          <th>STT</th>
          <th>Tên dịch vụ</th>
          <th>Đơn vị</th>
          <th>Số lượng</th>
          <th>Đơn giá</th>
          <th>Thành tiền</th>
        </tr>

        ${data.nhom_dv
          .map((nhom_dv) => {
            return `
              <tr>
                <th class="noBorder2" colspan="5">${nhom_dv.nhom_dv}</th>
                <th class="noBorder">${formatPrice(
                  countSum(nhom_dv.dich_vu)
                )}</th>
              </tr>
              ${nhom_dv.dich_vu
                .map((dich_vu, index) => {
                  return `
                    <tr>
                      <td>${index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                      <td>${dich_vu.ten_dich_vu}</td>
                      <td>${dich_vu.don_vi}</td>
                      <td>${dich_vu.so_luong}</td>
                      <td>${formatPrice(dich_vu.don_gia)}</td>
                      <td>${formatPrice(dich_vu.thanh_tien)}</td>
                    </tr>`;
                })
                .join("")}
              `;
          })
          .join("")}

        <tr>
          <td colspan="5" class="total">Tổng cộng</td>
          <th class="totalText">${formatPrice(countToTalSum(data.nhom_dv))}</th>
        </tr>
      </table>
      <div class="foot">
        <div>Cộng khoản: ${
          countQuantity(data.nhom_dv) < 10
            ? `0${countQuantity(data.nhom_dv)}`
            : countQuantity(data.nhom_dv)
        }</div>

        <div class="hoaDon">
          <div class="hoadonTotal">
            <div class="hoadonTotal2">
              <div class="tenTien">
                <div>(1)Tổng số tiền:</div>
                <div>(2) Miễn giảm:</div>
              </div>
              <div>
                <div class="tien">
                  <div>${formatPrice(countToTalSum(data.nhom_dv))}</div>
                  <div>${formatPrice(data.mien_giam)}</div>
                </div>
              </div>
            </div>
            <div class="hoadonTotal3">
              <div class="tenTien">
                <div>(3) = (1) - (2) Tiền khách hàng:</div>
              </div>

              <div class="tien">
                <div>${formatPrice(
                  countToTalSum(data.nhom_dv) - data.mien_giam
                )}</div>
              </div>
            </div>
            <div class="date">${data.ngay_tao}</div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

  `;

  return await generatePDF(html, "a4");
};
