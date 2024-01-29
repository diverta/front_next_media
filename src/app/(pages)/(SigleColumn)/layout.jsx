import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from "@/components/common/PageTitle";

export default function SingleLayout({ children }) {
  const content = {
    text: 'ログイン',
    text_en: 'Login',
  };
  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--small l-container--contents">
        {children}
      </div>
    </div>
  )
}