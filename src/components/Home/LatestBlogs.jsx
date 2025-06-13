import React from "react";

import Divider from "@mui/material/Divider";
import "../../styles/Home.scss";
import card_img1 from "../../assets/image 1.png";
import card_img2 from "../../assets/blog.png";
import card_img3 from "../../assets/blog1.png";

const feedbackData = [
  {
    id: 1,
    name: "Floyd Miles",
    subTitle: "19 OCT 2024 | BY JOHN DOE |",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: "path/to/avatar1.png",
    rating: 4.5,
    url: card_img1,
  },
  {
    id: 2,
    name: "Ronald Richards",
    subTitle: "19 OCT 2024 | BY JOHN DOE |",
    description:
      "Ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: "path/to/avatar2.png",
    rating: 4,
    url: card_img2,
  },
  {
    id: 3,
    name: "Savannah Nguyen",
    subTitle: "19 OCT 2024 | BY JOHN DOE |",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatar: "path/to/avatar3.png",
    rating: 5,
    url: card_img3,
  },
];

export const LatestBlogs = () => {
  return (
    <section className="news-section">
            <div className="auto-container">
                <div className="sec-title text-center">
                    <h2>Blogs</h2>
                    <div className="text">Check Our Latest Blogs</div>
                </div>

                <div className="row">
                    
                    <div className="news-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
                        <div className="inner-box">
                            <div className="image-box">
                                <figure className="image"><img
                                        src="https://img.freepik.com/premium-photo/luxury-interior-design-modern-house_305343-3390.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_hybrid"
                                        alt=""/></figure>
                                <div className="overlay-box"><a href="#" className="link">Read More <i
                                            className="fa fa-angle-double-right"></i></a></div>
                                <div className="date">19 <span>OCT 2024</span></div>
                            </div>
                            <div className="lower-content">
                                <ul className="info">
                                    <li><a href="#"><i className="fa fa-user-o"></i>JOHN DOE</a></li>
                                </ul>
                                <h2><strong>Floyd Miles</strong></h2>
                                <h2><a href="#">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                                        sint. Velit officia consequat duis enim velit mollit. Exercitation veniam
                                        consequat sunt nostrud amet.</a></h2>
                            </div>
                        </div>
                    </div>

                    
                    <div className="news-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="600ms">
                        <div className="inner-box">
                            <div className="image-box">
                                <figure className="image"><img
                                        src="https://img.freepik.com/free-photo/japanese-culture-house-entrance-with-details_23-2149301086.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_hybrid"
                                        alt=""/></figure>
                                <div className="overlay-box"><a href="#" className="link">Read More <i
                                            className="fa fa-angle-double-right"></i></a></div>
                                <div className="date">19 <span>OCT 2024</span></div>
                            </div>
                            <div className="lower-content">
                                <ul className="info">
                                    <li><a href="#"><i className="fa fa-user-o"></i>JOHN DOE</a></li>
                                </ul>
                                <h2><strong>Floyd Miles</strong></h2>
                                <h2><a href="#">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                                        sint. Velit officia consequat duis enim velit mollit. Exercitation veniam
                                        consequat sunt nostrud amet.</a></h2>
                            </div>
                        </div>
                    </div>

                  
                    <div className="news-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="1200ms">
                        <div className="inner-box">
                            <div className="image-box">
                                <figure className="image"><img
                                        src="https://img.freepik.com/free-photo/trendy-modern-interior-living-room-with-blue-walls-white-windows_181624-18642.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_hybrid"
                                        alt=""/></figure>
                                <div className="overlay-box"><a href="#" className="link">Read More <i
                                            className="fa fa-angle-double-right"></i></a></div>
                                <div className="date">19 <span>OCT 2024</span></div>
                            </div>
                            <div className="lower-content">
                                <ul className="info">
                                    <li><a href="#"><i className="fa fa-user-o"></i>JOHN DOE</a></li>
                                </ul>
                                <h2><strong>Floyd Miles</strong></h2>
                                <h2><a href="#">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                                        sint. Velit officia consequat duis enim velit mollit. Exercitation veniam
                                        consequat sunt nostrud amet.</a></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  );
};
