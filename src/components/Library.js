import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
  	super(props);
  	this.state = { 
  	  albums: albumData 
  	};
  }

	render() {
	  return (
	  	<section className="library">
	  	  <div className="container">
	  	  {
	  	  	this.state.albums.map( (album, index) =>
	  	  	  <Link to={`/album/${album.slug}`} key={index}>
	  	  	    <div className="row">
	  	  	      <div className="col-lg">
	  	  	        <div className="album-title">{album.title}</div>
	  	  	          <img className="img-responsive center-block" src={album.albumCover} alt={album.title} />
	  	  	            <div className="album-info">
	  	  	            <div className="album-artist">{album.artist}</div>
	  	  	            <div className="album-length">{album.songs.length} songs</div>
	  	  	          </div>
	  	  	      </div>
	  	  	    </div>
	  	  	 </Link>
	  	  	)
	  	  }
	  	    </div>
	  	</section>
	  );
	}
}

export default Library;
