import Breadcrumb from '@/components/common/Breadcrumb'
import PageTitle from '@/components/common/PageTitle'
import { getLabels } from '@/components/common/fetchData'

export default function Contact() {
  const contentDirectory = getLabels()
  const content = contentDirectory.contact

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--small l-container--contents">
        <div className="c-form-group">
          <p className="c-text c-text--pre u-ma-0">
            通常は2営業日以内に返信いたします。
            ※土日祝日等、弊社休業日にいただいたお問い合わせにつきましては、翌営業日以降の回答とさせていただきます。
          </p>
          <p className="c-text--small">
            <span className="c-form-label__required">*</span>は必須項目です。
          </p>
        </div>
      </div>
    </div>
  )
}
