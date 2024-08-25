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
      <div className="Dashboard">
        <div className="recipes-number">
          <div>
            <h5>Number of recipes</h5>
            <RiFileList3Line className="icon" />
          </div>

          <p>{this.props.currentUser.recipes.length}</p>
        </div>
        <div className="recipes-categories">
          <div className="items">
            <div>
              <h5>Breakfast</h5>
              <MdOutlineFreeBreakfast className="icon" />
            </div>

            <p>{this.props.breakfast}</p>
          </div>
          <div className="items">
            <div>
              <h5>Lunch</h5>
              <MdOutlineLunchDining className="icon" />
            </div>
            <p>{this.props.lunch}</p>
          </div>
          <div className="items">
            <div>
              <h5>Dinner</h5>
              <MdOutlineDinnerDining className="icon" />
            </div>
            <p>{this.props.dinner}</p>
          </div>
          <div className="items">
            <div>
              <h5>Appetiser</h5>
              <GiBread className="icon" />
            </div>
            <p>{this.props.appetiser}</p>
          </div>
          <div className="items">
            <div>
              <h5>Main</h5>
              <GiBowlOfRice className="icon" />
            </div>
            <p>{this.props.main}</p>
          </div>
          <div className="items">
            <div>
              <h5>Dessert</h5>
              <LuDessert className="icon" />
            </div>
            <p>{this.props.dessert}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
