import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from "@/components/common/PageTitle";
import Banner from "@/components/common/Banner";
import Feature from "@/components/common/Feature";
import TagArea from "@/components/common/TagArea";
import TagKeyword from "@/components/common/TagKeyword";
import { getContentList } from "@/components/common/fetchData";
import { getCategoryList } from "@/components/common/fetchData";
import { use } from "react";

export default async function TwoColumnLayout({ children }) {
  const segment = children.props.childProp.segment.toUpperCase();
  // console.log(segment);
  const data = await getContentList(segment);
  console.log(children);
  return (
    <div className="l-container">
      <Breadcrumb />
      <PageTitle data={data}/>
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">
          {children}
        </div>
        <div className="l-container--col-2__side">
          <Banner />
          <Feature />
          <TagArea />
          <TagKeyword />
        </div>
      </div>
    </div>
  )
}
