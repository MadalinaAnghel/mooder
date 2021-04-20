import React, {useState, useEffect} from "react";
import Post from "../components/Post";
import axios from "axios";

export default function Posts(props) {

  const jwt = localStorage.getItem('jwtToken');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let _isMounted = true;
    axios.get(
      "/posts",
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
        (res.data).sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
        setPosts(res.data);
      }
    })
    .catch(err => {});
    return () => {
      _isMounted = false;
    }
  }, [posts, props.id, jwt]);

  return (
    <div>
      {posts.map( (post, idx) =>
        (<Post
            key={idx}
            id={post._id}
            emojiId={post.emojiId}
            emojiSkin={post.emojiSkin}
            text={post.text}
            date={post.date}
            showDelete={props.id ? false : true }
        />)
      )}
    </div>
  );

}
