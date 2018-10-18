import NewsArticlesIndex from "./news_articles_index";
import { connect } from "react-redux";

const mSP = (props, ownProps) => {
  return {
    articles: ownProps.articles
  };
};

export default connect(
  mSP,
  null
)(NewsArticlesIndex);
