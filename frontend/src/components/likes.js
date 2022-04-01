import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import itinerariesAction from "../redux/action/itinerariesAction";

function Likes(props) {
 
  const reload = props.reload
  const setReload = props.setReload
  

  const likeOrDislike = async () => {
    await props.likeDislike(props.id);

    setReload(!reload)
  }
  
  

  

  return (
    <>
      <div className="likes">
        <span>{props.likes.length}</span>
        {props.user ?
              (<div onClick={likeOrDislike}>{props.likes.includes(props.user.id) ?
                <span style={{ color: "red", fontSize: 30 }} className="material-icons likeDislike corazon">favorite</span> :
                <span style={{ color: "red", fontSize: 30 }} className="material-icons likeDislike corazon">favorite_border</span>}</div>)

              : (<span style={{ fontSize: 30 }} className="material-icons">favorite_border</span>)}

      </div>
    </>
  );
}


const mapDispatchToProps = {
    likeDislike: itinerariesAction.likeDislike,

}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Likes);
