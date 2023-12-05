import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from "@/components/common/PageTitle";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="l-container">
      <Breadcrumb />
      <PageTitle />
      <div className="l-container--small l-container--contents">
        {children}
      </div>
    </div>
  )
}