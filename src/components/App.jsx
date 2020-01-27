import React from "react";

//internal components
import Scoreboard from "./ScoreBoard.jsx";
//get data
import Words from "../assets/words.json";
import LetterValue from "../assets/letter-values.json";
import State from "../assets/state.json";
const MyContext = React.createContext();
class MyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = State;
  }

  //
  startGame = () => {
    let word = this.getRandomArrayElements(Object.keys(LetterValue), 8);
    this.generateMatches(word.join(""));
    this.setState({ isStart: true, foundWords: [], score: 0 });
  };

  getHintWord = arr => {
    this.getMaximumScore(arr);
  };

  getRandomArrayElements = (arr, count) => {
    let result = "";
    let randomWordResult = [];
    var shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp,
      index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    result = shuffled
      .slice(min)
      .toString()
      .toUpperCase()
      .split("");
    this.setState({
      randomWord: result
    });
    return shuffled.slice(min);
  };

  calculateScoreforMatchers = matchers => {
    let matchersScore = [];
    for (let i = 0; i < matchers.length; i++) {
      matchersScore.push([matchers[i], this.scoreWord(matchers[i])]);
    }
    this.setState({ matchersScore: matchersScore });
    return matchersScore;
  };

  getMaximumScore = matchers => {
    let maximumScore = 0;
    console.log(matchers);
    let matchersScore = this.calculateScoreforMatchers(matchers);
    console.log(matchersScore);
    let hint;
    for (let i = 0; i < matchersScore.length; i++) {
      maximumScore = Math.max(maximumScore, matchersScore[i][1]);
      hint = maximumScore === matchersScore[i][1] ? matchersScore[i][0] : hint;
    }
    this.setState({ HintScore: maximumScore, HintWord: hint });
    return hint;
  };

  generateMatches = letter => {
    let allPossible = this.getPermutationsAllLengths(
      letter.toString().toUpperCase()
    );
    let result = [];
    let wordo = new Set(Words);
    for (let i = 0; i < allPossible.length; i++) {
      if (wordo.has(allPossible[i])) {
        result.push(allPossible[i].toString().toLowerCase());
      }
    }
    // filter out duplicates and sort by length
    result = [...new Set(result)].sort((a, b) => b.length - a.length);
    console.log(result);
    let hint = this.getMaximumScore(result);
    this.setState({
      matches: result,
      remainingMatches: result,
      HintWord: hint
    });
    return result;
  };
  addWordToFoundWords = word => {
    let newFounds = this.state.foundWords;
    newFounds.push(word);
    this.setState({ foundWords: newFounds });
    this.removeFromRemaining(word);
  };
  //remove word from remaining matches after sumbitting
  removeFromRemaining = word => {
    let array = this.state.remainingMatches;
    let index = array.indexOf(word);
    if (index > -1) {
      array.splice(index, 1);
      this.setState({ remainingMatches: array });
    }
  };
  scoreWord = word => {
    let letters = word.split("");
    let result = 0;
    for (let i = 0; i < letters.length; i++) {
      result = LetterValue[letters[i]] + result;
    }
    result =
      word.length === 8 ? result * word.length + 50 : result * word.length;
    return result;
  };
  addScoreToTotal = word => {
    let scoreOfWord = this.scoreWord(word);
    let totalScore = this.state.score + scoreOfWord;
    this.setState({ score: totalScore });
  };
  // find all permutations of an array
  swap = (array, i, j) => {
    if (i !== j) {
      let swap = array[i];
      array[i] = array[j];
      array[j] = swap;
    }
  };

  permute_rec = (res, str, array) => {
    if (array.length === 0) {
      res.push(str);
    } else {
      for (let i = 0; i < array.length; i++) {
        this.swap(array, 0, i);
        this.permute_rec(res, str + array[0], array.slice(1));
        this.swap(array, 0, i);
      }
    }
  };

  permute = array => {
    let res = [];
    this.permute_rec(res, "", array);
    return res;
  };

  xpermute_rec = (res, sub, array) => {
    if (array.length === 0) {
      if (sub.length > 0) this.permute_rec(res, "", sub);
    } else {
      this.xpermute_rec(res, sub, array.slice(1));
      this.xpermute_rec(res, sub.concat(array[0]), array.slice(1));
    }
  };

  // find all permutations for all lengths
  getPermutationsAllLengths = array => {
    let res = [];
    this.xpermute_rec(res, [], array);
    return res;
  };
  // display results modal
  handleShowResultsModal = () => {
    this.setState({ isResultDisplayed: true });
  };

  // close results modal
  handleCloseResultsModal = () => {
    this.setState({ isResultDisplayed: false });
  };
  validatedWord = () => {
    let result = false;
    let word = this.state.inputWord;
    let wordo = new Set(Words);
    if (wordo.has(word.toUpperCase())) {
      result = true;
    }
    this.handleValidityCheck(result, word);
  };
  handleValidityCheck = (isValid, word) => {
    if (isValid && !this.state.foundWords.includes(word)) {
      this.addScoreToTotal(word);
      this.addWordToFoundWords(word);
      this.getMaximumScore(this.state.remainingMatches);
      this.setState({ inputWord: "" });
      if (this.state.remainingMatches.length === 0) {
        alert(
          "Congrats! You find all words! Press restart button to play another game!"
        );
      }
    } else if (isValid && this.state.foundWords.includes(word)) {
      alert("This word is already found! Try to find other words!");
    } else alert("Wrong Answer! Try Again!");
  };
  endGame = () => {
    this.setState({ isStart: false });
    this.handleShowResultsModal();
  };
  updateInputWord = input => {
    this.setState({ inputWord: input.target.value });
  };
  render() {
    return (
      <MyContext.Provider
        value={{
          generateMatches: this.generateMatches,
          state: this.state,
          startGame: this.startGame,
          endGame: this.endGame,
          closeShowResult: this.closeShowResult,
          showResult: this.showResult,
          updateInputWord: this.updateInputWord,
          validatedWord: this.validatedWord
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
// render main app component
class App extends React.Component {
  render() {
    return (
      <MyProvider>
        <MyContext.Consumer>
          {context => (
            <React.Fragment>
              <div className="App">
                <Scoreboard />
              </div>
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </MyProvider>
    );
  }
}

// export app component
export default App;

// export context
export { MyContext };
