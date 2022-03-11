import * as React from "react";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/*IMPORTS FROM REDUX  */
import itinerariesAction from "../redux/action/itinerariesAction";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ItineraryDetails(props) {
  /* FETCH ZONE BY ID */

  let { id } = useParams();
  const dataItineraries = useSelector(
    (store) => store.itinerariesReducer.itinerary
  );

  useEffect(() => {
    props.fetchOneItinerary(id);
  }, []);

  /* ITINERARY CARD ZONE */
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  

  return(
     <> 
    { dataItineraries.length > 0 ? dataItineraries.map(itinerary =>
        <div key={itinerary._id}>
        <Card  sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar>
              <CardMedia
                component="img"
                height="40"
                image={
                  process.env.PUBLIC_URL + `/images/${itinerary.imgUser}`
                }
                alt={itinerary.userName}
              />
            </Avatar>
          }
          title={itinerary.itineraryName}
          subheader={itinerary.userName}
        />
        <CardMedia
          className="imgUser"
          component="img"
          height="194"
          image={process.env.PUBLIC_URL + `/images/${itinerary.imgUser}`}
          alt={itinerary.userName}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {itinerary.price} {itinerary.duration}{" "}
            {itinerary.Hashtags}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon /> {itinerary.likes}
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography tittle>THIS</Typography>
            <Typography tittle>SECTION</Typography>
            <Typography tittle>IS UNDER</Typography>
            <Typography>CONSTRUCTION, WE SORRY... :(</Typography>
          </CardContent>
        </Collapse>
      </Card>
      </div>
    ): <h1 className="notFound">Sorry, We don't have any itineraries yet. Try another City..</h1>}
    </>
  )


  
}

const mapDispatchToProps = {
  fetchOneItinerary: itinerariesAction.fetchOneItinerary,
};

export default connect(null, mapDispatchToProps)(ItineraryDetails);
