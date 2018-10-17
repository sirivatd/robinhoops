import React from "react";

const TweetsIndexItem = ({ tweet }) => {
  return (
    <div className="tweet-content-view">
      <div className="tweet-header">
        <div className="tweet-username">{tweet.tweetUsername}</div>

        <div className="tweet-timestamp">{tweet.time_created}</div>
      </div>
      <hr className="tweet-break-line" />
      <div className="tweet-body-section">
        <p>{tweet.tweetBody}</p>
      </div>
    </div>
  );
};

export default TweetsIndexItem;
