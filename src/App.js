import React from "react";
import "./App.css";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    document.getElementById("results").innerHTML = "";
    var keywords = document.getElementById("keySearch").value;
    var url =
      "https://api.currentsapi.services/v1/search?" +
      "keywords=" +
      keywords +
      "&apiKey=VYYrEpFL2Epw7WyFpvG7KrM2aRRgmSqJic102p8k6wGa-hYY";
    alert(url);
    var req = new Request(url);
    fetch(req)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.news);
        let NrResults = document.createElement("h3");
        NrResults.innerHTML =
          "Resultate gasite cu cuvantul '" +
          keywords +
          "' : " +
          data.news.length;
        document.getElementById("results").appendChild(NrResults);

        for (var i = 0; i < data.news.length; i++) {
          let itemList = document.createElement("div");
          itemList.id = "item" + i;
          itemList.className = "itemClass";

          let titleArticle = document.createElement("p");
          titleArticle.innerHTML = data.news[i].title;

          let descriptionArticle = document.createElement("p");
          descriptionArticle.innerHTML = data.news[i].description;

          let linkArticle = document.createElement("a");
          linkArticle.innerHTML = "Link";
          linkArticle.className = "buttonLink";
          linkArticle.href = data.news[i].url;

          document.getElementById("results").appendChild(itemList);
          document.getElementById("item" + i).appendChild(titleArticle);
          document.getElementById("item" + i).appendChild(descriptionArticle);
          document.getElementById("item" + i).appendChild(linkArticle);
        }
      });
    event.preventDefault();
  }

  render() {
    return (
      <form id="formSearch" onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="keySearch"
          placeholder="Enter Keyword"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NameForm />
        <div id="results"></div>
      </header>
    </div>
  );
}

export default App;
