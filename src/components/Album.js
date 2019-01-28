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
      currentVolume: 0, 
      volume: 0.5,
      duration: album.songs[0].duration,
      isPlaying: false,
      isHovered: false
    }; 

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.currentVolume = 0;
    this.audioElement.volume = 0.5; 
  }

  /* change time format to M:SS and default for non-numeric */
  formatTime(currentTime) {
    if (currentTime == isNaN) {
      return "-:--" /* default for non-numeric value */
    }else{
      let minutes = currentTime/60;
      let seconds = currentTime%60;
      return minutes.toFixed(0)+':'+ seconds.toFixed(0); // remove nums after decimal
    }
  }

  /* display current volume */
  handleVolumeChange (e) {
    const newVolume = this.audioElement.volume * e.target.value;
    this.audioElement.currentVolume = newVolume;
    this.setState({ currentVolume: newVolume }); 
  }

  /* update seek bar on playback */
  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });  
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }
  
  /* terminate playback */
  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
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

  /* change the current time */
  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
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
                 <td id="song-duration-row">{this.formatTime(song.duration)}</td>
                 
              </tr>
              )
            }
  	       </tbody>
  	     </table>
         <PlayerBar 
           isPlaying={this.state.isPlaying} 
           currentSong={this.state.currentSong} 
           currentTime={this.audioElement.currentTime}
           currentVolume={this.audioElement.currentVolume}
           volume={this.audioElement.volume}
           duration={this.audioElement.duration}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick()}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           formatTime={this.formatTime(this.audioElement.currentTime)} 
           handleVolumeChange={(e) => this.handleVolumeChange(e)}
         />
      
  	  </section>
  	);
  }
}

export default Album;