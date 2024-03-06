import "../App.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(ArcElement, Tooltip, Legend);

interface Hours {
  totalMonthlyHours: Number | string;
  presentHours: Number | string;
  absentHours: Number | string;
  label: string; // New prop for label
}

export function Don({
  totalMonthlyHours,
  presentHours,
  absentHours,
  label,
}: Hours) {
  const data = {
    labels: ["Afwezig", "Aanwezig"],
    datasets: [
      {
        label: label, // Use the label prop here
        data: [presentHours, absentHours],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Absent color
          "rgba(54, 162, 235, 0.2)", // Present color
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Absent border color
          "rgba(54, 162, 235, 1)", // Present border color
        ],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: true,
    cutout: -20,
    plugins: {
      datalabels: {
        color: "#fff", // Color of the labels
        display: true,
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  };

  return <Doughnut data={data} options={options} height={300} width={600} />;
}
