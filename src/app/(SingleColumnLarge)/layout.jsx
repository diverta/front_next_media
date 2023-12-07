import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from "@/components/common/PageTitle";

export default function SingleLargeLayout({ children }) {
  return (
    <div className="l-container">
      <Breadcrumb />
      <PageTitle />
      <div className="l-container--large l-container--contents">
        {children}
      </div>
    </div>
  )
}