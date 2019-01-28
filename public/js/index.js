var UserAPI = {
  saveUser: function(userData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/user",
      data: JSON.stringify(userData)
    });
  },
  getUsers: function(userData) {
    return $.ajax({
      type: "GET",
      url: "api/user",
      data: JSON.stringify(userData)
    });
  }

};

function findToday() {
  var monthly = ["0 Slot", "31Jan", "28Feb", "31Mar", "30Apr", "31May", "30June", "31July", "31Aug", "30Sep", "31Oct", "30Nov", "31Dec"];
  var weekly = ["0 Slot", [1, 8, 15, 22, 29, 36], [2, 9, 16, 23, 30, 37], [3, 10, 17, 24, 31, 38], [4, 11, 18, 25, 32, 39], [5, 12, 19, 26, 33, 40], [6, 13, 20, 27, 34, 41], [7, 14, 21, 28, 35, 42]];
  console.log(weekly);
  var tempWeekly = weekly;
  var daily = ["0 Slot", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var center = 0;

  var d = Date(Date.now()).toString().split(" ");

  var year = d[3];

  console.log(d);

  if (d[3] % 4 === 0) {
    monthly[2] = "29Feb";
  } else {
    monthly[2] = "28Feb";
  }

  var maxDays;
  var monthNum;

  for (var i = 0; i < monthly.length; i++) {
    if (d[1] === monthly[i][2] + monthly[i][3] + monthly[i][4]) {
      maxDays = parseInt(monthly[i][0] + monthly[i][1]);
      monthNum = i;
    }
  }

  var month = monthly[monthNum][2] + monthly[monthNum][3] + monthly[monthNum][4];
  var dayNum;

  for (var j = 0; j < daily.length; j++) {
    if (d[0] === daily[j]) {
      dayNum = j;
    }
  }


  var minus = 0;
  var daySlot;


  for (var k = 0; k < weekly[dayNum].length; k++) {
    if (d[2] - minus <= weekly[dayNum][0]) {
      daySlot = k + 1;
      break;
    } else {
      minus += 7;
    }
  }

  minus = 7;



  var dayDiff = weekly[dayNum][(daySlot - 1)] - d[2];




  for (var l = 1; l < weekly.length; l++) {
    for (var m = 0; m < weekly[l].length; m++) {
      tempWeekly[l][m] -= dayDiff;
    }
  }

  var backDay;
  var forwardDay;

  for (var n = 1; n < tempWeekly[n].length + 1; n++) {
    for (var o = 0; o < tempWeekly.length; o++) {
      var dayIds = $("#" + daily[o] + n);
      var x = n - 1;
      var y = maxDays + 1;
      if (tempWeekly[o][x] < 1) {
        if (tempWeekly[o][x] === 0) {
          backDay = [o, 4];
        }
        dayIds.empty();
        var dayAddition = $("<div>");
        dayAddition.text("");
        dayIds.append(dayAddition);
      } else if (tempWeekly[o][x] > maxDays) {
        if (tempWeekly[o][x] === y) {
          forwardDay = [o, 0];
        }
        dayIds.empty();
        var dayAddition = $("<p>");
        dayAddition.text("");
        dayIds.append(dayAddition);
      } else {
        dayIds.empty();
        var dayAddition = $("<p>");
        dayAddition.text("" + tempWeekly[o][x] + "");
        dayIds.append(dayAddition);
      }
    }
  }

  var titleMonth = $("#titleMonth");
  titleMonth.empty();
  var titleAddition = $("<h1>");
  titleAddition.text("" + month + "   " + year + "");
  titleMonth.append(titleAddition);

  $(".changeMonth").on("click", function () {

    if ($(this).val() === "back") {

      center--;
      monthNum--;

      if (monthNum === 0) {
        monthNum = 12;
        year--;
      } else if (monthNum === 13) {
        monthNum = 1;
        year++;
      }

      if (center === 0) {
        findToday();
        return false;
      }
      backMonth();

    } else {

      center++;
      monthNum++;

      if (monthNum === 0) {
        monthNum = 12;
        year--;
      } else if (monthNum === 13) {
        monthNum = 1;
        year++;
      }

      if (center === 0) {
        findToday();
        return false;
      }
      forwardMonth();

    }
  });

  function forwardMonth() {
    weekly = ["0 Slot", [1, 8, 15, 22, 29, 36], [2, 9, 16, 23, 30, 37], [3, 10, 17, 24, 31, 38], [4, 11, 18, 25, 32, 39], [5, 12, 19, 26, 33, 40], [6, 13, 20, 27, 34, 41], [7, 14, 21, 28, 35, 42]];
    tempWeekly = weekly;

    if (year % 4 === 0) {
      monthly[2] = "29Feb";
    } else {
      monthly[2] = "28Feb";
    }

    maxDays = parseFloat(monthly[monthNum][0] + monthly[monthNum][1]);

    console.log(forwardDay);
    console.log(maxDays);

    dayDiff = (weekly[forwardDay[0]][forwardDay[1]] / 1) - 1;

    console.log(dayDiff);

    for (var l = 1; l < weekly.length; l++) {
      for (var m = 0; m < weekly[l].length; m++) {
        tempWeekly[l][m] -= dayDiff;
      }
    }

    console.log(tempWeekly);

    for (var n = 1; n < tempWeekly[n].length + 1; n++) {
      for (var o = 0; o < tempWeekly.length; o++) {
        var dayIds = $("#" + daily[o] + n);
        var x = n - 1;
        var y = maxDays + 1;
        if (tempWeekly[o][x] < 1) {
          if (tempWeekly[o][x] === 0) {
            backDay = [o, 4];
          }
          dayIds.empty();
          var dayAddition = $("<div>");
          dayAddition.text("");
          dayIds.append(dayAddition);
        } else if (tempWeekly[o][x] > maxDays) {
          if (tempWeekly[o][x] === y) {
            forwardDay = [o, 0];
          }
          dayIds.empty();
          var dayAddition = $("<p>");
          dayAddition.text("");
          dayIds.append(dayAddition);
        } else {
          dayIds.empty();
          var dayAddition = $("<p>");
          dayAddition.text("" + tempWeekly[o][x] + "");
          dayIds.append(dayAddition);
        }
      }
    }

    month = monthly[monthNum][2] + monthly[monthNum][3] + monthly[monthNum][4];

    titleMonth.empty();
    titleAddition = $("<h1>");
    titleAddition.text("" + month + "   " + year + "");
    titleMonth.append(titleAddition);
  }

  function backMonth() {
    weekly = ["0 Slot", [1, 8, 15, 22, 29, 36], [2, 9, 16, 23, 30, 37], [3, 10, 17, 24, 31, 38], [4, 11, 18, 25, 32, 39], [5, 12, 19, 26, 33, 40], [6, 13, 20, 27, 34, 41], [7, 14, 21, 28, 35, 42]];
    tempWeekly = weekly;

    if (year % 4 === 0) {
      monthly[2] = "29Feb";
    } else {
      monthly[2] = "28Feb";
    }

    maxDays = parseFloat(monthly[monthNum][0] + monthly[monthNum][1]);

    console.log(backDay);
    console.log(maxDays);

    if (maxDays === 31) {
      if (backDay[0] === 1 || backDay[0] === 2) {
        backDay[1]++;
      }
    } else if (maxDays === 30) {
      if (backDay[0] === 1) {
        backDay[1]++;
      }
    }

    dayDiff = (weekly[backDay[0]][backDay[1]] % maxDays);

    if (maxDays === 31) {
      if (monthNum === 7 || monthNum === 12 || monthNum === 1) {
        console.log("");
      } else if (forwardDay[0] === 3) {
        dayDiff = 4;
      }
    } else if (maxDays === 30) {
      if (forwardDay[0] === 4) {
        dayDiff = 5;
      }
    } else if (maxDays === 29) {
      if (forwardDay[0] === 4) {
        dayDiff = 6;
      }
    } else if (maxDays === 28) {
      if (forwardDay[0] === 4) {
        dayDiff = 0;
      }
    }

    if (monthNum === 7 || monthNum === 12) {
      if (forwardDay[0] === 4) {
        dayDiff = 4;
      }
    }

    if (year === 2026) {
      if (monthNum === 1) {
        dayDiff = 4;
      }
    }

    console.log(forwardDay);
    console.log(dayDiff);
    console.log(monthNum);
    console.log(year);

    for (var l = 1; l < weekly.length; l++) {
      for (var m = 0; m < weekly[l].length; m++) {
        tempWeekly[l][m] -= dayDiff;
      }
    }

    console.log(tempWeekly);

    for (var n = 1; n < tempWeekly[n].length + 1; n++) {
      for (var o = 0; o < tempWeekly.length; o++) {
        var dayIds = $("#" + daily[o] + n);
        var x = n - 1;
        var y = maxDays + 1;
        if (tempWeekly[o][x] < 1) {
          if (tempWeekly[o][x] === 0) {
            backDay = [o, 4];
          }
          dayIds.empty();
          var dayAddition = $("<div>");
          dayAddition.text("");
          dayIds.append(dayAddition);
        } else if (tempWeekly[o][x] > maxDays) {
          if (tempWeekly[o][x] === y) {
            forwardDay = [o, 0];
          }
          dayIds.empty();
          var dayAddition = $("<p>");
          dayAddition.text("");
          dayIds.append(dayAddition);
        } else {
          dayIds.empty();
          var dayAddition = $("<p>");
          dayAddition.text("" + tempWeekly[o][x] + "");
          dayIds.append(dayAddition);
        }
      }
    }

    month = monthly[monthNum][2] + monthly[monthNum][3] + monthly[monthNum][4];

    titleMonth.empty();
    titleAddition = $("<h1>");
    titleAddition.text("" + month + "   " + year + "");
    titleMonth.append(titleAddition);
  }
}

findToday();

// module.exports = findToday;