import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import LinkedInIcon from "../assets/linkedinIcon.svg";
import TwitterIcon from "../assets/twitterIcon.svg";
import "../styles/EditorBlog.css";

const EditorBlog = () => {
  const API_URL = "http://localhost:3001/blog/image";
  const [heading, setHeading] = useState("");
  const [subHeading, setSubheading] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const [editor, setEditor] = useState(null);
  const [linkedIn, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [twitterButton, setTwitterButton] = useState(false);
  const [linkedinButton, setLinkedinButton] = useState(false);
  const navigate = useNavigate();

  const areAllFieldsFilled =
    heading !== "" && subHeading !== "" && content !== "";

  const editorConfiguration = {
    placeholder: "Start typing...",
    extraPlugins: [uploadPlugin],
  };

  const handleChange = (event, editor) => {
    let userdata = editor.getData();
    setContent(userdata);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let blogCreateObj = {
      heading: heading,
      subHeading: subHeading,
      content: content,
      twitter: twitter,
      linkedIn: linkedIn,
    };
    if (image && image.length > 0) {
      blogCreateObj.blogImage = image;
    }
    axios
      .post("http://localhost:3001/blog/create", blogCreateObj)
      .then((response) => {
        localStorage.setItem("id", response.data._id);
        setHeading("");
        setSubheading("");
        setContent("");
        setLinkedIn("");
        setTwitter("");
        editor.setData("");
        navigate("/myblog");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function uploadImage(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("blogImage", file);
            fetch(API_URL, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${res.blogImage}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadImage(loader);
    };
  }

  return (
    <>
      <div className="main-page">
        <div className="submit-blog">
          <button disabled={!areAllFieldsFilled} onClick={handleSubmit}>
            Publish
          </button>
        </div>
        <hr />
        <div className="allfield">*Required field</div>
        <div className="editor-heading-container">
          <input
            className="editor-heading-input"
            type="text"
            placeholder="Enter heading"
            value={heading}
            onChange={(event) => {
              setHeading(event.target.value);
            }}
          />
          <input
            className="editor-subheading-input"
            type="text"
            placeholder="Enter subheading"
            value={subHeading}
            onChange={(event) => {
              setSubheading(event.target.value);
            }}
          />
        </div>
        <div className="document-editor">
          <div className="document-editor__toolbar"></div>
          <div className="document-editor__editable-container">
            <div className="document-editor__editable">
              <CKEditor
                onReady={(editor) => {
                  setEditor(editor);
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                    );
                }}
                onError={(error, { willEditorRestart }) => {
                  if (willEditorRestart) {
                    this.editor.ui.view.toolbar.element.remove();
                  }
                }}
                onChange={(event, editor) => {
                  handleChange(event, editor);
                }}
                editor={DecoupledEditor}
                config={editorConfiguration}
              />
            </div>
            <div className="allfield">Optional field</div>
            <div className="social-media-container">
              <div>
                {twitterButton ? (
                  <input
                    className="social-media-input"
                    placeholder="Enter Twitter Link..."
                    onChange={(event) => {
                      setTwitter(event.target.value);
                    }}
                    value={twitter}
                  />
                ) : (
                  <button
                    className="social-media-icon"
                    onClick={setTwitterButton(true)}>
                    <img
                      height="22"
                      width="22"
                      src={TwitterIcon}
                      alt={"twitter icon"}
                    />
                  </button>
                )}
              </div>
              <div>
                {linkedinButton ? (
                  <input
                    className="social-media-input"
                    placeholder="Enter LinkedIn Link..."
                    onChange={(event) => {
                      setLinkedIn(event.target.value);
                    }}
                    value={linkedIn}
                  />
                ) : (
                  <button
                    className="social-media-icon"
                    onClick={setLinkedinButton(true)}>
                    <img
                      height="22"
                      width="22"
                      src={LinkedInIcon}
                      alt={"linkedin Icon"}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorBlog;
