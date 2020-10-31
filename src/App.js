import "./App.css";
import React, { Component } from "react";
import MovieRow from './MovieRow.js';
import $ from 'jquery';

class App extends Component { 
  constructor(props){
    super(props)
    this.state = {}
  
this.performSearch("ant man")
  }
  performSearch(searchTerm){
    console.log("perform search using moviedb");
    const urlString = "http://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm;
    $.ajax({
      url: urlString,
      success:(searchResults) => {
        console.log("Fetched data successfully")
        //console.log(searchResults)
        const results = searchResults.results
        //console.log(results[0])
        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "http://image.tmdb.org/t/p/w185" + movie.poster_path;
          //console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie = {movie} />
          movieRows.push(movieRow)
        })
        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }
  searchChangeHandler(event){
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }
  render() {
    return (
      <div className="App">
     <table className="titleBar"> 
        <tbody>
          <tr>
            <td><img width="50" src="https://img.icons8.com/fluent/48/000000/kawaii-coffee.png" alt="app icon"/></td>
            <td width="8"/>
            <td>
              <h2>MoviesDB Search</h2>
            </td>
          </tr>
        </tbody>
      </table>
      <input style={{
        fontSize: 24,
        display: 'block',
        width: "99%",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16

      }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term"/>
      {this.state.rows}
     </div>
    );
  }
}

export default App;
