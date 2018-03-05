import React from 'react'
import { Segment, Header, Feed } from 'semantic-ui-react'
import NewsAPI from 'newsapi'
import Watson from 'watson-developer-cloud'
import NaturalLanguageUnderstandingV1 from 'watson-developer-cloud/natural-language-understanding/v1.js'



class NewsContainer extends React.Component {

  state = {
    articles: [],
    score: 0
  }

  componentDidMount(){
    this.fetchNews(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.fetchNews(nextProps)
  }

  fetchNews = (props) => {
    const newsapi = new NewsAPI('a53d6eac7ce54178bd0bcb9fd820d75c');
    console.log(props.name)
    newsapi.v2.everything({
    q: `${props.name} AND ${props.symbol} AND crypto`,
    language: 'en',
    sortBy: 'popularity',
    from: '2018-02-14',

  }).then(res => {
    this.judgeNews(res.articles)
  });
  }

  judgeNews = (articles) => {
    var natural_language_understanding = new NaturalLanguageUnderstandingV1({
      'username': 'b147c8bc-0bf4-434a-8939-4d5b2652f8a7',
      'password': '6HslRoMb6XFt',
      'version_date': '2017-02-27'
    });


    let judgedArticles = articles.map((article) => {

      var parameters = {
      'url': `${article.url}`,
      'features': {
        'sentiment': {
          'targets': [
            `${this.props.name}`,
            `${this.props.symbol}`
          ]
        }
      }
      };

      natural_language_understanding.analyze(parameters, (err, response) => {
      if (err)
        console.log('error:', err);
      else{
        article.sentiment = response.sentiment.document.label
        article.score = response.sentiment.document.score
        console.log(this.state.score)
        let newArticles = [...this.state.articles, article]
        newArticles.sort((a,b) => a.publishedAt > b.publishedAt)
        this.setState({
          articles: newArticles,
          score: this.state.score + article.score
        }, () => console.log(this.state, this.state.score / this.state.articles.length))
        }
      }
    );

    }

  );
}

  render() {
    const {name, symbol} = this.props
    return (
      <Segment>
        <Header>Overall Vibe Right Now is {this.state.score > 0 ? 'Positive' : 'Negative'} - Score is {this.state.score}</Header>
        <Feed size='large'>
          {this.state.articles.sort((a,b) => a.publishedAt < b.publishedAt).map((article) =>
            <Feed.Event>
              <Feed.Content>
                <Feed.Summary>
                  <a href={article.url}>{article.title}</a>
                  <Feed.Date>{article.publishedAt}</Feed.Date>
                </Feed.Summary>

                <Feed.Extra text>{article.description}</Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          )}
        </Feed>
      </Segment>
    );
  }
}

export default NewsContainer
