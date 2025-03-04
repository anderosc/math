import  { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../../firebase/firebase"; // Asenda õige tee
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import AdditionScores from "./AdditionScores";
// Registreeri Chart.js komponendid
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin // Registreeri annotatsiooni plugin
);

// Hook skooride laadimiseks
function useScores(datalocation, userId) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const db = getDatabase();
    const scoresRef = ref(db, `${datalocation}/${userId}`); // Koosta tee: "datalocation/userId"

    // Laeb andmed Firebase'ist
    get(scoresRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (Array.isArray(data)) {
            setScores(data); // Salvesta andmed olekusse
          }
        }
        setLoading(false); // Lõpeta laadimine
      })
      .catch((error) => {
        console.error("Andmete laadimisel tekkis viga:", error);
        setLoading(false); // Lõpeta laadimine vea korral
      });
  }, [datalocation, userId]);

  return { scores, loading };
}

// Funktsioon keskmise arvutamiseks
function calculateAverage(scores) {
  if (scores.length === 0) return 0; // Kui skoore pole, tagasta 0
  const total = scores.reduce((sum, score) => sum + score.points, 0); // Liida kokku kõik punktid
  return (total / scores.length).toFixed(2); // Arvuta keskmine ja ümarda 2 kohta pärast koma
}

// Funktsioon skooride jaotuse loomiseks
function createScoreDistribution(comparisonScores) {
  const scoreRanges = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Skooride vahemikud
  const distribution = new Array(scoreRanges.length - 1).fill(0); // Tühja massiivi loomine

  // Loendab, mitu skoori langeb igasse vahemikku
  comparisonScores.forEach((score) => {
    for (let i = 0; i < scoreRanges.length - 1; i++) {
      if (score >= scoreRanges[i] && score < scoreRanges[i + 1]) {
        distribution[i]++;
        break;
      }
    }
  });

  return { distribution, scoreRanges };
}

// Peamine komponent skooride kuvamiseks
function Statistics() {
  const userId = auth.currentUser?.uid; // Kasutaja ID
  const { scores, loading } = useScores("addition_scores", userId);
  const averageScore = parseFloat(calculateAverage(scores)); // Arvuta keskmine skoor

  // Võrdlusandmed (20 skoori)
  const comparisonScores = [10, 20, 30, 40, 50, 55, 60, 70, 80, 90, 100];

  // Looge skooride jaotus
  const { distribution, scoreRanges } = createScoreDistribution(comparisonScores);

  // Leia kasutaja keskmise skoori asukoht X-teljel
  const userScoreIndex = scoreRanges.findIndex((range) => averageScore >= range && averageScore < range + 10);

  // Andmed graafiku jaoks
  const chartData = {
    labels: scoreRanges.slice(0, -1).map((range, index) => `${range}-${scoreRanges[index + 1]}`), // X-telje sildid (vahemikud)
    datasets: [
      {
        label: "Score Distribution", // Andmeseeria nimi
        data: distribution, // Y-telje väärtused (skooride arv igas vahemikus)
        borderColor: "rgba(75, 192, 192, 1)", // Joone värv
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Täitevärv
        fill: true, // Täida ala joone all
        tension: 0.4, // Muuda joont sujuvaks (smooth curve)
      },
    ],
  };

  // Graafiku seadistused
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Score Distribution and Your Position", // Graafiku pealkiri
      },
      annotation: {
        annotations: {
          userScore: {
            type: "line", // Joone tüüp
            xMin: userScoreIndex, // Joone algus X-teljel
            xMax: userScoreIndex, // Joone lõpp X-teljel
            borderColor: "red", // Joone värv
            borderWidth: 2, // Joone laius
            label: {
              content: "Your Average", // Joone silt
              enabled: true,
              position: "end", // Sildi asukoht
            },
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Score Range", // X-telje pealkiri
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Scores", // Y-telje pealkiri
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1>Statistics</h1>

      {loading ? (
        <p>Loading...</p>
      ) : scores.length === 0 ? (
        <p>Uuups! We dont have data. Please play games to see your stats.</p>
      ) : (
        <div>
          <h2>Your Average Addition Score: {averageScore}</h2>
          <div style={styles.chartContainer}>
            <Line data={chartData} options={chartOptions} /> {/* Graafiku komponent */}
          </div>
        </div>
      )}
      <div>
        <br />
        <AdditionScores />
      </div>
    </div>
  );
}

// Stiilid
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  chartContainer: {
    margin: "20px auto",
    maxWidth: "800px",
  },
};

export default Statistics;