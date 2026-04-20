function parsePositiveNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

const I18N = {
  en: {
    "app.title": "Loan calculator",
    "app.subtitle":
      "Enter credit amount, annual interest rate, and period (months) to get the monthly payment and full month-by-month plan.",
    "form.amount.label": "Credit amount",
    "form.amount.placeholder": "e.g. 10000",
    "form.interest.label": "Interest (annual %)",
    "form.interest.placeholder": "e.g. 6.5",
    "form.period.label": "Period (months)",
    "form.period.placeholder": "e.g. 36",
    "form.extra.label": "Extra payment (monthly)",
    "form.extra.placeholder": "e.g. 50",
    "form.extraYearly.label": "Extra payment (yearly)",
    "form.extraYearly.placeholder": "e.g. 500",
    "form.extraOnce.label": "Extra payment (one-time)",
    "form.extraOnce.placeholder": "e.g. 1000",
    "form.extraOnceMonth.label": "Month for one-time payment",
    "form.extraOnceMonth.placeholder": "e.g. 6",
    "form.calculate": "Calculate",
    "form.reset": "Reset",
    "results.baseMonthly": "Monthly payment (base)",
    "results.payoffMonths": "Payoff time (months)",
    "results.withExtra": "Monthly payment (with extra)",
    "results.totalPaid": "Total paid",
    "results.totalInterest": "Total interest",
    "plan.title": "Payment plan (monthly)",
    "plan.downloadCsv": "Download CSV",
    "plan.col.month": "Month",
    "plan.col.payment": "Payment",
    "plan.col.interest": "Interest",
    "plan.col.principal": "Principal",
    "plan.col.balance": "Balance",
    "plan.empty": "Fill in the form and press “Calculate”.",
    "error.amount": "Please enter a credit amount greater than 0.",
    "error.interest": "Please enter a valid annual interest rate (0 or greater).",
    "error.period": "Please enter a period in whole months (1 or greater).",
    "error.extra": "Please enter a valid extra monthly payment (0 or greater).",
    "error.extraYearly": "Please enter a valid extra yearly payment (0 or greater).",
    "error.extraOnce": "Please enter a valid one-time extra payment (0 or greater).",
    "error.extraOnceMonth": "Please enter a valid month number for the one-time payment (1 or greater).",
    "error.paymentTooSmall":
      "Your monthly payment (base + extra) is not enough to cover the monthly interest. Increase the period or add a bigger extra payment.",
    "csv.filename": "loan-plan.csv",
  },
  bg: {
    "app.title": "Кредитен калкулатор",
    "app.subtitle":
      "Въведете сума на кредита, годишна лихва и срок (в месеци), за да получите месечната вноска и пълен план по месеци.",
    "form.amount.label": "Сума на кредита",
    "form.amount.placeholder": "напр. 10000",
    "form.interest.label": "Лихва (годишна %)",
    "form.interest.placeholder": "напр. 6.5",
    "form.period.label": "Срок (месеци)",
    "form.period.placeholder": "напр. 36",
    "form.extra.label": "Допълнително плащане (месечно)",
    "form.extra.placeholder": "напр. 50",
    "form.extraYearly.label": "Допълнително плащане (годишно)",
    "form.extraYearly.placeholder": "напр. 500",
    "form.extraOnce.label": "Еднократно допълнително плащане",
    "form.extraOnce.placeholder": "напр. 1000",
    "form.extraOnceMonth.label": "Месец за еднократно плащане",
    "form.extraOnceMonth.placeholder": "напр. 6",
    "form.calculate": "Изчисли",
    "form.reset": "Нулирай",
    "results.baseMonthly": "Месечна вноска (базова)",
    "results.payoffMonths": "Срок до изплащане (месеци)",
    "results.withExtra": "Месечно плащане (с допълнение)",
    "results.totalPaid": "Общо платено",
    "results.totalInterest": "Общо лихва",
    "plan.title": "Погасителен план (по месеци)",
    "plan.downloadCsv": "Изтегли CSV",
    "plan.col.month": "Месец",
    "plan.col.payment": "Вноска",
    "plan.col.interest": "Лихва",
    "plan.col.principal": "Главница",
    "plan.col.balance": "Остатък",
    "plan.empty": "Попълнете данните и натиснете „Изчисли“.",
    "error.amount": "Моля, въведете сума на кредита по-голяма от 0.",
    "error.interest": "Моля, въведете валидна годишна лихва (0 или повече).",
    "error.period": "Моля, въведете срок в цели месеци (1 или повече).",
    "error.extra": "Моля, въведете валидно допълнително месечно плащане (0 или повече).",
    "error.extraYearly": "Моля, въведете валидно допълнително годишно плащане (0 или повече).",
    "error.extraOnce": "Моля, въведете валидно еднократно допълнително плащане (0 или повече).",
    "error.extraOnceMonth": "Моля, въведете валиден номер на месец за еднократното плащане (1 или повече).",
    "error.paymentTooSmall":
      "Месечното ви плащане (базово + допълнително) не е достатъчно, за да покрие месечната лихва. Увеличете срока или добавете по-голямо допълнително плащане.",
    "csv.filename": "pogasnitelen-plan.csv",
  },
};

