import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import Test from './components/Test';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path = '/' component = {App} />
            <Route path = '/edit/:id' component = {Edit} />
            <Route path = '/create' component = {Create} />
            <Route path = '/show/:id' component = {Show} />
            <Route path = '/test' component = {Test} />
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
