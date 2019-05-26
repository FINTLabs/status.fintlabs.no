import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: [],
      beta: [],
      pwf: []
    };
  }

  getStatus = () => {
    const url = `/api/healthcheck`;
    return fetch(url, {
      method: "GET",
      credentials: "same-origin"
    }).then(response => Promise.all([response, response.json()]));
  };

  componentDidMount() {
    this.getStatus().then(([response, json]) => {
        console.log(json);
      if (response.status === 200) {
        this.setState({ api: json.api, beta: json.beta, pwf: json['play-with-fint'] });
      }
    });
  }

  getHealthStatus = healthy => {
    return healthy ? "status-ok" : "status-failed";
  };

  render() {
    const { api, beta, pwf } = this.state;
    return (
      <div className="container">
        <header>
          <img src="fint.svg" alt="FINTLabs" className="f-fint-logo-normal" />
          <h1>status.fintlabs.no</h1>
        </header>
        <main>
          <div className="status-bar">
            <h1>Alle tjenester kjører</h1>
          </div>
          <div className="status-list">
            <h2>https://api.felleskomponent.no</h2>
            <div className="status-list-api">
              {api.map((component, index) => (
                <div key={index} className="status-card">
                  <div className="status-icon">
                    <span className={this.getHealthStatus(component.healthy)} />
                  </div>
                  <div className="status-name">{component.props.path}</div>
                </div>
              ))}
            </div>

            <h2>https://beta.felleskomponent.no</h2>
            <div className="status-list-beta">
              {beta.map((component, index) => (
                <div key={index} className="status-card">
                  <div className="status-icon">
                    <span className={this.getHealthStatus(component.healthy)} />
                  </div>
                  <div className="status-name">{component.props.path}</div>
                </div>
              ))}
            </div>

            <h2>https://play-with-fint.felleskomponent.no</h2>
            <div className="status-list-pwf">
              {pwf.map((component, index) => (
                <div key={index} className="status-card">
                  <div className="status-icon">
                    <span className={this.getHealthStatus(component.healthy)} />
                  </div>
                  <div className="status-name">{component.props.path}</div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    );
  }
}

export default App;
