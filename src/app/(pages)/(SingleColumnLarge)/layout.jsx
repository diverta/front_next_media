import Breadcrumb from "@/components/common/Breadcrumb"
import PageTitle from "@/components/common/PageTitle"

export default function SingleLargeLayout({ children }) {
  const content = {
    text: "プライバシーポリシー",
    text_en: "PRIVACY POLICY",
  }
  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--large l-container--contents">{children}</div>
    </div>
  )
}
