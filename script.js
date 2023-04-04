// Monthly Expenses
var monthly_salary = document.querySelector(".monthly-salary-class");
var monthly_other = document.querySelector(".monthly-other-class");
var food = document.querySelector(".food-class");
var clothing = document.querySelector(".clothing-class");
var shelter = document.querySelector(".shelter-class");
var household = document.querySelector(".household-class");
var transportation = document.querySelector(".transportation-class");
var health = document.querySelector(".health-class");
var student_loan = document.querySelector(".student-loan-class");
var personal = document.querySelector(".personal-class");
var miscellaneous = document.querySelector(".miscellaneous-class");
var emergency_fund = document.querySelector(".emergency-fund-class");
var investments = document.querySelector(".investments-class");
var retirement = document.querySelector(".retirement-class");
var income_spent = document.querySelector("div.income-spent strong");
var income_saved = document.querySelector("div.income-saved strong");
var cash_balance = document.querySelector("div.cash-balance strong");

// Event Listeners for each field inputs
monthly_salary.addEventListener("change", load_chart);
monthly_other.addEventListener("change", load_chart);
food.addEventListener("change", load_chart);
clothing.addEventListener("change", load_chart);
shelter.addEventListener("change", load_chart);
household.addEventListener("change", load_chart);
transportation.addEventListener("change", load_chart);
health.addEventListener("change", load_chart);
student_loan.addEventListener("change", load_chart);
personal.addEventListener("change", load_chart);
miscellaneous.addEventListener("change", load_chart);
emergency_fund.addEventListener("change", load_chart);
investments.addEventListener("change", load_chart);
retirement.addEventListener("change", load_chart);

// Solve the error "Uncaught Error: You cannot have multiple Roots on the same DOM node"
var MyGlobalObject = {};
var enforce_input = [
  food,
  clothing,
  shelter,
  household,
  transportation,
  health,
  student_loan,
  personal,
  miscellaneous,
  emergency_fund,
  investments,
  retirement,
];
function load_chart() {
  // Calculate the total for each field input
  var total_income = Number(monthly_salary.value) + Number(monthly_other.value);

  var total_expenses =
    Number(food.value) +
    Number(clothing.value) +
    Number(shelter.value) +
    Number(household.value) +
    Number(transportation.value) +
    Number(health.value) +
    Number(student_loan.value) +
    Number(personal.value) +
    Number(miscellaneous.value);

  var total_savings =
    Number(emergency_fund.value) +
    Number(investments.value) +
    Number(retirement.value);

  var total_balance =
    Number(total_income) - (Number(total_expenses) + Number(total_savings));


    income_spent.innerHTML = total_expenses;
    console.log("total expense: ", total_expenses);
    income_saved.innerHTML = total_savings;
    console.log("total saved: ", total_savings);
    cash_balance.innerHTML = total_balance;
    console.log("total balance: ", total_balance);
    










  // Enforce user to input in the income input field
  if (
    (Number(monthly_salary.value) >= 0 && Number(monthly_other.value) > 0) ||
    (Number(monthly_salary.value) > 0 && Number(monthly_other.value) >= 0)
  ) {
    for (let i = 0; i < enforce_input.length; i++) {
      enforce_input[i].disabled = false;
    }
  }

  // Enforce user to input value grater than total income
  for (let i = 0; i < enforce_input.length; i++) {
    if (Number(enforce_input[i].value) > Number(total_income)) {
      alert(
        enforce_input[i].name +
          " " +
          "value is greater than total income value."
      );
      enforce_input[i].value = "";
    }
  }
  // Solve the error "Uncaught Error: You cannot have multiple Roots on the same DOM node"
  if (MyGlobalObject[chartdiv]) {
    MyGlobalObject[chartdiv].dispose();
  }

  // pie_chart
  var root = am5.Root.new("chartdiv");
  root.setThemes([am5themes_Animated.new(root)]);

  var chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      startAngle: 180,
      endAngle: 360,
      layout: root.verticalLayout,
      innerRadius: am5.percent(50),
    })
  );

  var series = chart.series.push(
    am5percent.PieSeries.new(root, {
      startAngle: 180,
      endAngle: 360,
      valueField: "value",
      categoryField: "category",
      alignLabels: false,
    })
  );

  series.states.create("hidden", {
    startAngle: 180,
    endAngle: 180,
  });

  series.slices.template.setAll({
    cornerRadius: 5,
  });

  series.ticks.template.setAll({
    forceHidden: true,
  });

  series.data.setAll([
    { value: total_expenses, category: "Income Spent" },
    { value: total_savings, category: "Income Saved" },
    { value: total_balance, category: "Cash Balance" },
  ]);

  series.appear(1000, 100);
  // Solve the error "Uncaught Error: You cannot have multiple Roots on the same DOM node"
  MyGlobalObject[chartdiv] = root;
}
