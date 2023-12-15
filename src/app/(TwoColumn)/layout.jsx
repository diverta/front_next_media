import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from "@/components/common/PageTitle";
import Banner from "@/components/common/Banner";
import Feature from "@/components/section/feature/Feature";
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
    <div>
      {children}
    </div>
  )
}
