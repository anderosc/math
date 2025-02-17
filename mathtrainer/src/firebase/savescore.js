import { getDatabase, ref, get, set } from "firebase/database";
import { auth } from "./firebase"; // Või õige tee, kus firebase on

export function saveScore(points, userId) {
  if (!auth.currentUser) {
    console.log("Kasutaja ei ole sisse logitud, skoori salvestamine on keelatud.");
    return;
  }

  const db = getDatabase();
  const scoresRef = ref(db, "addition_scores/" + userId );

  get(scoresRef).then((snapshot) => {
    let scores = snapshot.exists() ? snapshot.val() : [];
    // If database doesnt have score table, start new array
    if (!Array.isArray(scores)) {
      scores = [];
    }

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1; // getMonth() tagastab 0-11
    const day = new Date().getDate();
    const fulldate = `${day}/${month}/${year}`;

    const newEntry = {
      points: points,
      date: fulldate,
      username: auth.currentUser?.displayName 
    };

     // Add new score, sort the array, if score doesnt reach to top20, dont add
    scores.push(newEntry);
    scores.sort((a, b) => b.points - a.points);
    const top20Scores = scores.slice(0, 20);

    // Salvestage uuendatud skoorid Firebase'i
    set(scoresRef, top20Scores);
  }).catch((error) => {
    console.error("Andmete salvestamisel tekkis viga:", error);
  });
}
