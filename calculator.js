const inputs = ["equip", "skill", "honor", "price", "jobSelect"];

// 初始化職業選單
const jobSelect = document.getElementById("jobSelect");
for (const job in JOBS) {
  const opt = document.createElement("option");
  opt.value = job;
  opt.textContent = job;
  jobSelect.appendChild(opt);
}

// 載入 localStorage
window.onload = () => {
  inputs.forEach(id => {
    if (localStorage.getItem(id)) {
      document.getElementById(id).value = localStorage.getItem(id);
    }
  });
};

// 儲存 localStorage
inputs.forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    localStorage.setItem(id, document.getElementById(id).value);
  });
});

function calculate() {
  const job = jobSelect.value;
  const equip = +equip.value || 0;
  const skill = +skill.value || 0;
  const honor = +honor.value || 0;
  const price = +price.value || 0;

  const base =
    equip * COST.equip +
    skill * COST.skill +
    honor * COST.honor;

  const totalBag = Math.ceil(base * JOBS[job]);
  const totalPrice = totalBag * price;

  document.getElementById("result").innerHTML = `
    <p>職業倍率：${JOBS[job]}</p>
    <p>所需袋子：<b>${totalBag}</b></p>
    <p>總花費：約 <b>${totalPrice.toLocaleString()}</b> 鑽</p>
  `;
}
