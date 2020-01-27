import React from "react";
import { MyContext } from "./App.jsx";

class ScoreBoard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  // SOCIAL PANEL JS
  render() {
    return (
      <MyContext>
        {context => (
          <div>
            {console.log(context)}
            <div className="courses-container">
              <div className="course">
                <div className="course-preview">
                  <h2>Word Master</h2>
                </div>
                <div className="course-info">
                  <div className="grid-x grid-padding-x">
                    <h3 className="large-4 medium-4 small-4 cell">
                      Score <br /> {context.state.score}
                    </h3>
                    <h3 className="large-4 medium-4 small-4 cell">
                      Found <br /> {context.state.foundWords.length}
                    </h3>
                    <h3 className="large-4 medium-4 small-4 cell">
                      Remaining <br />
                      {context.state.remainingMatches.length}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="courses-container">
              <div className="course">
                <div className="grid-x grid-padding-x">
                  <div className="course-preview">
                    <h6>
                      Random Word:
                      <br />
                    </h6>
                    <h5 className="large-4 medium-4 small-4 cell">
                      {context.state.randomWord}
                      {console.log(context.state.randomWord)}
                    </h5>
                  </div>
                </div>
                <div className="course-info">
                  <input
                    id="test"
                    className="input"
                    style={{ float: "center" }}
                    value={context.state.inputWord}
                    onChange={context.updateInputWord}
                    onKeyPress={this.handelEnterKey}
                  ></input>
                  <button
                    id="inputButton"
                    className="btn"
                    type="button"
                    onClick={context.validatedWord}
                  >
                    Submmit
                  </button>
                </div>
              </div>
            </div>
            {context.state.isStart ? (
              <button className="floating-btn-left" onClick={context.startGame}>
                Restart
              </button>
            ) : (
              <button className="floating-btn-left" onClick={context.startGame}>
                Start
              </button>
            )}
            <div className="social-panel-container-right">
              <div className="social-panel-right">
                <h4>
                  Hint:
                  {context.state.HintWord}({context.state.HintScore})
                </h4>
              </div>
            </div>
            <button className="floating-btn-right">Hint</button>
            <div className="social-panel-container">
              <div className="social-panel">
                <p>Game Result</p>
                <div className="grid-x grid-padding-x">
                  <h4 className="large-4 medium-4 small-4 cell">
                    FOUND <br />
                    <br />
                    {context.state.foundWords.length}
                  </h4>
                  <h4 className="large-4 medium-4 small-4 cell">
                    FINAL SCORE
                    <br />
                    <br /> {context.state.score}
                  </h4>
                  <h4 className="large-4 medium-4 small-4 cell">
                    MISSED <br />
                    <br />
                    {context.state.remainingMatches.length}
                  </h4>
                </div>
                <div>
                  <h5>Found Words</h5>
                  <hr className="style-two" />
                  <h2 style={{ fontSize: "10px" }}>
                    {context.state.foundWords.join(", ")}
                  </h2>
                </div>
                <div>
                  <h5>Reamining Words</h5>
                  <hr className="style-two" />
                  <h2 style={{ fontSize: "10px" }}>
                    {context.state.remainingMatches.length === 0
                      ? "You found all the possible words!"
                      : context.state.remainingMatches.join(", ")}
                  </h2>
                </div>
              </div>
            </div>
            <button id="111" className="floating-btn">
              Show Game Result
            </button>
          </div>
        )}
      </MyContext>
    );
  }
}

export default ScoreBoard;
