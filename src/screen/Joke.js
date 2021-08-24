// import ShowBox from "./components/ShowBox";
// import InputBox from "./components/InputBox"
import React from "react";
import Axios from "axios";
import { Input, Button } from "semantic-ui-react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

class Joke extends React.Component {
  constructor() {
    super();
    this.state = {
      next: 0,
      loading: false,
      layoutName: "default",
      text: "",
      txtArr: [],
      inputTxt: "",
      inputArr: [],
    };
  }

  // handleText() split and save state.text as state.txtArr
  handleText = () => {
    const slitArr = this.state.text.split(" ");
    this.setState({
      txtArr: slitArr,
    });
  };

  // getJoke() is responsible of randomly pulls a joke one of the 2 different APIs, namely:
  //    1. https://v2.jokeapi.dev/joke/Any?type=twopart
  //    2. https://official-joke-api.appspot.com/jokes/random // for some reason not working correctly
  // and then save it to the state.text, and then saving it as an array to state.textArr
  getJoke = () => {
    const which = Math.round(Math.random()); // return either 0 or 1

    // saving this to that
    const that = this;

    // if (which === 0) {
      Axios.get("https://v2.jokeapi.dev/joke/Any?type=twopart").then((res) => {
        that.setState(() => ({
          loading: true
        }))

        const setup = res.data.setup;
        const delivery = res.data.delivery;
        const sentence = setup + " " + delivery;

        // due to the joke api's messing up with "‘", "’", "“", "”",
        //    I need to manually replace them with the correct version of quotes.
        sentence
          .replace(/’/g, "'")
          .replace(/“/g, '"')
          .replace(/”/g, '"')
          .replace(/  +/g, " ");

        // saving to txtArr
        that.setState(() => ({
          text: sentence,
          loading: false
        }));

        this.handleText();
        // this.handleNextChar()
      });
    // } else {
    //   Axios.get("https://official-joke-api.appspot.com/jokes/random").then((res) => {
    //     that.setState(() => ({
    //       loading: true
    //     }))

    //     const setup = res.data.setup;
    //     const delivery = res.data.punchline;
    //     const sentence = setup + " " + delivery;
    //     sentence
    //       .replace(/’/g, "'")
    //       .replace(/“/g, '"')
    //       .replace(/”/g, '"')
    //       .replace(/  +/g, " ");
    //     that.setState((state) => ({
    //       text: sentence,
    //       loading: false
    //     }));

    //     this.handleText();
    //   });
    // }
  };

  // match() checks if an input word matches the txtArr
  match = () => {
    const returnArr = [];
    for (var ii = 0; ii < this.state.txtArr.length; ++ii) {
      if (this.state.txtArr[ii] === this.state.inputArr[ii]) {
        returnArr.push(
          <span className="correct">{this.state.txtArr[ii]} </span>
        );
        if (ii === this.state.txtArr.length - 1) {
          document.getElementById("getJokeButton").innerText = "Get another";
          if (this.state.text === this.state.inputTxt) {
            console.log("all correct")
          }
        }
      } else if (!this.state.inputArr[ii]) {
        returnArr.push(
          <span className="notExist">{this.state.txtArr[ii]} </span>
        );
      } else {
        if (ii === this.state.inputArr.length - 1) {
          returnArr.push(
            <span className="next">{this.state.txtArr[ii]} </span>
          );
        } else {
          returnArr.push(
            <span className="incorrect">{this.state.txtArr[ii]} </span>
          );
        }
      }
    }
    return returnArr;
  };

  componentDidMount = () => {
    this.getJoke();
    // this.handleNextChar()
  };

  generateAJoke = (ev) => {
    // ev.preventDefault();
    this.getJoke();
    document.getElementById("typeInput").value = "";
    this.setState({
      inputTxt: "",
      inputArr: [],
      next: 0
    });
  };

  handleInputChange = (ev) => {
    this.setState(
      {
        inputTxt: ev.target.value,
      },
      () => {
        this.keyboard.setInput(ev.target.value);
      }
    );

    const splitArr = ev.target.value.split(" ");

    this.setState({
      inputArr: splitArr,
    })

  };

  onChange = (input) => {
    this.setState({
      inputTxt: input,
    });
  };

  onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") {
      this.handleShift();
    }
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default",
    });
  };

  handleKeyPress = (ev) => {
    var key = ev.key

    if (ev.code === "Enter") {
      return
    }

    if (key === "Shift") {
      this.handleShift();
    }

    if (key === "CapsLock") {
      this.handleShift();
    }

    if (key === " ") {
      key = "{space}"
    } else if (key === "Backspace") {
      key = "{bksp}"
    } else if (key === "Tab") {
      key = "{tab}"
    }

    if (ev.code !== "ShiftLeft" && ev.code !== "ShiftRight" && key !== "Meta") {
      // this.handleNextChar()
      if (key === "'") {
        document.querySelector('[data-skbtn="' + "'" + '"]').classList.add("hg-activeButton")
      } else if (ev.code === "Backslash") {
        document.querySelector('[data-skbtnuid="default-r1b13"]').classList.add("hg-activeButton")
      } else if (key === "Alt" || key === "Control" || key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp" || key === "ArrowDown") {
        console.log("alt || control")
      } else {
        document.querySelector("[data-skbtn='" + key + "']").classList.add("hg-activeButton")
      }
    }
  }

  isUpperCase = (letter) => letter === letter.toUpperCase()

  // handleNextChar = () => {
  //   if (this.state.inputTxt.length === this.state.text.length) {
  //     console.log("finished")
  //   } else {
  //     var nextKey = this.state.text.split("")[this.state.inputTxt.length]
  //     console.log(nextKey)

  //     if (nextKey === " ") {
  //       nextKey = "{space}"
  //     }

  //     if (nextKey === "'") {
  //       document.querySelector('[data-skbtn="' + "'" + '"]').classList.add("buttonNext")
  //     } else if (nextKey === "\\") {
  //       document.querySelector('[data-skbtnuid="default-r1b13"]').classList.add("buttonNext")
  //     } else if (this.isUpperCase(nextKey)) {
  //       document.querySelector('[data-skbtnuid="default-r3b0"]').classList.add("buttonNext")
  //       document.querySelector("[data-skbtn='" + nextKey.toLowerCase() + "']").classList.add("buttonNext")
  //     } else {
  //       document.querySelector("[data-skbtn='" + nextKey + "']").classList.add("buttonNext")
  //     }
  //   }
  // }

  handleKeyUp = (ev) => {
    var key = ev.key

    if (ev.code === "Enter") {
      this.generateAJoke()
      return
    }

    if (key === "Shift") {
      this.handleShift();
    }

    if (key === " ") {
      key = "{space}"
    } else if (key === "Backspace") {
      key = "{bksp}"
    } else if (key === "Tab") {
      key = "{tab}"
    }

    if (ev.code !== "ShiftLeft" && ev.code !== "ShiftRight" && key !== "Meta") {
      if (key === "'") {
        document.querySelector('[data-skbtn="' + "'" + '"]').classList.remove("hg-activeButton")
        // document.querySelector('[data-skbtn="' + "'" + '"]').classList.remove("buttonNext")
      } else if (ev.code === "Backslash") {
        document.querySelector('[data-skbtnuid="default-r1b13"]').classList.remove("hg-activeButton")
        // document.querySelector('[data-skbtnuid="default-r1b13"]').classList.remove("buttonNext")
      } else if (key === "Alt" || key === "Control" || key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp" || key === "ArrowDown") {
        console.log("alt || control")
      } else {
        document.querySelector("[data-skbtn='" + key + "']").classList.remove("hg-activeButton")
        // document.querySelector("[data-skbtn='" + key + "']").classList.remove("buttonNext")
      }
    }

    // this.handleNextChar()
  }

  render() {
    return (
      <div>
        <div>
          <h1>Type Fun!</h1>

          <p>{this.match()}</p>

          <div>
            <Input
              placeholder="Type here"
              autoComplete="off"
              onChange={this.handleInputChange}
              id="typeInput"
              value={this.state.inputTxt}
              onKeyDown={this.handleKeyPress}
              onKeyUp={this.handleKeyUp}
            />
            <Button onClick={this.generateAJoke} id="getJokeButton">
              Get a joke
            </Button>
          </div>

          <div>
            <Keyboard
              keyboardRef={(r) => (this.keyboard = r)}
              theme={"hg-theme-default"}
              layoutName={this.state.layoutName}
              onChange={(input) => this.onChange(input)}
              onKeyPress={(button) => this.onKeyPress(button)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Joke;
