import React from "react";
import NewsArticlesIndexItem from "./news_articles_index_item";

class NewsArticlesIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="news-articles-section-container">
        <h3 className="recent-news-header">Recent News</h3>

        {this.props.articles.map(article => {
          return (
            <NewsArticlesIndexItem key={article.title} article={article} />
          );
        })}
      </div>
    );
  }
}

export default NewsArticlesIndex;
