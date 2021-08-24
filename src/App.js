// import ShowBox from "./components/ShowBox";
// import InputBox from "./components/InputBox"
import 'semantic-ui-css/semantic.min.css'
import "./App.css";
import React from "react";
import Joke from "./screen/Joke"
import { Input, Menu } from 'semantic-ui-react'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      activeItem: "Home"
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handlePages = () => {
    console.log("handling")
    if (this.state.activeItem === "Home") {
      console.log("home now babe")
      return <h1>this is home</h1>
    } else if (this.state.activeItem === "Jokes") {
      console.log("just kidding")
      return <Joke />
    }
  }

  render() {
    const { activeItem } = this.state

    return <div class="wrapper">
      <Menu pointing>
        <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Jokes'
          active={activeItem === 'Jokes'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Quotes'
          active={activeItem === 'Quotes'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <div id="pages">
        {this.handlePages()}
      </div>
    </div>
  }
}

export default App;
