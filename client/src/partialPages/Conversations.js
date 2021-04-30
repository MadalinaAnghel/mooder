import React, {useState, useEffect} from "react";
import Conversation from "../components/Conversation";
import axios from "axios";

export default function Conversations() {

  const [conversations, setConversations] = useState([]);

  const jwt = localStorage.getItem('jwtToken');

  useEffect(() => {
    let _isMounted = true;

    axios.get(
      "/messages/get-conversations",
      {
        headers:
        {
          "Authorization": "Token " + jwt
        }
      }
    )
    .then(res => {
      if (_isMounted) {
        (res.data).sort((a,b) => (a.last_date < b.last_date) ? 1 : ((b.last_date < a.last_date) ? -1 : 0));
        setConversations(res.data);
      }
    })
    .catch(err => {
      setConversations([]);
    });

    return () => {
      _isMounted = false;
    }
  }, [jwt, conversations]);

  return(
    <div>
      <h3> Conversations </h3>
      <hr />
      <div>
      {conversations.map( (conv, idx) =>
        (
          (<Conversation
              key={idx}
              id={conv.id}
              last_date={conv.last_date}
          />)
        )
      )}
      </div>
    </div>
  );
}
