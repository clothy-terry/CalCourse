import React, { useState } from "react";
import PanelCard from "./PanelCard/PanelCard";
import "./AcademicPanel.css"

const AcademicPanel = (props:any) => {
  return (
    <div id="panel-container">
      <div className="panel">
        <div className="id-wrapper">
          <div className="id">
            <span>
              <span>{props["course_name"]}</span>
              <div>CS61A</div>
            </span>
          </div>
        </div>
        <div className="panel_card">
          <PanelCard name = 'Website' link = '123'/>
          <PanelCard name = 'Gradescope' link = '456'/>
          <PanelCard name = 'Ed' link = '789'/>
          </div>
        <div className="desc">{props["course_id"]}</div>
      </div>
    </div>
  );
};

export default AcademicPanel;
