import React from "react";

class ListCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Listcard">
        <div
          className="img"
          onClick={() =>
            this.props.handleNavigateList(
              this.props.listName,
              this.props.index
            )
          }
        >

          <div className="quantity">
            {this.props.list.quantity}
          </div>
        </div>
      </div>
    );
  }
}

export default ListCard;
