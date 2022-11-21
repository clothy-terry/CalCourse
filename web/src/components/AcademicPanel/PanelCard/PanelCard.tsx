import React, { useState } from "react";
import "./PanelCard.css"

import { Button, DatePicker, Space, version } from "antd";
import 'antd/dist/reset.css';

const PanelCard = (props: { name: String; link: String }) => {
  return (
    <div id="card-container">
      <Space>
        <div className="card1">
        <div className="part">
          {/* <Button type="text" block>
            Website
          </Button> */}
            <div>{props.name}</div>
        </div>
      </div>
      </Space>
    </div>
  );
};

// const PanelCard = (props:any) => {
//   return (
//     <div id="card-container">
//       <Space>
//         <div className="card1">
//         <div className="part">
//           {/* <Button type="text" block>
//             Website
//           </Button> */}
//             <div>Website</div>
//         </div>
//       </div>
//       </Space>
//     </div>
//   );
// };
export default PanelCard;