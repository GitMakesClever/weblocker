window.addEventListener("DOMContentLoaded", function () {
  const closeBtnOne = document.querySelector(".closeTwo");
  const closeBtnTwo = document.querySelector(".closeOne");
  const fetchBtn = document.querySelector(".showMyData");
  const tableBody = document.querySelector("#dataList");
  const modalTwo = document.querySelector(".modalTwo");
  const modalOne = document.querySelector(".modalOne");

  const dataForm = document.getElementById("dataForm");
  const platformInput = document.getElementById("platformInput");
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");

  const editForm = document.querySelector(".editForm");
  const editIndex = document.getElementById("editIndex");
  const editPlatformInput = document.getElementById("editPlatformInput");
  const editUsernameInput = document.getElementById("editUsernameInput");
  const editPasswordInput = document.getElementById("editPasswordInput");

  dataForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const platform = platformInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if (platform !== "" && username !== "" && password !== "") {
      const user = {
        platform: platform,
        username: username,
        password: password,
      };
      addToLocalStorage(user);
      loadStoredData();
      dataForm.reset();
    } else {
      alert("Please Fill All Details");
    }
  });

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const index = editIndex.value.trim();
    const newPlatform = editPlatformInput.value.trim();
    const newUsername = editUsernameInput.value.trim();
    const newPassword = editPasswordInput.value;
    if (newPlatform !== "" && newUsername !=="" && newPassword !== "") {
      const storedData = JSON.parse(localStorage.getItem("myData")) || [];
      storedData[index].platform = newPlatform;
      storedData[index].username = newUsername;
      storedData[index].password = newPassword;
      localStorage.setItem("myData", JSON.stringify(storedData));
      editForm.reset();
      modalOne.style.display = "none";
      loadStoredData();
    } else {
      alert("Please Fill All Details");
    }
  });

  function addToLocalStorage(user) {
    const storedData = JSON.parse(localStorage.getItem("myData")) || [];
    storedData.push(user);
    localStorage.setItem("myData", JSON.stringify(storedData));
  }

  loadStoredData();
// edit and deletle function
  function editData() {
    const index = this.dataset.index;
    const storedData = JSON.parse(localStorage.getItem("myData")) || [];
    const data = storedData[index];
    editIndex.value = index;
    editPlatformInput.value = data.platform;
    editUsernameInput.value = data.username;
    editPasswordInput.value = data.password;
    modalOne.style.display = "block";
    modalTwo.style.display = "none";

  }

  function deletaData() {
    if (confirm("Are You Sure to Delete ?")) {
      const index = this.dataset.index;
      const storedData = JSON.parse(localStorage.getItem("myData")) || [];
      storedData.splice(index, 1);
      localStorage.setItem("myData", JSON.stringify(storedData));
      loadStoredData();
    }
  }
// Fetch Button open listener
  fetchBtn.addEventListener("click", function () {
    modalTwo.style.display = "block";
  });
// closeButtonone click listener to modalTwo close
  closeBtnOne.addEventListener("click", function () {
    modalTwo.style.display="none";
  });
// closeButtonTwo click listener to modalOne close
  closeBtnTwo.addEventListener("click" , function () {
    modalOne.style.display="none";
  });

  // window listener modalOne and modalTwo closing...
  window.addEventListener("click", function (e) {
    if(e.target == modalOne){
      modalOne.style.display="none";
    }
  })
  window.addEventListener("click", function (e) {
    if(e.target == modalTwo){
      modalTwo.style.display="none";
    }
  })

  function loadStoredData() {
    const storedData = JSON.parse(localStorage.getItem("myData")) || [];
    tableBody.innerHTML = "";
    storedData.forEach(function (data, index) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.platform}</td>
        <td>${data.username}</td>
        <td>${data.password}</td>
        <td><button data-index="${index}" class="btnEdit">Edit</button></td>
        <td><button data-index="${index}" class="btnDelete">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
    const editButtons = document.querySelectorAll(".btnEdit");
    editButtons.forEach((btn) => {
      btn.addEventListener("click", editData);
    });
    const delButtons = document.querySelectorAll(".btnDelete");
    delButtons.forEach((btn) => {
      btn.addEventListener("click", deletaData);
    });
  }
});
