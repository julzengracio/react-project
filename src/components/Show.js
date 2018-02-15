import React, { Component } from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: {}
    };
  }

  componentDidMount() {
    axios.get('/api/articles/'+this.props.match.params.id)
      .then(res => {
        this.setState({ articles: res.data });
        console.log(this.state.articles);
      });
  }

  delete(id){
    console.log(id);
    axios.get('/api/delete/'+id)
      .then((result) => {
        this.props.history.push("/")
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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Write an Article</Link></li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title article-title">
                {this.state.articles.title}
              </h3>
            </div>
            <div class="panel-body">
            {this.state.articles.img}
              <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Back to Article List</Link></h4>
              <dl>
                <dt>Content</dt>
                <dd>{this.state.articles.content}</dd>
              </dl>
              <Link to={`/edit/${this.state.articles._id}`} class="btn btn-success">Edit</Link>&nbsp;
              <button onClick={this.delete.bind(this, this.state.articles._id)} class="btn btn-danger">Delete</button>
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
            <div className="row details">
                <div className="col-md-12">Julz Engracio - N00145647
                  <p>email@email.com</p>
                  <img src={ require('../assets/facebook.png') } className="logo img responsive"/>
                  <img src={ require('../assets/twitter.png') } className="logo img responsive"/>
                </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Show;