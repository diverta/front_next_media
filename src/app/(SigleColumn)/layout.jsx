import {Breadcrumb, PageTitle} from "@/components/common";
import { getLabels } from "@/components/common/fetchData";

export default function SingleLayout({ children }) {
  const contentDirectory = getLabels();
  const content = contentDirectory.login;

  return (
    <div className="l-container">
      <Breadcrumb content={content} />
      <PageTitle content={content} />
      <div className="l-container--small l-container--contents">
        {children}
      </div>
    </div>
  )
}