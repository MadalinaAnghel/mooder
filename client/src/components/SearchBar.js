import React, {useState, useEffect, useRef} from "react";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import UserLine from "./UserLine";

export default function SearchBar() {

  const _isMounted = useRef(true);

  const jwt = localStorage.getItem('jwtToken');

  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    axios.get(
      "/users-list",
      { headers:
        {
          "Authorization": "Token " + jwt
        }
      }
    )
    .then(res => {
      if(_isMounted.current) {
        setUsers(res.data.filter(user => user._id !== localStorage.getItem("userId")));
      }
    })
    .catch(err => {});

    return () => {
      _isMounted.current = false;
    }
  }, [users, jwt]);

  function handleChangeText(event) {
    setSearchText(event.target.value);

    if(event.target.value === "") {
      setFoundUsers([]);
    } else {
      setFoundUsers(users.filter(user => {return user.name.toLowerCase().includes(event.target.value.toLowerCase())}).slice(0, 10));
    }
  }

  return (
    <div className="search-bar">
      <Row>
        <Col xs="auto" className="search-icon">
            <i className="fas fa-search"></i>
        </Col>
        <Col className="search-col">
          <FormControl
            className="search-textarea"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleChangeText}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="auto" className="search-icon" style={{visibility: "hidden"}}>
          <i className="fas fa-search"></i>
        </Col>
        <Col className="search-results-col" style={{display: (foundUsers.length === 0) ? "none" : "block"}} >
          <div className="results" >
            {foundUsers.map( (user, idx) =>
              (<UserLine
                  key={idx}
                  id={user._id}
              />)
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
