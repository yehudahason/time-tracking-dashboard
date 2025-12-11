const weekBtn = document.getElementById("Weekly");
const dailyBtn = document.getElementById("Daily");
const monthlyBtn = document.getElementById("Monthly");

// CARD ELEMENTS
const cards = {
  Work: {
    hours: document.querySelector(".time-card--work .time-card__hours"),
    prev: document.querySelector(".time-card--work .time-card__prev"),
  },
  Play: {
    hours: document.querySelector(".time-card--play .time-card__hours"),
    prev: document.querySelector(".time-card--play .time-card__prev"),
  },
  Study: {
    hours: document.querySelector(".time-card--study .time-card__hours"),
    prev: document.querySelector(".time-card--study .time-card__prev"),
  },
  Exercise: {
    hours: document.querySelector(".time-card--exercise .time-card__hours"),
    prev: document.querySelector(".time-card--exercise .time-card__prev"),
  },
  Social: {
    hours: document.querySelector(".time-card--social .time-card__hours"),
    prev: document.querySelector(".time-card--social .time-card__prev"),
  },
  "Self Care": {
    hours: document.querySelector(".time-card--selfcare .time-card__hours"),
    prev: document.querySelector(".time-card--selfcare .time-card__prev"),
  },
};

weekBtn.addEventListener("click", () => {
  weekBtn.classList.add("tab--active");
  dailyBtn.classList.remove("tab--active");
  monthlyBtn.classList.remove("tab--active");
  update("weekly");
});
dailyBtn.addEventListener("click", () => {
  weekBtn.classList.remove("tab--active");
  dailyBtn.classList.add("tab--active");
  monthlyBtn.classList.remove("tab--active");
  update("daily");
});
monthlyBtn.addEventListener("click", () => {
  weekBtn.classList.remove("tab--active");
  dailyBtn.classList.remove("tab--active");
  monthlyBtn.classList.add("tab--active");
  update("monthly");
});

async function update(type) {
  const res = await fetch("./js/data.json");
  //   const text = await res.text();  To Check the json response
  //   console.log("RAW RESPONSE:", text);
  const data = await res.json();

  data.forEach((item) => {
    const title = item.title; // "Work", "Play", etc.
    const tf = item.timeframes[type]; // daily / weekly / monthly
    let previus;
    if (type === "daily") previus = "Yesterday";
    if (type === "weekly") previus = "Last Week";
    if (type === "monthly") previus = "Last Month";
    cards[title].hours.textContent = `${tf.current}hrs`;
    cards[title].prev.textContent = `${previus} - ${tf.previous}hrs`;
  });
}
