import { getContentList } from "@/components/common/fetchData";

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
