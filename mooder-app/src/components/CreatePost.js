import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fab from "@material-ui/core/Fab";
import axios from "axios";
import querystring from "querystring";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { Emoji } from "emoji-mart";

export default function CreatePost() {

  const jwt = localStorage.getItem('jwtToken');

  const [text, setText] = useState("");
  const [emojiId, setEmojiId] = useState("");
  const [emojiSelected, setEmojiSelected] = useState(false);

  function handleChangeText(event) {
    setText(event.target.value);
  }

  function handleSelectEmoji(emoji) {
    setEmojiId(emoji.id);
    setEmojiSelected(true);
  }


  function handleSubmit(event) {

    if(jwt) {
      axios.post(
        process.env.REACT_APP_API_URL + "/post",
        querystring.stringify({emoji: emojiId, text:text}),
        { headers:
          {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Token " + jwt
          }
        }
      )
      .then(res => {
        setEmojiId("");
        setEmojiSelected(false);
        setText("");
      })
      .catch(err => console.log(err.data));
    }
  }

  return (
    <Form className="post-form">

      <Container fluid >
        <Row>
          <Col xs="auto">
            <Dropdown className="dropdown-emoji">
              <Dropdown.Toggle variant="outline-light" >
                <i className="fas fa-plus" style={{display: emojiSelected ? "none" : "block"}} ></i>
                <Emoji set="google" emoji={emojiId} size={50} style={{display: emojiSelected ? "block" : "none"}} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Picker set="google" onSelect={handleSelectEmoji} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Form.Control
              className="post-textarea"
              as="textarea"
              rows={4}
              maxLength="250"
              spellCheck="false"
              placeholder="How are you feeling?"
              value={text}
              onChange={handleChangeText}
              />
          </Col>
          <Fab onClick={handleSubmit}>
            Post
          </Fab>
        </Row>
      </Container>
    </Form>
  );

}
