import React, { Component } from 'react';
import './App.css';

class App extends Component {
 
  state = {
    list : [],
    jsonHost: 'http://localhost:3000/winnipeg'
  }
  
  /* Will fetch the data only if the App Component is loaded */
  componentDidMount(){
    fetch(this.state.jsonHost)

      .then((response) => {
        if (response.status !== 200) {
              console.log("error");
          } else {
              return response.json();
          }
        })
      .then((data) => {
        this.setState({
          list: data
        })
      })
    }

  render() {
    const teams = this.state.list
    return (
      <div className="app">
        {teams.map((team) => { 
          return (
              <div key={team.id} id="no-more-tables">
                <div className="team_info">
                  <div>
                    <img src={team.team_extra_info.url['6'].url} alt={team.fist_name} width={team.team_extra_info.url['6'].width} height={team.team_extra_info.url['6'].height} />
                  </div>
                  <div>
                    <h1 className="name">{team.last_name} {team.first_name}</h1>
                    <p className="division"><strong>Division: </strong>{team.division_name}</p>
                    <p className="conference"><strong>Conference: </strong>{team.conference_name}</p>
                  </div>
                </div>
                
                <table className="Players" border="0" cellSpacing="0" cellPadding="0">
                  <thead>
                    <tr>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Weight</th>
                      <th>Height</th>
                      <th>BirthDay</th>
                    </tr>
                    </thead>
                    <tbody>
                    {team.roster.map((player) => {
                      return (
                      <tr className="player" key={player.id}> 
                        <td data-title="Picture"><img alt={player.first_name} src={player.image['1'].url} height={player.image['1'].height} width={player.image['1'].width}/></td>
                        <td data-title="Name">{player.first_name} {player.last_name}</td>
                        <td data-title="Position">{player.position}</td>
                        <td data-title="Weight">{player.weight}</td>
                        <td data-title="Height">{player.height}</td>
                        <td data-title="Birthday">{player.birth_date}</td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
        })}
      </div>
    );
  }
}

export default App;
