import React from 'react';
import './App.css';
import ImageSearch from './ImageSearch/ImageSearch'
import ImageList from './ImageList/ImageList'

const API_KEY = "15541993-a79861928aa125239bb310faf"

class App extends React.Component {
  state = {
    images: [],
    error: null
  }
  handleGetRequest = async (e) => {
    e.preventDefault()
    const searchTerm = e.target.elements.searchValue.value
    const url = `https://pixabay.com/api/?key=${API_KEY }&q=${searchTerm}&image_type=photo`
    const request = await fetch(url)
    const response = await request.json()
    this.setState({ images: response.hits })
    if ( !searchTerm) {
      this.setState({ error: "Please provide a value" })
    }else{
      this.setState({ image: response.hits, error: null })
    }
  }
  render () {
    return(
      <div>
        <ImageSearch handleGetRequest = {this.handleGetRequest} />
        {
          this.state.error !== null ?
          <div style= {{color:"#fff", textAlign:"center"}}>{ this.state.error }</div> :
          <ImageList images = { this.state.images } />
        }
       
      </div>

    )
  }
}


export default App;
