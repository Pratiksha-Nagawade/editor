import React, { useState, useEffect } from "react";
import axios from "axios";
import LinkedInIcon from "../assets/linkedinIcon.svg";
import TwitterIcon from "../assets/twitterIcon.svg";
import "../styles/BlogPage.css";
const BlogPage = () => {
  const userToken = localStorage.getItem("id");
  const [blogdata, setBlogData] = useState([]);
  const API_URL = `http://localhost:3001/blog/preview/${userToken}`;

  const fetchData = () => {
    axios
      .get(API_URL)
      .then((response) => {
        setBlogData(response.data);
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="main-blog-page ">
        <div className="main-heading">{blogdata.heading}</div>
        <div className="sub-heading">
          <div>{blogdata.subHeading}</div>
        </div>
        <div
          className="ck-content ckEditor"
          dangerouslySetInnerHTML={{ __html: blogdata.content }}
        />
        <div className="blog-page-icon-display">
          <a href={blogdata.twitter}>
            <button className="social-media-icon icon-backgroud-style">
              <img
                height="22"
                width="22"
                src={TwitterIcon}
                alt={"twitter Icon"}
              />
            </button>
          </a>

          <a href={blogdata.linkedIn}>
            <button className="social-media-icon icon-backgroud-style">
              <img
                height="22"
                width="22"
                src={LinkedInIcon}
                alt={"linkedin Icon"}
              />
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
