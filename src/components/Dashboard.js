import React from "react";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { MdOutlineLunchDining } from "react-icons/md";
import { MdOutlineDinnerDining } from "react-icons/md";
import { LuDessert } from "react-icons/lu";
import { GiBowlOfRice } from "react-icons/gi";
import { GiBread } from "react-icons/gi";
import { RiFileList3Line } from "react-icons/ri";

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
