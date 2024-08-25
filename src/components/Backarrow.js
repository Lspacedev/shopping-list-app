import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

class Backarrow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="back" onClick={this.props.handleBackNavigate}>
        <FaArrowLeft />
      </div>
    );
  }
}

export default Backarrow;
