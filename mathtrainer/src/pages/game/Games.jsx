import { Link } from "react-router-dom";
import "./games.css";
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
    <div className="games">
      <img className="backgroundimg" src="/menupics/leaf.png" alt="" />
      <div className="menu">
        <Sidebar>
          <Menu>
            <br />
            <MenuItem onClick={() => setSelectedCategory(null)}>Show All</MenuItem>
            <br />
            <MenuItem onClick={() => setSelectedCategory(null)}>Favorites</MenuItem>
            <br />

            <div className="sidebaritem"> GAMES</div>
            <MenuItem onClick={() => setSelectedCategory("MATH")}>Math</MenuItem>
            <MenuItem onClick={() => setSelectedCategory("BINARY")}>Binary</MenuItem>
            <MenuItem onClick={() => setSelectedCategory("SPATIAL REASONING")}>Spatial reasoning</MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div className="gamestop">
        <div className="menusection">
          {Object.entries(filteredGames).map(([category, games]) => (
            <div key={category}>
              <div className="gamesh1">{category}</div>
              <div className="gamesbox">
                {games.map((game) => (
                  <div className="gamesboxinside" key={game.id}>
                    <Link className="Link" to={game.link}>
                      <div className="singlegame">
                        <img src={game.image} className="gameimage" alt={game.description} />
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
