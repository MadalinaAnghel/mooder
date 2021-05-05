import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "emoji-mart/css/emoji-mart.css";
import { Emoji } from "emoji-mart";
import DateFormat from "dateformat";
import Fab from "@material-ui/core/Fab";
import axios from "axios";
import querystring from "querystring";

export default function Post(props) {

  const jwt = localStorage.getItem('jwtToken');

  const [show, setShow] = useState(false);

  function handleDelete() {

    if(jwt) {
      axios.post(
        "/users/delete-post",
        querystring.stringify({id: props.id}),
        { headers:
          {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Token " + jwt
          }
        }
      )
      .then(res => {
      })
      .catch(err => console.log(err.data));
    }

  }

  return (
      <div className="post"
           onMouseEnter={e => {setShow(true)}}
           onMouseLeave={e => {setShow(false)}} >
        <Row>
          <Col xs="auto" className="post-emoji">
            <Emoji  set="google" emoji={props.emojiId} skin={props.emojiSkin || 1} size={50} />
          </Col>
          <Col>
            <Row className="post-date">
              <p>{DateFormat(props.date, "d mmm yyyy, H:MM")}</p>
            </Row>
            <Row className="post-text">
              <p>{props.text}</p>
            </Row>
          </Col>
        </Row>
        <Fab style={{display: (show && props.showDelete) ? "block" : "none"}} onClick={handleDelete}>
          <i className="far fa-trash-alt"></i>
        </Fab>

      </div>
  );
}
