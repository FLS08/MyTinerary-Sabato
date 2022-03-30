import React, { useEffect, useState } from "react";
import Activities from "./activities"
import Likes from "./likes";
import {Accordion} from 'react-bootstrap'
import swal from 'sweetalert';


/* IMPORTS FROM REDUX */
import { connect } from "react-redux";
import commentsActions from "../redux/action/commentsAction"


function ItineraryDetails(props) {

  const itinerarios= props.data

  const [itineraries, setItineraries] = useState()
  const [inputText, setInputText] = useState()
  const [modifi, setModifi] = useState()


  const reload = props.reload
  const setReload = props.setReload

  async function loadComment(event) {

    const commentData = {
      itineraryId: props.data._id,
      comment: inputText,
    }
  
    await props.addComment(commentData)
      .then(response => setItineraries(response.data.response.nuevoComment),setInputText(""))
    document.querySelector('#newComment').textContent = ""
    
    setReload(!reload)
  }

  async function modifiComment(event) {
    const commentData = {
      commentID: event.target.id,
      comment: modifi,
    }
    await props.modifiComment(commentData)
    setReload(!reload)

  }
  function deleteComment(event) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your comment has been deleted!", {
          icon: "success",
        });
        props.deleteComment(event.target.id).then( res =>{
          if(res.data.success) {
            setItineraries(res.data.response.deleteComment.coments)
            setReload(!reload)
          }
        }
        )
      } else {
        swal("Ok, your comment is safe!");
      }
    });
  }

    

  return (
    <div className="itinerariesArea">
      
      <div className="itinerariesSuperior">
        <h4>{props.data.userName}</h4>
        <p>Duration : {props.data.duration}</p>
        <p>{'💵'.repeat(props.data.price)}</p>
        <img
          src={process.env.PUBLIC_URL + `/images/${props.data.imgUser}`}
          className="imgUser"
          alt="imgUser"
          />
      </div>

      <Likes likes={props.data.likes} id={props.data._id} reload={reload} setReload={setReload} />
      
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="accordionHeader">
            <h6>{props.data.itineraryName}</h6>
          </Accordion.Header>
          <Accordion.Body>
            
            <Activities itineraryId={props.data._id}  />               
          
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header className="accordionHeader">
            <h6>Comments</h6>
          </Accordion.Header>
          <Accordion.Body>
            
          
          <div>
         
          {(itinerarios.coments).map(comment =>
                  <>
                    {comment?.userId._id !== props?.user?.id ?
                      <div className="card cardComments " key={comment._id}>
                        <div className="card-header cardHeader">
                          {comment.userId?.name}
                          <img src={comment.userId.urlImage} className="profilePhoto" alt="userPhoto" />

                        </div>
                        <div className="card-body">
                          <p className="card-text cardText">{comment.coment}</p>
                        </div>
                      </div> :

                      <div className="card cardComments">
                        <div className="card-header cardHeader">
                          <p>{comment.userId.name}</p> 
                          <img src={comment.userId.urlImage} className="profilePhoto" alt="userPhoto" />
                        </div>
                        <div className="card-body ">
                        
                          <div type="text" className="card-text textComments" onInput={(event) => setModifi(event.currentTarget.textContent)} contentEditable >{comment.coment}</div>
                          <button id={comment._id} onClick={deleteComment} className="btn btn-primary btnComments">Delete</button>
                          <button id={comment._id} onClick={modifiComment} className="btn btn-primary btnComments">Edit</button>
                        </div>
                      </div>
                    }
                  </>
                )}
                {props.user ?
                  <div className="card cardComments">
                    <div className="card-header cardHeaderNew">
                      Leave us your comment
                    </div>
                    <div className="card-body ">
                      <div id="newComment" placeholder='Text your comment here...' onInput={(event) => setInputText(event.currentTarget.textContent)} contentEditable className="card-text textComments" ></div>
                      <button onClick={loadComment} className="btn btn-primary btnComments">Comment</button>
                    </div>
                  </div> :
                  <h6>Please Signin to leave a comment</h6>
                }
                               
                </div>  
          
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </div>
  );
}

const mapDispatchToProps = {
  addComment: commentsActions.addComment,
  modifiComment: commentsActions.modifiComment,
  deleteComment: commentsActions.deleteComment,
  

}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user

  }

}

export default connect(mapStateToProps,mapDispatchToProps)(ItineraryDetails)
