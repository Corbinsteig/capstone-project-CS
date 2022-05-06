let season = '2015'
let team = 'Hawks ATL'
let teamArray = null
const getPlayersButton = document.querySelector('#button')
// const axios = require("axios");
const teamRequest = {
  method: 'GET',
  url: 'https://api-nba-v1.p.rapidapi.com/teams',
  headers: {
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    'X-RapidAPI-Key': '595667621amsh79cbeb497007250p111314jsn28500c4833ff'
  }
};

axios.request(teamRequest).then(function (response) {
  teamArray = response.data.response
	for (let i = 0; i < response.data.response.length; i++){
    let newRes = document.createElement("button")
    let city = response.data.response[i].city
    let nickname = response.data.response[i].nickname
    let code = response.data.response[i].code
    if (city == nickname && city == code){
      newRes.textContent = city 
    } else if (city == nickname){
      newRes.textContent = city + " " + code
    } else if (code == nickname){
      newRes.textContent = code
    } else {
      newRes.textContent = nickname + " " + code
    }
    document.querySelector('#teams').appendChild(newRes)
  }

});

const getPlayers = () => {
  if (isNaN (parseInt (team))) {
    let lastIndex = team.lastIndexOf(' ')
    console.log(lastIndex)
    let teamCode = team.slice(lastIndex+1, team.length)
    console.log(teamCode)
    for (let i = 0; i < teamArray.length; i++) {
      if(teamArray[i].code == teamCode) {
        team = teamArray[i].id
      }
    }
  }
  let options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players',
    params: {team: team, season: season},
    headers: {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '595667621amsh79cbeb497007250p111314jsn28500c4833ff'
    }
  };
  axios.request(options).then(function (response) {
    document.querySelector('#player-container').innerHTML = ""
    for (let i = 0; i < response.data.response.length; i++){
      let newRes = document.createElement("h2")
      newRes.classList.add('players')
      newRes.textContent = response.data.response[i].firstname + ' ' + response.data.response[i].lastname 
      if (response.data.response[i].height.feets == null) {
        // ask for cullens assistance for elseif statements
        // + '  | Weight: ' + response.data.response[i].weight.pounds + "  | Birthdate: " + response.data.response[i].birth.date + " | NBA Start Date: " + response.data.response[i].nba.start
        newRes.textContent +=  ' | Height: DNIA '  
      } else {
        newRes.textContent += ' | Height: ' + response.data.response[i].height.feets + "' " +response.data.response[i].height.inches + '" '
      }
      if (response.data.response[i].weight.pounds == null) {
        newRes.textContent += '| Weight: DNIA'
      } else {
        newRes.textContent += '| Weight: ' + response.data.response[i].weight.pounds
      }
      if (response.data.response[i].birth.date == null) {
        newRes.textContent += "| Birthdate: DNIA "
      } else {
        newRes.textContent += '| Birthdate: ' + response.data.response[i].birth.date
      }
      if (response.data.response[i].nba.start == 0) {
        newRes.textContent += "| NBA Start Date: DNIA "
      } else {
        newRes.textContent += '| NBA Start Date: ' + response.data.response[i].nba.start
      }
      document.querySelector('#player-container').appendChild(newRes)
    }
  })
}

getPlayersButton.addEventListener('click', getPlayers)

document.getElementById("seasons").addEventListener("click", function(seasonDropDown) {
  if(seasonDropDown.target) { 
    season = seasonDropDown.target.innerText
    document.getElementById("seasonsbtn").textContent = season
  }
});

document.getElementById("teams").addEventListener("click", function(teamsDropDown) {
  if(teamsDropDown.target) { 
    team = teamsDropDown.target.innerText
    document.getElementById("teamsbtn").textContent = team 
  }
});