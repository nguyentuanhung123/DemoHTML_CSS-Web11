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
            var errorMsg = error.responseJSON.userMsg;
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
//Author : NVMANH (08/12/2022)
//EditBy : NVMANH (08/12/2022) - Sửa lại API lấy dữ liệu
function createEvent() {
  try {
    //Add:
    // document.getElementById("btn-add").addEventListener("click", btnAddOnClick);
    $("#btn-add").click(btnAddOnClick);
    $("#btn-close").click(btnCloseOnClick);
    $("#btn-save").click(btnSaveOnClick);
    $("[m-required]").blur(onValidateFieldRequired);

    //dialog close
    $(".icofont-close").click(btnDialogCloseOnClick);
    $("#dialog-notice button.dialog__button--accept").click(
      btnConfirmErrorDialog
    );
  } catch (error) {
    console.log(error);
  }
}

function onValidateFieldRequired() {
  try {
    var value = this.value;
    var label = $(this).attr("field-label");
    if (value.trim() == "" || value == null || value == undefined) {
      this.classList.add("field--error");
      var errorTextEls = $(this).siblings(".error-text");
      if (errorTextEls.length == 0) {
        var errorElHTML = `<div class="error-text" hidden>
                            ${label} không được để trống
                          </div> `;
        $(this).after(errorElHTML);
      }
    } else {
      this.classList.remove("field--error");
      $(this).siblings(".error-text").remove();
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 */
function btnConfirmErrorDialog() {
  try {
    $("#dialog-notice").hide();
    if (fieldErrors.length > 0) {
      //Set focus vào ô lỗi đầu tiên
      fieldErrors[0].focus();
      for (const field of fieldErrors) {
        //add style lỗi :
        field.classList.add("field--error");
        var fieldLabel = $(field).attr("field-label");
        //Bổ sung element thông tin lỗi sau input:
        var errorElHTML = `<div class="error-text" hidden>
                                ${fieldLabel} không được để trống
                            </div> `;
        $(field).after(errorElHTML);
      }
    }
  } catch (eror) {
    console.log(error);
  }
}

// 1 Bấm vào nút thêm thì hiển thi dialog nhập thông tin chi tiết
// 2 Chuyển trang paging

/**
 * Hiển thị form thêm mới nhân viên
 * Author : NVMANH(08/12/2022)
 */
function btnAddOnClick() {
  try {
    //Hiển thị form chi tiết
    //jquery
    // $("#popup-employee-detail").show();
    //js thuần:
    document.getElementById("popup-employee-detail").style.display = "flex";

    //Lấy mã nhân viên mới / Set các giá trị mặc định (nếu có):
    $.ajax({
      type: "GET",
      async: true,
      url: "https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode",
      success: function (response) {
        $("#txtEmployeeCode").val(response);
      },
    });

    //Focus vào ô nhập liệu đầu tiên
    $("#txtEmployeeCode").focus();

    //Xét giá trị mặc định cho các input:
    $("#cbxDepartment").val(null);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Ẩn form nhân viên
 * Author : NVMANH(08/12/2022)
 */
function btnCloseOnClick() {
  try {
    document.getElementById("popup-employee-detail").style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

/**
 * Ẩn form dialog
 * Author : NTHUNG(08/12/2022)
 */
function btnDialogCloseOnClick() {
  try {
    document.getElementById("dialog-notice").style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

/**
 * Cất dữ liệu
 * Author : NVMANH(08/12/2022)
 */
function btnSaveOnClick() {
  try {
    //1. thu thập dữ liệu trên form:
    // const employeeCode = $("#txtEmployeeCode").val(); //-->bắt buộc
    // const employeeName = $("#txtEmployeeName").val(); //-->bắt buộc
    // const gender = $("input[name='gender']:checked").val();
    // const dob = $("#dtDateOfBirth").val(); //--> Không được lớn hơn ngày hiện tại
    // const departmentId = $("#cbxDepartment").val(); //-->bắt buộc
    // const email = $("#txtEmail").val(); //-->Cần đúng định dạng
    // const phoneNumber = $("#txtPhoneNumber").val();
    // const telephoneNumber = $("#txtTelephoneNumber").val();

    //Lấy ra tất cả các field có attribute là property-name:
    let fields = $("[property-name]");
    let employee = {};
    //Duyệt các fields:
    for (const field of fields) {
      //Lấy ra value:
      const value = field.value; //const value = $(field).val() -- jquery
      const propertyName = $(field).attr("property-name");
      employee[propertyName] = value; //gán giá trị vừa nhập vào property-name
    }
    let errorMsgs = [];
    fieldErrors = [];
    //Lấy ra tất cả các trường bắt buộc:
    var fieldRequireds = $("[m-required]");
    for (const field of fieldRequireds) {
      const value = field.value; //$(field).val();
      const fieldLabel = $(field).attr("field-label");
      if (value.trim() == "" || value == null || value == undefined) {
        errorMsgs.push(`${fieldLabel} không được để trống`);
        fieldErrors.push(field);
      }
    }

    //Kiểm tra errorMsg xem có lỗi không ?
    if (errorMsgs.length > 0) {
      //Hiển thị thông báo lỗi
      //1. Build dialog thông báo:
      let dialogNotice = $("#dialog-notice");
      //2. Thay đổi nội dung thông báo
      $("#dialog-notice .dialog__content").empty();
      for (const msg of errorMsgs) {
        $("#dialog-notice .dialog__content").append(`<li>${msg}</li>`);
      }
      // -- Hiển thị:
      // dialogNotice.show();
      document.getElementById("dialog-notice").style.display = "flex";
      return;
    }

    //3. Gọi API cất dữ liệu
    $.ajax({
      type: "POST",
      url: "https://amis.manhnv.net/api/v1/Employees",
      data: JSON.stringify(employee),
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        alert("Thêm thành công");
      },
      error: function (error) {
        alert("Lỗi !!!!!!!!!!!!");
        console.log(error);
        var statusCode = error.status;
        switch (statusCode) {
          case 400:
            var errorMsg = error.responseJSON.userMsg;
            alert(errorMsg);
            break;

          case 500:
            break;

          default:
            break;
        }
      },
    });

    //4. Xử lý thông tin từ API trả về:
  } catch (error) {
    console.log(error);
  }
}

/**
 * Hàm validate email
 * @param {String} emailValue email text
 * @returns true - hợp lệ ; false - không hợp lệ
 * Author : NVMANH (08/12/2022)
 */
function validateEmail(emailValue) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailValue.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}
