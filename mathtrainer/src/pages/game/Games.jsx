import { Link } from "react-router-dom";
import styles from "./games.module.css";
import { Sidebar, Menu, MenuItem  } from 'react-pro-sidebar';
import { useEffect, useState } from "react";
import gamesData from "../../data/games.json";
import { get, getDatabase, push, ref, remove, set } from "firebase/database";
import { auth } from "../../firebase/firebase";

function Games() {
  const [likedGames, setLikedGames] = useState({});
  const realtimeDB = getDatabase();
  

  useEffect(() => {
    async function fetchLikedGames() {
      if (!auth.currentUser) return;

      const userId = auth.currentUser.uid;
      const favgameRef = ref(realtimeDB, `fav_games/${userId}`);

      try {
        const snapshot = await get(favgameRef);
        if (snapshot.exists()) {
          const favgames = snapshot.val();
          // Store liked games as an object { game_id: true }
          const likedMap = {};
          Object.values(favgames).forEach((game) => {
            likedMap[game.game_id] = true;
          });
          setLikedGames(likedMap);
        }
      } catch (error) {
        console.error("Error fetching liked games:", error);
      }
    }

    fetchLikedGames();
  }, []);
  

  async function changeLike(id){
    console.log(likedGames)
    
   
      if (!auth.currentUser) {
        return;
      }

      const userId = auth.currentUser.uid;
      const favgameRef = ref(realtimeDB, `fav_games/${userId}`);
    
      try {
        const snapshot = await get(favgameRef);
        let favgames = snapshot.exists() ? snapshot.val() : {};
    
        // Find the key of the existing entry with the same game_id
        let existingKey = null;
        Object.entries(favgames).forEach(([key, game]) => {
          if (game.game_id === id) {
            existingKey = key;
          }
        });
    
        if (existingKey) {
          // Game already exists in favorites, remove it
          await remove(ref(realtimeDB, `fav_games/${userId}/${existingKey}`));
          console.log("Game removed from favorites.");
        } else {
          // Game does not exist in favorites, add it
          const newEntry = {
            game_id: id,
            username: auth.currentUser?.displayName,
          };
    
          const newFavRef = push(favgameRef);
          await set(newFavRef, newEntry);
          console.log(likedGames);
          setLikedGames((prev) => {
            const { [id]: exists, ...updated } = prev;
            return exists ? updated : { ...prev, [id]: true };
          });
          
          
        }
      } catch (error) {
        console.error("Error toggling favorite game:", error);
      }
    };


    

  const groupedGames = gamesData.reduce((acc, game) => {
    const categoryKey = game.category.toUpperCase();
    if (!acc[categoryKey]) {
      acc[categoryKey] = [];
    }
    acc[categoryKey].push(game);
    return acc;
  }, {});

  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredGames = selectedCategory
    ? { [selectedCategory]: groupedGames[selectedCategory] }
    : groupedGames;

  return (
    <div className={styles.games}>
      <img className={styles.backgroundimg} src="/menupics/leaf.png" alt="" />
      <div className={styles.menu}>
        <Sidebar>
          <Menu>
            <br />
            <MenuItem onClick={() => setSelectedCategory(null)}>Show All</MenuItem>
            <br />
           { auth.currentUser && <MenuItem onClick={() => setSelectedCategory(null)}>Favorites</MenuItem>}
            <br />

            <div className={styles.sidebaritem}> GAMES</div>
            <MenuItem onClick={() => setSelectedCategory("MATH")}>Math</MenuItem>
            <MenuItem onClick={() => setSelectedCategory("SPATIAL REASONING")}>Spatial reasoning</MenuItem>
            <MenuItem onClick={() => setSelectedCategory("FLEXIBILITY")}>Flexibility</MenuItem>

          </Menu>
        </Sidebar>
      </div>
      <div className={styles.gamestop}>
        <div className={styles.menusection}>
          {Object.entries(filteredGames).map(([category, games]) => (
            <div key={category}>
              <div className={styles.gamesh1}>{category}</div>
                  <div className={styles.gamesbox}>
                    {games.map((game) => (
                      <div className={styles.gamesboxinside} key={game.id}>
                         {auth.currentUser && <img
                      src={`/games/math/like/${likedGames[game.id] ? "liked.svg" : "not-liked.svg"}`}
                      alt="Like Button"
                      onClick={() => changeLike(game.id)}
                      className={styles.likeButton} // TODO: Add styles to img if needed
                    />}
                        <Link className={styles.Link} to={game.link}>
                          <div className={styles.singlegame}>
                            <img src={game.image} className={styles.gameimage} alt={game.description} />
                            <div>{game.description}</div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Games;
