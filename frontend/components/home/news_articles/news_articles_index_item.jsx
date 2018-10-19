import React from "react";

const NewsArticlesIndexItem = ({ article }) => {
  return (
    <div
      onClick={() => (window.location.href = article.url)}
      className="news-article-item-section"
    >
      <img className="news-article-img" src={article.urlToImage} />
      <div className="news-article-description-section">
        <h3 className="news-article-title">{article.title}</h3>
        <p className="news-article-description">{article.description}</p>
      </div>
      <div className="news-article-info-section">
        <h4 className="news-article-publisher">{article.source.name}</h4>
        <h4 className="news-article-timestamp">{article.publishedAt}</h4>
      </div>
    </div>
  );
};

export default NewsArticlesIndexItem;
