import React from 'react';

const Landing = () => (

  <div className="container-fluid">
    <div className="text-center">
      <h2 className="landing-title">Turn the music up!</h2>
    </div>
    <div className="row">
      <div className="col-sm-4">
        <div className="panel panel-default">
          <div className="panel-heading"></div>
            <div className="panel-body">
              <h4 className="ad">Choose your music</h4> 
            </div>
          <div className="panel-footer"></div>
        </div> 
      </div> 
      <div className="col-sm-4">
        <div className="panel panel-default">
          <div className="panel-heading"></div>
          <div className="panel-body">
            <h4 className="ad">Unlimited streaming, ad-free</h4>
          </div>
          <div className="panel-footer"></div>
        </div> 
      </div> 
     <div className="col-sm-4">
       <div className="panel panel-default">
         <div className="panel-heading">  </div>
          <div className="panel-body">
            <h4 className="ad">Mobile enabled</h4>
          </div>
          <div className="panel-footer"></div>
        </div> 
      </div> 
    </div>
  </div>

	   
);

export default Landing;
