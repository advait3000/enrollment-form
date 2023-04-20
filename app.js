let id = "no";
let arr = [];
//retrieves the data from localStorage and returns it as an array
function getLocalStg() {
  arr = JSON.parse(localStorage.getItem("crud"));
  return arr;
}
//takes an array and stores it in localStorage after converting it to a string
function setLocalStg(arr) {
  localStorage.setItem("crud", JSON.stringify(arr));
}
function manageData() {
  document.getElementById("msg").innerHTML = "";
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  let phoneNumber = document.getElementById("phoneNumber").value;

  // Check if all fields are entered
  if (!name || !age || !city || !email || !phoneNumber) {
    
    document.getElementById("msg").innerHTML = "Alert: Please enter all input fields";
    setTimeout(function () {
      document.getElementById("msg").innerHTML = "";
    }, 5000);
    return;
  }
  // Validate phone number
  if (phoneNumber.length!==10) {
    document.getElementById("msg").innerHTML = "Alert: Please enter valid mobile number";
    setTimeout(function () {
      document.getElementById("msg").innerHTML = "";
    }, 5000);
    return;
  }
  if (age.length!==1 && age.length!==2) {
    document.getElementById("msg").innerHTML = "Alert: Please enter valid age";
    setTimeout(function () {
      document.getElementById("msg").innerHTML = "";
    }, 5000);
    return;
  }

  let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validEmail.test(email)) {
    document.getElementById("msg").innerHTML = "Alert: Please enter valid email address";
    setTimeout(function () {
      document.getElementById("msg").innerHTML = "";
    }, 5000);
    return;
  }
  let data = { name, age, city, email, phoneNumber };
  if (arr == null) {
    setLocalStg([data]);
  } else {
    if (id == "no") {
      arr.push(data);
      setLocalStg(arr);
      writeTable();
      document.getElementById("msg").innerHTML = "Alert: Data Added Successfully";
      setTimeout(function () {
        document.getElementById("msg").innerHTML = "";
      }, 5000);
    } else {
      arr[id] = data;
      id = "no";
      document.getElementById("submit").innerHTML="Submit"
      setLocalStg(arr);
      writeTable();
      document.getElementById("msg").innerHTML = "Alert: Data Edited Successfully";
      setTimeout(function () {
        document.getElementById("msg").innerHTML = "";
      }, 5000);
    }
  }
 document.getElementById("name").value="";
 document.getElementById("age").value="";
document.getElementById("city").value="";
document.getElementById("email").value="";
document.getElementById("phoneNumber").value="";
}

function writeTable() {
  arr = getLocalStg();
  if (arr != null) {
    let html = "";
    let sno = 1;
    for (let k in arr) {
      html =
        html +
        `<tr><td>${sno}</td>
                <td>${arr[k].name}</td>
                <td>${arr[k].age}</td>
                <td>${arr[k].city}</td>
                <td>${arr[k].email}</td>
                <td>${arr[k].phoneNumber}</td>
                <td><a href="javascript:void(0)" onclick="editData(${k})">Edit</a>&nbsp;<a href="javascript:void(0)" onclick="deleteData(${k})">Delete</a></td></tr>`;
      sno++;
    }
    document.getElementById("root").innerHTML = html;
  }
}

function editData(rowId) {
  document.getElementById("submit").innerHTML="Update"
  id = rowId;
  arr = getLocalStg();
  document.getElementById("name").value = arr[rowId].name;
  document.getElementById("age").value = arr[rowId].age;
  document.getElementById("city").value = arr[rowId].city;
  document.getElementById("email").value = arr[rowId].email;
  document.getElementById("phoneNumber").value = arr[rowId].phoneNumber;
}

function deleteData(rowId) {
  arr = getLocalStg();
  arr.splice(rowId, 1);
  setLocalStg(arr);
  writeTable();
  document.getElementById("msg").innerHTML = "Alert: Data Deleted Successfully";
  setTimeout(function () {
    document.getElementById("msg").innerHTML = "";
  }, 5000);
}
function resetData() {
  arr = [];
  setLocalStg(arr);
  writeTable();
  document.getElementById("msg").innerHTML = "Alert: Form Reset Successfully";
    setTimeout(function () {
      document.getElementById("msg").innerHTML = "";
    }, 5000);
}
writeTable();