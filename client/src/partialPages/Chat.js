import React, {useState, useEffect, useRef} from "react";
import UserLine from "../components/UserLine";
import Message from "../components/Message";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import socketIOClient from "socket.io-client";
import axios from "axios";
import querystring from "querystring";

export default function Chat(props) {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const jwt = localStorage.getItem('jwtToken');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  };

  useEffect(() => {
    let _isMounted = true;

    axios.get(
      "/messages/get-messages",
      { params:
        {
          id: props.id
        },
        headers:
        {
          "Authorization": "Token " + jwt
        }
      }
    )
    .then(res => {
      if (_isMounted) {
        setMessages(res.data.messages);
      }
    })
    .catch(err => {
      setMessages([]);
    });

    scrollToBottom();

    return () => {
      _isMounted = false;
    }
  }, [jwt, props.id]);

  useEffect(() => {
    let _isMounted = true;

    const socket = socketIOClient(window.location.origin);
    socket.on("newMessageSended", data => {
      if(data.includes(localStorage.getItem("userId"))) {
        axios.get(
          "/messages/get-messages",
          { params:
            {
              id: props.id
            },
            headers:
            {
              "Authorization": "Token " + jwt
            }
          }
        )
        .then(res => {
          if (_isMounted) {
            setMessages(res.data.messages);
          }
        })
        .catch(err => {
          setMessages([]);
        });
      }
    });

    scrollToBottom();

    return () => {
      _isMounted = false;
    }
  }, [messages, jwt, props.id]);

  function handleChange(event) {
    setMessage(event.target.value);
  }

  function handleSend(event) {

    axios.post(
      "/messages/send-message",
      querystring.stringify({id: props.id, content: message}),
      { headers:
        {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Token " + jwt
        }
      }
    )
    .then(res => {
      setMessage("");
    })
    .catch(err => {
    });

    scrollToBottom();

    event.preventDefault();

  }

  function handleEnter(event) {
    if(event.key === "Enter") {
      handleSend(event);
    }
  }

  return (
    <div>
      <UserLine id={props.id} />
      <hr />
      <div className="messages">
        {messages.map( (msg, idx) =>
          (<Message
              key={idx}
              sender={msg.sender}
              date={msg.date}
              content={msg.content}
          />)
        )}
        <div ref={messagesEndRef} />
      </div>
      <hr />
      <Form className="message-form" >
        <Row>
          <Col>
            <Form.Control
                className="message-textarea"
                as="textarea"
                rows={2}
                spellCheck="false"
                value={message}
                onChange={handleChange}
                onKeyPress={handleEnter}
              />
          </Col>
          <Col xs="auto">
            <Button className="send-btn" onClick={handleSend}>
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