const PLACEHOLDER_KEYS = {
  amount: "form.amount.placeholder",
  interest: "form.interest.placeholder",
  period: "form.period.placeholder",
  extra: "form.extra.placeholder",
  "extra-yearly": "form.extraYearly.placeholder",
  "extra-once": "form.extraOnce.placeholder",
  "extra-once-month": "form.extraOnceMonth.placeholder",
};

function getLanguage() {
  const raw = localStorage.getItem("lang");
  return raw === "en" || raw === "bg" ? raw : "bg";
}

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
}

function t(key) {
  const lang = getLanguage();
  return I18N[lang]?.[key] ?? I18N.en[key] ?? key;
}

function applyTranslations() {
  const lang = getLanguage();
  document.documentElement.lang = lang;
  document.title = t("app.title");

  for (const el of document.querySelectorAll("[data-i18n]")) {
    const key = el.getAttribute("data-i18n");
    if (!key) continue;
    el.textContent = t(key);
  }

  for (const [id, key] of Object.entries(PLACEHOLDER_KEYS)) {
    const input = document.getElementById(id);
    if (input) input.placeholder = t(key);
  }

  const btnEn = document.getElementById("lang-en");
  const btnBg = document.getElementById("lang-bg");
  if (btnEn && btnBg) {
    btnEn.setAttribute("aria-pressed", String(lang === "en"));
    btnBg.setAttribute("aria-pressed", String(lang === "bg"));
  }
}

