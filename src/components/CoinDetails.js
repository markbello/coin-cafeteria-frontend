import React from 'react'
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('a53d6eac7ce54178bd0bcb9fd820d75c');

class CoinDetails extends React.Component {

  state = {
    fromDate: null
  }

  fetchNews = (props) => {
    newsapi.v2.everything({
      q: `${props.coin}`,
      from: this.state.fromDate,
      language: 'en'
    }).then(response => {
      console.log(response)
    });
  }

  componentDidMount = () => {
    let d = new Date();
    d.setDate(d.getDate()-1);
    let isoDate = d.toISOString()
    this.setState({
      fromDate: isoDate
    }, () => {
      console.log(this.state)
      this.fetchNews(this.props)})

  }

  componentWillReceiveProps = (nextProps) => {
    this.fetchNews(nextProps)
  }

  // shouldComponentUpdate = (nextProps) => {
  //   return nextProps === this.props
  // }

  render() {
    return (
      <h1>Fuck {this.props.coin}</h1>
    );
  }
}

export default CoinDetails
