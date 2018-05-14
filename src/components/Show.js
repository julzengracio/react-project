import React, { Component } from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import ImageCard from './ImageCard';

const fileUrl = 'https://mighty-reaches-67795.herokuapp.com/api/file/';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: {},
      images: []
    };
    this.getImageData = this.getImageData.bind(this);
  }

  componentWillMount() {
    this.getImageData();
  }

  componentDidMount() {
    axios.get('/api/articles/'+this.props.match.params.id)
      .then(res => {
        this.setState({ articles: res.data });
        console.log(this.state.articles);
      });
  }

  getImageData() {
    fetch(fileUrl)
      .then(response => {
        if(response.ok) return response.json();
        return [];
      })
      .then(data => {
        this.setState({
          images: data
        });
        console.log(data);
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
    let images;

    if(this.state.images.length > 0 && this.state.articles.title === this.state.articles.title) {
      images = this.state.images
      .filter( (fn) => fn.filename === this.state.articles.filename)
      .map( i => {
        return <ImageCard key={i._id} src={fileUrl+i.filename}/>;
      });
    }

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
              <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Back to Article List</Link></h4>
              <div>{images}</div>
              <dl>
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
