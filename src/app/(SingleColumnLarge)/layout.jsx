import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from "@/components/common/PageTitle";

export default function SingleLargeLayout({ children }) {
  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: "プライバシーポリシー" }]} />
      <PageTitle
        title="プライバシーポリシー"
        subTitle="PRIVACY POLICY"
      />
      <div className="l-container--large l-container--contents">
        {children}
      </div>
    </div>
  )
}