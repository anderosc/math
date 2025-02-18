import { Link } from "react-router-dom";
import styles from "./games.module.css";
import { Sidebar, Menu, MenuItem  } from 'react-pro-sidebar';
import { useState } from "react";
import gamesData from "../../data/games.json";

function Games() {
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
            <MenuItem onClick={() => setSelectedCategory(null)}>Favorites</MenuItem>
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
