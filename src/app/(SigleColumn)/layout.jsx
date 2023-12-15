import {Breadcrumb, PageTitle} from "@/components/common";

export default function SingleLayout({ children }) {
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