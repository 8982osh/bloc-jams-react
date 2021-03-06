import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

class App extends Component {
   render() {
     return (
       <div className="App">
         <header>
           <Navigation />

           <div class="jumbotron">
             <div className="container">   
               <h1 className="bloc-jams">BLOC JAMS</h1>
             </div>
           </div>  
         </header>
           
         <main>
           <Route exact path="/" component={Landing} />
           <Route path="/library" component={Library} />
           <Route path="/album/:slug" component={Album} />
         </main>
         <Footer />
       </div>
     );
   }
 }

 export default App;