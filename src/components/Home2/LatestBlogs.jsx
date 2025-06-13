import React from "react";

export const LatestBlogs = () => {
  return (
    <section className="news-section">
      <div className="auto-container">
        <div className="sec-title text-center">
          <h2>Blogs</h2>
          <div className="text">Check Our Latest Blogs</div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="newsCard">
              <div className="corner"></div>
              <img
                src="https://img.freepik.com/premium-photo/luxury-interior-design-modern-house_305343-3390.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_hybrid"
                className="newsThumb"
              />
              <div className="newsContent">
                <div className="newsMeta">
                  <span>Oct 20, 2024</span>
                  <span>John Doe</span>
                </div>
                <h2 className="newsTitle">Floyd Miles</h2>
                <p className="newsSummary">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </p>
                <p className="readMore">Read More</p>
              </div>
            </div>
          </div>
          <div className="col-md-4"><div className="newsCard">
            <div className="corner"></div>
            <img
              src="https://img.freepik.com/free-photo/japanese-culture-house-entrance-with-details_23-2149301086.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_hybrid"
              className="newsThumb"
            />
            <div className="newsContent">
              <div className="newsMeta">
                <span>Oct 20, 2024</span>
                <span>John Doe</span>
              </div>
              <h2 className="newsTitle">Floyd Miles</h2>
              <p className="newsSummary">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
              <p className="readMore">Read More</p>
            </div>
          </div></div>
          <div className="col-md-4"><div className="newsCard">
            <div className="corner"></div>
            <img
              src="https://img.freepik.com/free-photo/trendy-modern-interior-living-room-with-blue-walls-white-windows_181624-18642.jpg?uid=R187744377&ga=GA1.1.2076956031.1739515128&semt=ais_hybrid"
              className="newsThumb"
            />
            <div className="newsContent">
              <div className="newsMeta">
                <span>Oct 20, 2024</span>
                <span>John Doe</span>
              </div>
              <h2 className="newsTitle">Floyd Miles</h2>
              <p className="newsSummary">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
              <p className="readMore">Read More</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};
