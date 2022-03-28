import React, {  useState } from "react";
import { connect } from "react-redux";
import commentsActions from "../redux/action/commentsAction";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function Comments(props) {

  const [inputText, setInputText] = useState()
  const [modify, setModify] = useState()
  const [comments, setComments] = useState([])

  const addComment = async (event)=> {

    const commentData = {
      itinerary: props.itineraryId,
      comment: inputText,
    }
    await props.addComment(commentData)
    .then(response => setComments(response.data.response.newComment), setInputText(""))

  }
  

  
  

  

  return (
    <>
      <div className="comments">

      {comments.userId?._id !== props.user?.id ?
                        <Card sx={{ minWidth: 275 }} key={comments._id}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {comments.userId?.name+ " " +comments.userId?.lastName}
                            </Typography>
                            <Typography variant="body2">
                                {comments.coment}
                            </Typography>
                        </CardContent>
                        </Card>
                        :

                        <Card sx={{ minWidth: 275 }}>
                           {/*  <Typography variant="h5" component="div">
                                {comments.userId.name + " " + comments.userId.lastName}
                            </Typography> */}
                          {/*   <Typography variant="body2">
                            <TextareaAutosize
                                type="text"
                                maxRows={4}
                                aria-label="maximum height"
                                placeholder="comments"
                                defaultValue={comments.coment}
                                onChange={(event) => setModify(event.target.value)}
                                style={{ width: 200 }}
                            />
                            </Typography> */}
                        
                      
                        </Card>
                    }

      </div>
    </>
  );
}


const mapDispatchToProps = {
    addComment: commentsActions.addComment,
    modifiComment: commentsActions.modifiComment,
    deleteComment: commentsActions.deleteComment,

}

export default connect(null, mapDispatchToProps)(Comments);
