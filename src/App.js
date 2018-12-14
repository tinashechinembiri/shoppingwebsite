import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Men from "./Component/Men";
import Women from "./Component/Women";
import Navbar from "./Component/Toolbar/Navbar"
import SideButton from "./Component/Toolbar/SideButton";
import Backdrop from "./Component/Toolbar/Backdrop";
import Individual from "./Component/Individual";


class App extends Component {
    state = {
        checkDrawer:false
    };
    onclicksideButton = () => {
        this.setState(
            (prev)=>{
                return {checkDrawer:!prev.checkDrawer}
            }
        )};
  render() {

      let sideButton;
      let backdrop;
      if (this.state.checkDrawer === true)
      {
         sideButton= <SideButton/>
          backdrop = <Backdrop/>

      }
    return(

        <div style={{height:'100%'}} className="mainContainer">
            <Navbar drawerClickHandler ={this.onclicksideButton}/>
            {sideButton}
            {backdrop}

            <div style={{marginTop:'64px'}}>

          <Router>
            <Switch>
                <Route path='/' exact={true} component={Men}/>
                <Route path='/women'exact={true} component={Women}/>
                <Route path='/:id' exact={true} component={Individual}/>
            </Switch>

          </Router>
            </div>
        </div>
              )}
}

export default App;
