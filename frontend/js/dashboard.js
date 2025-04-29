// dashboard.js

document.addEventListener("DOMContentLoaded", () => {
    const progressForm = document.getElementById("progressForm");
    const workoutInput = document.getElementById("workout");
    const progressInput = document.getElementById("progress");
    const logoutBtn = document.getElementById("logoutBtn");
  
    const ctx = document.getElementById("progressChart").getContext("2d");
  
    let chartData = {
      labels: [],
      datasets: [{
        label: "Workout Progress",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      }],
    };
  
    const progressChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });
  
    progressForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const workout = workoutInput.value.trim();
      const progress = parseInt(progressInput.value);
  
      if (workout && !isNaN(progress)) {
        // Add to chart
        chartData.labels.push(workout);
        chartData.datasets[0].data.push(progress);
        progressChart.update();
  
        // Add to workout list
        const list = document.querySelector(".card ul");
        const li = document.createElement("li");
        li.textContent = `✅ ${workout} - ${progress}%`;
        list.appendChild(li);
  
        // Clear form
        workoutInput.value = "";
        progressInput.value = "";
      }
    });
  
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  });
  
  
  