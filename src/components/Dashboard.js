import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Dashboard">
        <div className="lists-count">
          <h4>Number of shopping lists</h4>
          <div>{this.props.count}</div>
        </div>
        <div className="shared-lists">
          <h4>Lists from other users</h4>

          {this.props.sharedLists && this.props.sharedLists.length > 0 
          ? this.props.sharedLists.map((list, i)=>(
            <div key={i}>{list.listName}</div>
            ))
          :<div>No shared lists</div>}
        </div>
      </div>
    );
  }
}

export default Dashboard;