function parsePositiveInt(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  const i = Math.trunc(n);
  if (i !== n) return null;
  return i;
}

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function formatMoney(n) {
  const rounded = round2(n);
  return rounded.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function computeMonthlyPayment(amount, annualRatePercent, months) {
  const r = (annualRatePercent / 100) / 12;
  if (r === 0) return amount / months;
  const pow = (1 + r) ** months;
  return amount * (r * pow) / (pow - 1);
}

function buildSchedule(amount, annualRatePercent, months, extraMonthlyPayment, extraYearlyPayment, extraOncePayment, extraOnceMonth) {
  const r = (annualRatePercent / 100) / 12;
  const basePayment = computeMonthlyPayment(amount, annualRatePercent, months);
  const extra = extraMonthlyPayment ?? 0;
  const targetPayment = basePayment + extra;
  const yearlyExtra = extraYearlyPayment ?? 0;
  const onceExtra = extraOncePayment ?? 0;
  const onceMonth = extraOnceMonth ?? 0;
  let onceApplied = false;

  const schedule = [];
  let balance = amount;
  let totalInterest = 0;
  let totalPaid = 0;

  // If payment does not cover interest, the balance will never decrease.
  if (r > 0 && targetPayment <= balance * r) {
    return {
      errorKey: "error.paymentTooSmall",
    };
  }

  // Max safety bound: even a tiny principal should finish well before this.
  const maxMonths = Math.max(1, months) * 1000;
  let month = 0;
  while (balance > 0 && month < maxMonths) {
    month += 1;

    const interest = r === 0 ? 0 : balance * r;
    let pay = targetPayment;
    let principal = pay - interest;

    // Close out exactly on the last month to avoid negative balance due to rounding.
    if (principal >= balance) {
      principal = balance;
      pay = principal + interest;
    }

    balance = balance - principal;

    // One-time extra payment goes directly to principal (at chosen month).
    if (!onceApplied && onceExtra > 0 && onceMonth > 0 && month === onceMonth && balance > 0) {
      const applied = Math.min(onceExtra, balance);
      balance = balance - applied;
      pay += applied;
      principal += applied;
      onceApplied = true;
    }

    // Extra yearly payment (once per year, every 12th month) goes directly to principal.
    let yearlyApplied = 0;
    if (yearlyExtra > 0 && month % 12 === 0 && balance > 0) {
      yearlyApplied = Math.min(yearlyExtra, balance);
      balance = balance - yearlyApplied;
      pay += yearlyApplied;
      principal += yearlyApplied;
    }

    const row = {
      month,
      payment: round2(pay),
      interest: round2(interest),
      principal: round2(principal),
      balance: round2(Math.max(0, balance)),
    };

    schedule.push(row);
    totalInterest += row.interest;
    totalPaid += row.payment;
  }

  return {
    baseMonthlyPayment: round2(basePayment),
    monthlyWithExtra: round2(basePayment + extra),
    payoffMonths: schedule.length,
    totalPaid: round2(totalPaid),
    totalInterest: round2(totalInterest),
    schedule,
  };
}

function toCSV(schedule) {
  const header = ["Month", "Payment", "Interest", "Principal", "Balance"];
  const lines = [header.join(",")];
  for (const r of schedule) {
    lines.push([r.month, r.payment, r.interest, r.principal, r.balance].join(","));
  }
  return lines.join("\n");
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function setError(message) {
  const el = document.getElementById("error");
  el.textContent = message ?? "";
}

function setSummary({ baseMonthlyPayment, monthlyWithExtra, payoffMonths, totalPaid, totalInterest }) {
  document.getElementById("monthly-payment").textContent = formatMoney(baseMonthlyPayment);
  document.getElementById("monthly-with-extra").textContent = formatMoney(monthlyWithExtra);
  document.getElementById("payoff-months").textContent = String(payoffMonths);
  document.getElementById("total-paid").textContent = formatMoney(totalPaid);
  document.getElementById("total-interest").textContent = formatMoney(totalInterest);
}

function renderTable(schedule) {
  const tbody = document.getElementById("plan-body");
  tbody.innerHTML = "";

  for (const row of schedule) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.month}</td>
      <td>${formatMoney(row.payment)}</td>
      <td>${formatMoney(row.interest)}</td>
      <td>${formatMoney(row.principal)}</td>
      <td>${formatMoney(row.balance)}</td>
    `;
    tbody.appendChild(tr);
  }
}

function readInputs() {
  const amount = parsePositiveNumber(document.getElementById("amount").value);
  const interest = parsePositiveNumber(document.getElementById("interest").value);
  const months = parsePositiveInt(document.getElementById("period").value);
  const extra = parsePositiveNumber(document.getElementById("extra").value);
  const extraYearly = parsePositiveNumber(document.getElementById("extra-yearly").value);
  const extraOnce = parsePositiveNumber(document.getElementById("extra-once").value);
  const extraOnceMonth = parsePositiveInt(document.getElementById("extra-once-month").value);

  if (amount === null || amount === 0) return { errorKey: "error.amount" };
  if (interest === null) return { errorKey: "error.interest" };
  if (months === null) return { errorKey: "error.period" };
  if (extra === null) return { errorKey: "error.extra" };
  if (extraYearly === null) return { errorKey: "error.extraYearly" };
  if (extraOnce === null) return { errorKey: "error.extraOnce" };
  if (extraOnceMonth === null) return { errorKey: "error.extraOnceMonth" };

  return { amount, interest, months, extra, extraYearly, extraOnce, extraOnceMonth };
}

function clearOutputs() {
  document.getElementById("monthly-payment").textContent = "—";
  document.getElementById("monthly-with-extra").textContent = "—";
  document.getElementById("payoff-months").textContent = "—";
  document.getElementById("total-paid").textContent = "—";
  document.getElementById("total-interest").textContent = "—";
  document.getElementById("download-csv").disabled = true;
  const tbody = document.getElementById("plan-body");
  tbody.innerHTML = `<tr><td colspan="5" class="empty">${t("plan.empty")}</td></tr>`;
}

let lastSchedule = null;

function calculateAndRender() {
  setError("");
  const { amount, interest, months, extra, extraYearly, extraOnce, extraOnceMonth, errorKey } = readInputs();
  if (errorKey) {
    setError(t(errorKey));
    return;
  }

  const result = buildSchedule(amount, interest, months, extra, extraYearly, extraOnce, extraOnceMonth);
  if (result.errorKey) {
    setError(t(result.errorKey));
    return;
  }
  setSummary(result);
  renderTable(result.schedule);
  lastSchedule = result.schedule;
  document.getElementById("download-csv").disabled = false;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loan-form");
  const resetBtn = document.getElementById("reset");
  const dlBtn = document.getElementById("download-csv");
  const btnEn = document.getElementById("lang-en");
  const btnBg = document.getElementById("lang-bg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    calculateAndRender();
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    lastSchedule = null;
    setError("");
    clearOutputs();
  });

  dlBtn.addEventListener("click", () => {
    if (!lastSchedule) return;
    downloadText(t("csv.filename"), toCSV(lastSchedule));
  });

  if (btnEn) {
    btnEn.addEventListener("click", () => {
      setLanguage("en");
      applyTranslations();
      clearOutputs();
      if (lastSchedule) calculateAndRender();
    });
  }

  if (btnBg) {
    btnBg.addEventListener("click", () => {
      setLanguage("bg");
      applyTranslations();
      clearOutputs();
      if (lastSchedule) calculateAndRender();
    });
  }

  applyTranslations();
  clearOutputs();
});

