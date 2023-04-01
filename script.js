// expenses name begins

var housing = document.querySelector(".housing-class");
var transport = document.querySelector(".transport-class");
var savings = document.querySelector(".savings-class");
var clothing = document.querySelector(".clothing-class");
var insurance = document.querySelector(".insurance-class");
var retirement = document.querySelector(".retirement-class");
var monetaryFieldClass = document.querySelector(".monetary-field-class");
var monetary = document.querySelector(".monetary-class");
var getMonthBtn = document.querySelector(".goal-btn-update");
var salary = document.querySelector(".salary-class");
var canvas = document.querySelector("#my-chart");
var displayMonths = document.querySelector(".month-number");
var monetaryValueIncrement = document.querySelector(".monetary-goal-increment");
// expenses name ends

// +++Enforce user to input value in the presented order begins+++
var enforceInput = [
  housing,
  transport,
  savings,
  clothing,
  insurance,
  retirement,
  monetaryFieldClass,
];
// +++counterFunction index+++
var i = 0;
// +++countFunction index+++
var counterFunction = () => {
  counterLabel: for (i; i < enforceInput.length; i++) {
    if (typeof enforceInput[i].value == "string" && i < enforceInput.length) {
      enforceInput[i + 1].disabled = false;
      break counterLabel;
    }
  }
  i++;
};

//percentage function begins

// +++Labels used by pieChart+++
var expenseArr = [
  "Housing",
  "Transport",
  "Savings",
  "Clothing",
  "Insurance",
  "Retirement",
];
// ++++backgroundColour use by pieChart++++
var expenseColor = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145",
  "#f11fff",
];
// +++triggers calcPercent function+++
housing.addEventListener("change", () => calcPercent(housing, salary));
transport.addEventListener("change", () => calcPercent(transport, salary));
savings.addEventListener("change", () => calcPercent(savings, salary));
clothing.addEventListener("change", () => calcPercent(clothing, salary));
insurance.addEventListener("change", () => calcPercent(insurance, salary));
retirement.addEventListener("mouseout", () => calcPercent(retirement, salary));

// +++Array that takes objectLiterals containing expenseName and value+++
var expensePercentArr = [];
// +++Array that contain expenseValue+++
var modifiedExpenseArr = [];

// +++Function that validates the input value of expenses begins+++
const calcPercent = (expense, salary) => {
  const expenseName = expense.name;
  const newSalary = parseInt(salary.value);
  const newAmount = parseInt(expense.value);
  if (newAmount < 0) {
    alert(`${expenseName.toUpperCase()} CAN'T TAKE A NEGATIVE VALUE`);
  }
  if (newAmount > newSalary) {
    alert(`${expenseName.toUpperCase()} EXPENSE IS GREATER THAN SALARY`);
  } else {
    const newObject = {};
    newObject["name"] = expense.name;
    newObject["value"] = newAmount;
    const found = expensePercentArr.findIndex(
      (obj) => obj["name"] === newObject["name"]
    );
    if (found == -1) {
      expensePercentArr.push(newObject);
    } else {
      expensePercentArr[found] = newObject;
    }
    loadGraph();
    counterFunction();
  }
};
// +++Function that validates the input value of expenses begins+++

if (modifiedExpenseArr.length === 0) {
  canvas.style.display = "none";
}

// +++Function which does the percentage calculation+++
const loadGraph = () => {
  modifiedExpenseArr = expensePercentArr.map((expense) => expense.value);
  var percentOfExpenseArr = modifiedExpenseArr.map((value) =>
    (percentValue = (value * 100) / salary.value).toFixed(2)
  );

  // +++PieChart dependency+++
  canvas.style.display = "block";
  return new Chart("my-chart", {
    type: "pie",
    data: {
      labels: expenseArr,
      datasets: [
        {
          backgroundColor: expenseColor,
          data: percentOfExpenseArr,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Percentage Of Expenses Base On Salary",
      },
    },
  });
};

// Monetary goal function (numbers of month) begins
getMonthBtn.addEventListener("click", () => calcGoalMonths());
function calcGoalMonths() {
//  +++the below function test if number is float+++
  function isFloat(x) { return !!(x % 1); }
// +++   +++
  const newMonetaryValue = parseInt(monetary.value);
  const newSavingsValue = parseInt(savings.value);
  goalMonths = newMonetaryValue / newSavingsValue;
  if (newMonetaryValue < newSavingsValue) {
    return alert("Monetary goal less than savings");
  } else if (Number.isInteger(goalMonths)) {
    displayMonths.innerHTML = goalMonths;
    monetaryValueIncrement.innerText = "0.00";
    return;
  } else if (isFloat(goalMonths) == true) {
    var incrementConversion = Math.ceil(
      (moneyIncrement = (goalMonths - parseInt(goalMonths)) * newSavingsValue)
    );
    displayMonths.innerHTML = parseInt(goalMonths);
    monetaryValueIncrement.innerHTML = incrementConversion;
    return;
  } else {
    console.log(savings.value);
    displayMonths.innerHTML = "0.00";
    monetaryValueIncrement.innerText = "0.00";
    return;
  }
}
