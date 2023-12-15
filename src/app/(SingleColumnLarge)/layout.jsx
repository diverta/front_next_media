import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from "@/components/common/PageTitle";

export default function SingleLargeLayout({ children }) {
  const content = {
    text: "プライバシーポリシー",
    text_en: "privacy"
  };
  return (
    <div className="l-container">
      <Breadcrumb content={content}/>
      <PageTitle content={content}/>
      <div className="l-container--large l-container--contents">
        {children}
      </div>
    </div>
  )
}