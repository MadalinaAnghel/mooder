import React, {useState, useRef, useEffect} from "react";
import Image from "react-bootstrap/Image";
import axios from "axios";
import noPhoto from "../images/no-photo-available.png";

export default function Avatar() {

  const jwt = localStorage.getItem('jwtToken');
  const [avatar, setAvatar] = useState(noPhoto);

  const inputFile = useRef(null);

  useEffect(() => {
    axios.get(
      process.env.REACT_APP_API_URL + "/avatar",
      { headers:
        {
          "Authorization": "Token " + jwt
        }
      }
    )
    .then(res => {
      if(res.data) {
        setAvatar(process.env.REACT_APP_IMG_URL + res.data);
      } else {
        setAvatar(noPhoto);
      }
    })
    .catch(err => {
      setAvatar(noPhoto);
    });
  });

  function avatarClicked() {
    inputFile.current.click();
  }

  function uploadImage(event) {
    const imageFormObj = new FormData();

    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", event.target.files[0]);

    if(jwt) {

      axios.post(
        process.env.REACT_APP_API_URL + "/avatar", imageFormObj,
        { headers:
          {
            "Authorization": "Token " + jwt
          }
        }
      )
      .then(res => {
        setAvatar(URL.createObjectURL(event.target.files[0]));
      })
      .catch(err => console.log(err.data));
    }
  }

  return (
    <div>
      <Image className="avatar-img" src={avatar} onClick={avatarClicked} />
      <input type='file' id='file' ref={inputFile} onChange={uploadImage} style={{display: 'none'}}/>
    </div>
  );

}
