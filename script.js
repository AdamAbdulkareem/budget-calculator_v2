// expenses name begins

var housing = document.querySelector(".housingClass");
var transport = document.querySelector(".transportClass");
var savings = document.querySelector(".savingsClass");
var clothing = document.querySelector(".clothingClass");
var insurance = document.querySelector(".insuranceClass");
var retirement = document.querySelector(".retirementClass");
var monetaryFieldClass = document.querySelector(".monetaryFieldClass");
var monetary = document.querySelector(".monetaryClass");
var getMonthBtn = document.querySelector(".goalBtnUpdate");
var salary = document.querySelector(".salaryClass");
var canvas = document.querySelector("#myChart");
var displayMonths = document.querySelector(".monthNumber");
var monetaryValueIncrement = document.querySelector(".monetaryGoalIncrement");
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
  return new Chart("myChart", {
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
  const newMonetaryValue = parseInt(monetary.value);
  const newSavingsValue = parseInt(savings.value);
  goalMonths = newMonetaryValue / newSavingsValue;
  if (newMonetaryValue < newSavingsValue) {
    return alert("Monetary goal less than savings");
  } else if (Number.isInteger(goalMonths)) {
    return (displayMonths.innerHTML = goalMonths);
  } else if (Number.isInteger(goalMonths) == false) {
    var incrementConversion = Math.ceil(
      (moneyIncrement = (goalMonths - parseInt(goalMonths)) * newSavingsValue)
    );
    displayMonths.innerHTML = parseInt(goalMonths);
    monetaryValueIncrement.innerHTML = incrementConversion;
  }
}
