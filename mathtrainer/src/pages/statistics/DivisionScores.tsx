import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../../firebase/firebase";
import styles from "./statistics.module.css"

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin 
);

interface Score {
  points: number;
  date: string;
  username: string;
}

function useScores(datalocation: string, userId: string) {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const db = getDatabase();
    const scoresRef = ref(db, `${datalocation}/${userId}`); 

 
    get(scoresRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (Array.isArray(data)) {
            setScores(data); 
          }
        }
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Loading data error:", error);
        setLoading(false); 
      });
  }, [datalocation, userId]);

  return { scores, loading };
}


function calculateAverage(scores: Score[]): number {
  if (scores.length === 0) return 0; 
  const total = scores.reduce((sum, score) => sum + score.points, 0); 
  return parseFloat((total / scores.length).toFixed(2)); 
}

function createScoreDistribution(comparisonScores: number[]) {
  const scoreRanges = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1400, 1500]; 
  const distribution = new Array(scoreRanges.length - 1).fill(0); 

 
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

const DivisionScores: React.FC = () => {
  const userId = auth.currentUser?.uid || ""; 
  const { scores, loading } = useScores("division_scores", userId);
  const averageScore = calculateAverage(scores); 

  const comparisonScores =  [
    1567, 1789, 1654, 1923, 1512, 45, 123, 87, 156, 199, 205,209,305,408, 485, 495,505, 505, 505, 505,         
    850, 920, 780, 1100, 950, 670, 1200, 890, 1300, 740,980, 1050, 820, 1150, 760,900, 1080, 830, 1250, 
    790,940, 1020, 870, 1350, 810,970, 990, 880, 1400, 840,960, 1010, 890, 1450, 860,930, 1040, 910, 1280,
    770,910, 1060, 920, 1320, 750,890, 1070, 930, 1380, 730,880, 1030, 940, 1420, 720,870, 1090, 950, 1480,
    710,860, 1110, 960, 1490, 700,850, 1120, 970, 1470, 690,840, 1130, 980, 1460, 680,830, 1140, 990, 1440,
    670,820, 1160, 1000, 1430, 660,810, 1170, 1010, 1410, 650
  ];

  const { distribution, scoreRanges } = createScoreDistribution(comparisonScores);

  const userScoreIndex = scoreRanges.findIndex((range) => averageScore >= range && averageScore < range + 200);

  const chartData = {
    labels: scoreRanges.slice(0, -1).map((range, index) => `${range}-${scoreRanges[index + 1]}`), 
    datasets: [
      {
        label: "Score Distribution", // Dataseries name
        data: distribution, // Y values
        borderColor: "rgba(75, 192, 192, 1)", 
        backgroundColor: "rgba(75, 192, 192, 0.2)", 
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Score Distribution and Your Position",
    },
    annotation: {
      annotations: {
        userScore: {
          type: "line", 
          xMin: userScoreIndex, 
          xMax: userScoreIndex,
          borderColor: "red",
          borderWidth: 3,
          label: {
            content: "Your Average",
            enabled: true,
            position: "end",
          },
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Score Range",
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of Scores",
      },
    },
  },
};

  return (
    <div className={styles.container}>
 

 {loading ? (
        <p>Loading...</p>
      ) : scores.length === 0 ? (
        <p>Uuups! We dont have data. Please play games or log in to see your stats.</p>
      ) : (
        <div>
          <h3>Division Average Score: {averageScore}</h3>
          <div className={styles.chartContainer2}>
            <Line data={chartData} options={chartOptions} /> 
          </div>
        </div>
      )}
    </div>
  );
};


export default DivisionScores;