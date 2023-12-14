import Banner from "../Banner";
import Feature from "../Feature";
import TagArea from "../TagArea";
import TagKeyword from "../TagKeyword";

const TwoColumnSide = () => {
  return (
    <div className="l-container--col-2__side">
      <Banner />
      <Feature />
      <TagArea />
      <TagKeyword />
    </div>
  );
};

export default TwoColumnSide;
