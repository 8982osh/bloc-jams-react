import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find ( album => {
    	return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      isHovered: false
    }; 

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;  
  }
  /* update seek bar on playback */
  componentDidMount() {
    this.audioElement.addEventListener('timeupdate', (e) => {
      this.setState({ currentTime: this.audioElement.currentTime });
    });
    this.audioElement.addEventListener('durationchange', (e) => {
      this.setState({ duration: this.audioElement.duraction });
    });
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true }); 
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  onHover(song) {
    this.setState({isHovered: song});
  }

  offHover(song){
    this.setState({isHovered: false});
  }

  /* find previous song */
  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  /* find next song */
  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const nextIndex = Math.max(0, currentIndex + 1);
    const nextSong = this.state.album.songs[nextIndex];
    this.setSong(nextSong);
    this.play();
  }

  /* change icons for hover on and off */
  songIcon(song,index){
    /* display pause if play displayed */
    if(song == this.state.isHovered){
      if(song == this.state.currentSong && this.state.isPlaying){
        return (<span className="ion-md-pause"></span>);
      } else {
        return (<span className="ion-md-play"></span>);
      } 
    } else {
      if(song == this.state.currentSong && this.state.isPlaying){
        return (<span className="ion-md-pause"></span>);
      } else {
        return (index+1) 
      }
    }
  }
   
 

  render() {
  	return (
  	  <section className="albums">
  	    <section id="album-info">
  	      <img id="album-cover-art" src={this.state.album} alt={this.state.album}/>
  	      <div className="album-details">
  	        <h1 id="album-title">{this.state.album.title}</h1>
  	        <h2 className="artist">{this.state.album.artist}</h2>
  	        <div id="release-info">{this.state.album.releaseInfo}</div>
  	      </div>
  	     </section>
  	     <table id="song-list">
  	       <colgroup>
  	         <col id="song-number-column" />
  	         <col id="song-title-column" />
  	         <col id="song-duration-column" />
  	       </colgroup>
  	       <tbody>
  	        {
  	         this.state.album.songs.map( (song, index) =>
	  	  	     <tr className="song" key={index} onClick={() => this.handleSongClick(song)} 
  	             
                 onMouseEnter={() => this.onHover(song)} 
                 onMouseLeave={() => this.offHover(song)} 
               >
                 <td id="song-num-row">{this.songIcon(song,index)}</td>
                 <td id="song-title-row">{song.title}</td>
                 <td id="song-duration-row">{song.duration}</td>
                 
              </tr>
              )
            }
  	       </tbody>
  	     </table>
         <PlayerBar 
           isPlaying={this.state.isPlaying} 
           currentSong={this.state.currentSong} 
           currentTime={this.audioElement.currentTime}
           duration={this.audioElement.duration}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick()}
         />
  	  </section>
  	);
  }
}

export default Album;