var startupName = window.location.search;
var newOne = startupName.replace("?company=", "");
startupName = newOne.replace("&name", "");
newOne = startupName.replace("%20", " ");
startupName = newOne.split("=");

console.log(startupName);

var userDataArr = [];

var positionArr = [];

var checkboxArea = $("#checkboxArea");

var deleteDropdown1 = $("#dropdown1");
var deleteDropdown2 = $("#dropdown2");


var UserAPI = {
  saveUser: function (userData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/user",
      data: JSON.stringify(userData)
    });
  },
  getUsers: function () {
    return $.ajax({
      type: "GET",
      url: "api/user"
    });
  },
  getCompUsers: function (company) {
    return $.ajax({
      type: "GET",
      url: "api/users/" + company
    });
  },
  deleteUser: function (name) {
    return $.ajax({
      url: "api/user/" + name,
      type: "DELETE"
    });
  }

};

var PositionAPI = {
  savePosition: function (PositionData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/positions",
      data: JSON.stringify(PositionData)
    });
  },
  getPositions: function () {
    return $.ajax({
      type: "GET",
      url: "api/positions"
    });
  },
  getCompPositions: function (company) {
    return $.ajax({
      type: "GET",
      url: "api/positions/" + company
    });
  },
  deletePosition: function (position) {
    return $.ajax({
      url: "api/positions/" + position,
      type: "DELETE"
    });
  }

};

if (startupName.length === 2) {
  UserAPI.getUsers({}).then(function (response) {
    for (var k = 0; k < response.length; k++) {
      if (response[k].company === startupName[0]) {
        if (response[k].name === startupName[1]) {
          if (response[k].position === "Supervisor") {
            console.log("hello Sup De Jour!");
          }
        }
        userDataArr.push(response[k]);
      }
    }
  });
}

function addPositionStuff() {

  positionArr = [];

  checkboxArea.empty();
  deleteDropdown1.empty();

  PositionAPI.getPositions(startupName[0]).then(function (response) {

    for (var l = 0; l < response.length; l++) {
      if (response[l].company === startupName[0]) {
        console.log(response[l]);
        positionArr.push(response[l]);

        var checkboxes = $("<input type='checkbox' name='addPositions' value='" + response[l].position
          + ",'>" + response[l].position + "</input><br>");

        checkboxArea.append(checkboxes);

        var deletes1 = $("<option value='" + response[l].position + "'>" + response[l].position + "</option>");

        deleteDropdown1.append(deletes1);
      }
    }

    console.log(positionArr);
  });
}

addPositionStuff();

function addEmployeeStuff() {

  deleteDropdown2.empty();

  UserAPI.getUsers(startupName[0]).then(function (response) {

    console.log(response);

    for (var m = 0; m < response.length; m++) {
      if(response[m].company === startupName[0]) {
        var empSelect = $("<option value='" + response[m].name + "'>" + response[m].name + "</option>");

        deleteDropdown2.append(empSelect);
      }
    }
  });
}

addEmployeeStuff();


$("#submitUser").on("click", function (event) {
  event.preventDefault();

  var addName = $("#addFullName").val().trim();
  var addEmail = $("#addEmail").val().trim();
  var addPin = $("#addPin").val().trim();
  var addPosition = $("input[name='addPositions']");
  var addPositionArr = "";

  console.log(addName);
  console.log(addEmail);
  console.log(addPin);

  for (var i = 0; i < addPosition.length; i++) {
    if (addPosition[i].checked === true) {
      console.log(addPosition[i].value);
      addPositionArr += addPosition[i].value;
    }
  }

  console.log(addPositionArr);

  UserAPI.saveUser({
    name: addName,
    company: startupName[0],
    email: addEmail,
    pin: addPin,
    position: addPositionArr
  }).then(function () {
    alert("Successfully added employee");
  });

  $("#addFullName").val("");
  $("#addEmail").val("");
  $("#addPin").val("");
});

$("#submitSup").on("click", function (event) {
  event.preventDefault();

  var supName = $("#supFullName").val().trim();
  var supCompany = $("#supCompany").val().trim();
  var supEmail = $("#supEmail").val().trim();
  var supPin = $("#supPin").val().trim();
  var supPosition = "Supervisor";

  console.log(supName);
  console.log(supEmail);
  console.log(supPin);


  UserAPI.saveUser({
    name: supName,
    email: supEmail,
    pin: supPin,
    company: supCompany,
    position: supPosition
  }).then(function () {
    window.location.href = ("/calendar?company=" + supCompany + "&name=" + supName);
  });

  $("#supFullName").val("");
  $("#supCompany").val("");
  $("#supEmail").val("");
  $("#supPin").val("");
});

$("#loginSubmit").on("click", function (event) {
  event.preventDefault();

  var loginEmail = $("#loginEmail").val().trim();
  var loginPin = $("#loginPin").val().trim();

  UserAPI.getUsers({}).then(function (response) {
    console.log(response);
    console.log(response[0].email);
    console.log(loginEmail);

    console.log(response[0].pin);
    console.log(parseInt(loginPin));
    for (var j = 0; j < response.length; j++) {
      if (response[j].email === loginEmail) {
        if (response[j].pin === parseInt(loginPin)) {
          window.location.href = ("/calendar?company=" + response[j].company + "&name=" + response[j].name);
        }
      } else if (j === response.length - 1) {
        alert("The email address or pin number entered was either entered incorrectly or does not exist. Please re-enter the information or contact your employer for more information.");
      }
    }
  });
});

$("#submitPosition").on("click", function (event) {
  event.preventDefault();

  var addPositionTitle = $("#addPositionTitle").val().trim();

  PositionAPI.savePosition({
    company: startupName[0],
    position: addPositionTitle,
    UserId: 1
  }).then(function () {
    alert("Successfully added Position");
  });

  $("#addPositionTitle").val("");

  addPositionStuff();

});

$("#deletePosition").on("click", function (event) {
  event.preventDefault();

  var deleteThisPosition = $("#dropdown1").val();

  console.log(deleteThisPosition);

  PositionAPI.deletePosition(deleteThisPosition).then(function () {
    alert("Successfully deleted this Position");
  });

  addPositionStuff();
});
