import React, {useState, useEffect, useRef} from "react";
import Post from "../components/Post";
import axios from "axios";

export default function Posts() {

  const _isMounted = useRef(true);

  const jwt = localStorage.getItem('jwtToken');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(
      process.env.REACT_APP_API_URL + "/posts",
      { headers:
        {
          "Authorization": "Token " + jwt
        }
      }
    )
    .then(res => {
      if (_isMounted.current) {
        (res.data).sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
        setPosts(res.data);
      }
    })
    .catch(err => {});
    return () => {
      _isMounted.current = false;
    }
  });

  return (
    <div>
      {posts.map( (post, idx) =>
        (<Post
            key={idx}
            id={post._id}
            emoji={post.emoji}
            text={post.text}
            date={post.date}
        />)
      )}
    </div>
  );

}
