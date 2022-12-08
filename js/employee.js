loadData();
createEvent();
// Load data:
/*
  Lấy dữ liệu
  Author : NVMANH (05/12/2022)
  EditBy : NVMANH (05/12/2022) - Sửa lại API lấy dữ liệu
*/

function loadData() {
  try {
    // Gọi API lấy dữ liệu
    $.ajax({
      type: "GET",
      url: "https://amis.manhnv.net/api/v1/Employees",
      success: function (response) {
        console.log(response);
        // Xử lý dữ liệu
        // 1. Định dạng ngày tháng ===> ngày/tháng/năm
        $("#tbEmployeeList tbody").empty();
        for (const emp of response) {
          var employeeCode = emp.EmployeeCode;
          var fullName = emp["EmployeeName"];
          var genderName = emp.GenderName;
          var dob = emp["DateOfBirth"];
          var salary = Math.round(Math.random(0, 1) * 1000000);
          salary = new Intl.NumberFormat("vi", {
            style: "currency",
            currency: "VND",
          }).format(salary);
          var trHTML = `<tr>
          <td class="text-align--left">1</td>
          <td class="text-align--left">${employeeCode || ""}</td>
          <td class="text-align--left">${fullName || ""}</td>
          <td class="text-align--left">${genderName || ""}</td>
          <td class="text-align--center">${dob || ""}</td>
          <td class="text-align--right">${salary || ""}</td>
      </tr>`;
          $("#tbEmployeeList tbody").append(trHTML);
        }
        // 2. Định dạng tiền tệ (1000000 -> 1.000.000)

        // Hiển thị dữ liệu lên table
      },
      error: function (error) {
        console.log(error);
        var statusCode = error.status;
        switch (statusCode) {
          case 400:
            var errorMsg = error.response.userMsg;
            alert(errorMsg);
            break;

          case 500:
            break;

          default:
            break;
        }
      },
    });

    // Handle lỗi từ API (nếu có)
  } catch (e) {}
}

// Lập trình cho các sự kiện:
function createEvent() {}

// 1 Bấm vào nút thêm thì hiển thi dialog nhập thông tin chi tiết
// 2 Chuyển trang paging
