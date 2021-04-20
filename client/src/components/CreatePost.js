import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
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
  const [emojiSkin, setEmojiSkin] = useState(1);
  const [emojiSelected, setEmojiSelected] = useState(false);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);

  function handleChangeText(event) {
    setText(event.target.value);
  }

  function handleSelectEmoji(emoji) {
    setEmojiId(emoji.id);
    setEmojiSkin(emoji.skin);
    setEmojiSelected(true);
    setShowEmojiMenu(false);
  }

  function handleSubmit(event) {

    if(jwt) {
      axios.post(
        "/post",
        querystring.stringify({emojiId: emojiId, emojiSkin: emojiSkin, text:text}),
        { headers:
          {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Token " + jwt
          }
        }
      )
      .then(res => {
        setEmojiId("");
        setEmojiSkin(0);
        setEmojiSelected(false);
        setText("");
      })
      .catch(err => console.log(err.data));
    }
  }

  function handleDropdown() {
    setShowEmojiMenu(!showEmojiMenu);
  }

  return (
    <Form className="post-form">

      <Container fluid >
        <Row>
          <Col xs="auto">
            <Button className="dropdown-emoji" onClick={handleDropdown}>
              <i className="fas fa-plus" style={{display: emojiSelected ? "none" : "block"}} ></i>
              <Emoji set="google" emoji={emojiId} skin={emojiSkin || 1} size={50} style={{display: emojiSelected ? "block" : "none"}} />
            </Button>
            <div className="emoji-menu" style={{display: showEmojiMenu ? "block" : "none"}} >
              <Picker set="google" onSelect={handleSelectEmoji}/>
            </div>
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
