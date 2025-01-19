document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".pie-chart-container");
  const colors = ["#ff6f61", "#ffcc5c", "#88d8b0", "#6b5b95", "#d64161", "#feb236"];

  containers.forEach(container => {
    const pieChart = container.querySelector(".pie-chart");
    const infoBox = container.querySelector(".info-box");

    const sliceData = container.dataset.slices.split(",").map(Number);
    const labels = container.dataset.labels.split(",");

    let gradient = "";
    let startAngle = 0;

    sliceData.forEach((value, index) => {
      const endAngle = startAngle + value;
      const color = colors[index % colors.length]; // Use cyclical color indexing
      gradient += `${color} ${startAngle}% ${endAngle}%,`;
      startAngle = endAngle;
    });

    pieChart.style.background = `conic-gradient(${gradient.slice(0, -1)})`;

    pieChart.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = pieChart.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;

      let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;

      let hoveredSlice = "";
      let cumulativeAngle = 0;

      sliceData.some((value, index) => {
        cumulativeAngle += value * 3.6;
        if (angle < cumulativeAngle) {
          hoveredSlice = labels[index] || "Unknown Slice";
          return true;
        }
        return false;
      });

      if (hoveredSlice) {
        infoBox.textContent = hoveredSlice;
        infoBox.style.opacity = 1;
      }
    });

    pieChart.addEventListener("mouseleave", () => {
      infoBox.style.opacity = 0;
      infoBox.textContent = "Hover over a slice";
    });
  });
});

/*---------------------------------------------------------------------------*/

// Select all charts on the page
const charts = document.querySelectorAll('.chart');

// Generate bars for each chart based on data-values attribute
charts.forEach(chart => {
  const values = chart.getAttribute('data-values').split(',').map(Number);
  
  values.forEach(value => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${value * 30}px`; // Each unit is 30px tall
    bar.textContent = value;
    chart.appendChild(bar);
  });
});
