import React, { useEffect, useState } from "react";
import Particles from "react-particles-js";

import data from "./data";
import "./App.css";
// Importing the our react context api custom hook
import { useDataLayer } from "./context";
import particlesConfig from "./particlesjs-config.json";

function App() {
  const [{ winner, game }, dispatch] = useDataLayer();
  // Defining our local state
  const [winnerMsg, setWinnerMsg] = useState("");
  const [winnerColor, setWinnerColor] = useState("");

  // Creating our handling function
  const handleClick = (name) => {
    // Dispatching an action with the user play
    dispatch({ type: "USER_PLAY", payload: { play: name } });

    // Getting a rundom play in order for it to be the computer choice
    let randomNumber = Math.floor(Math.random() * 3);
    let computer_pick = data[randomNumber].name;

    // Dispatching an action with the computer choice
    dispatch({ type: "COMPUTER_PLAY", payload: { play: computer_pick } });

    // Dispatching an action to the reducer to make the decision (who won the game ?)
    dispatch({ type: "GET_RESULT" });
  };
  // Setting the message which will be showed on the front end based on what the reducer decided
  const getWinner = (winner) => {
    if (winner === "YOU") {
      return {
        msg: "Congratulations You Won !",
        color: "rgba(9, 179, 9, 0.609)",
      };
    }
    if (winner === "COMPUTER") {
      return {
        msg: "You Lose !, Computer Won !",
        color: "rgba(246, 54, 54, 0.582)",
      };
    }
    if (winner === "DRAW") {
      return {
        msg: "It is a Draw . Play again ! ",
        color: "rgba(136, 135, 135, 0.609) ",
      };
    }
  };

  useEffect(() => {
    if (winner) {
      setWinnerMsg(getWinner(winner).msg);
      setWinnerColor(getWinner(winner).color);
      // Dispatching an action to reset the game and get rid of our previous state.
      dispatch({ type: "RESET_GAMES" });
    }
  }, [winner, dispatch]);
  return (
    <div className="app">
      <Particles params={particlesConfig} className="particles" />
      <h1 className="app__title">Welcome to Rock|Paper|Scissors Game</h1>
      <div
        className="app__result"
        style={{
          backgroundColor: winnerColor,
        }}
      >
        <div>
          <h1>
            YOU : <span>{game?.user}</span>
          </h1>
          <h1>
            <span>{game?.computer}</span> : COMPUTER
          </h1>
        </div>
        <p>{winnerMsg}</p>
      </div>
      <div className="app__row">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="row"
              onClick={() => handleClick(item.name)}
            >
              <img className="row__image" src={item.image} alt={item.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
