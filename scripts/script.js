const timeOptions = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };
  
  const cards = document.querySelectorAll(".card");
  const navItems = document.querySelectorAll(".profile-nav li");
  
  let currentPeriod = "weekly"; // default
  
  async function fetchData() {
    const response = await fetch("data.json");
    const data = await response.json();
    updateCards(data);
  }
  
  function updateCards(data) {
    cards.forEach((card) => {
      const title = card.dataset.title;
      const activity = data.find((d) => d.title === title);
      if (activity) {
        const current = activity.timeframes[currentPeriod].current;
        const previous = activity.timeframes[currentPeriod].previous;
        card.querySelector(".current").textContent = current;
        card.querySelector(".previous").textContent = previous;
        card.querySelector("p").innerHTML = `${timeOptions[currentPeriod]} - <span class="previous">${previous}</span>hrs`;
      }
    });
  }
  
  // Handle nav click
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
      currentPeriod = item.dataset.period;
      fetchData();
    });
  });
  
  // Initial load
  fetchData();
  