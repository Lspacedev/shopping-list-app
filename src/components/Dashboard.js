import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Dashboard">{JSON.stringify(this.props.sharedLists)}</div>
    );
  }
}

export default Dashboard;
