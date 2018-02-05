import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function TimeAndDate(props) {
  return <h3>{props.date.toDateString()}{props.date.toLocaleTimeString()}</h3>;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      articles: []
    };
  }

  componentDidMount() {
    axios.get('/api/articles')
      .then(res => {
        this.setState({articles: res.data});
        console.log(this.state.articles);
      });

    this.TimerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.TimerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand navig-brand"> NBA Insider - React</Link>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/" className="active">Home</Link></li>
                <li><Link to="/create">Write an Article</Link></li>
                <li><Link to="/test">Test</Link></li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title article-title">Articles</h3>
              <TimeAndDate date = {this.state.date} />
            </div>
            <div class="panel-body">
              {/* <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Article</Link></h4> */}
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th className="col-md-3">Inside the NBA</th>
                    <th className="col-md-9">Headlines</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.articles.map(article =>
                  <tr>
                    <td>
                    <img src={ require('./assets/nba-logo.jpg') } className="img-responsive" />
                    </td>
                    <td>
                      <div className="article-title">
                        <Link to={`/show/${article._id}`} className="article-title">{article.title}</Link>
                      </div>
                      <div className="row content">
                        {article.content.slice(0, 350)}
                      </div>
                      <div className="row content">
                        <button type="button" className="btn btn-primary read-more-btn"><Link to={`/show/${article._id}`} className="read-more">Read more</Link></button>
                      </div>
                    </td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <footer className="custom-footer">
        <hr/>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Copyright @ NBA Insider</h2>
                <p>Institute of Art Design &amp; Technology</p>
              </div>
            </div>
            <div class="row details">
                <div class="col-md-12">Julz Engracio - N00145647
                  <p>email@email.com</p>
                  <img src={ require('./assets/facebook.png') } className="logo img responsive"/>
                  <img src={ require('./assets/twitter.png') } className="logo img responsive"/>
                </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
