import { MapProvider } from "react-map-gl";
import React from "react";
import "./App.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Home } from "modules/Home";

const App: React.FC<any> = () => (
  <div className="bp3-dark bp4-dark">
    <MapProvider>
      <div className="App">
        <div className="Body dark">
          <Home />
        </div>
      </div>
    </MapProvider>
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
