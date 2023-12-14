import Breadcrumb from "../Breadcrumb";
import PageTitle from "../PageTitle";

const TwoColumnTop = ({ data }) => {
  return (
    <div>
      <Breadcrumb data={data}/>
      <PageTitle data={data} />
    </div>
  );
};

export default TwoColumnTop;
