import React, { Component } from 'react';
import './App.css';
import FacebookLoginButton from './component/FacebookLogin';
import { Button } from "react-bootstrap"

class App extends Component {

  state = {
    username: null,
    usermail: null,
    userPicture: null,
    albums: null
  };

  onFacebookLogin = (loginStatus, resultObject) => {
    if (loginStatus === true) {
      this.setState({
        username: resultObject.user.name,
        usermail: resultObject.user.email,
        userPicture: resultObject.user.picture.data.url
      });
    }
  }

  loadAlbums = (loginStatus, resultObject) => {
    if (loginStatus === true) {
      this.setState({
        albums: resultObject.user.data
      });
    }
  }

  render() {
    const { username, albums } = this.state;

    return (
      <div className="App-intro">
        {!username &&
          <div className="facebook">
            <FacebookLoginButton onLogin={this.onFacebookLogin} albums={this.loadAlbums} >
              <Button variant="primary">Login to Facebook</Button>
            </FacebookLoginButton>
          </div>
        }
        {username &&
          <div style={{ width: "400px", margin: "auto" }}>
            <img src={this.state.userPicture} alt={this.state.username} style={{ position: "relative", left: "40%", top: "20%" }} />
            <h2 style={{ textAlign: "center" }}>{this.state.username}</h2>
            <h3 style={{ textAlign: "center" }}>Email: {this.state.usermail}</h3>
          </div>
        }

        {username && <h1 className="albums">Albums</h1>}

        <div className="parent">
          {albums && albums.length > 0 && albums.map((value, index) => {
              return <div key={index} className="child">
                <div>{value.name}</div>
                <a href={value.link}>{value.name}</a>
              </div>
            })
          }
        </div>

      </div>
    );
  }
}

export default App;