import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';
import { METADATA } from '@/constants/config';

export const metadata = {
  title: METADATA.PRIVACY,
};

export default function Page() {
  return (
    <main className='l-container'>
      <Breadcrumb paths={[{ label: 'プライバシーポリシー' }]} />
      <PageTitle title='プライバシーポリシー' subTitle='PRIVACY POLICY' />
      <div className='l-container--large l-container--contents'>
        <article className='c-privacy'>
          <h2 className='c-heading--lv2 u-mb-30'>個人情報保護方針</h2>
          <p>これはダミーのデータです。</p>
          <p>
            当社は、事業活動を実施する上で、お客様の個人情報がプライバシーを構成する重要な情報であることを深く認識し、業務において個人情報を取り扱う場合には、個人情報に関する法令及び個人情報保護のために定めた社内規定を定め、また、組織体制を整備し、個人情報の適切な保護に努めることにより、お客様を尊重し、当社に対する期待と信頼に応えていきます。
          </p>
          <h3 className='c-heading--lv3'>個人情報の取得、利用、提供</h3>
          <p>
            当社は、事業活動の範囲内で個人情報の利用目的を特定し、その目的達成のために必要な限度で公正かつ適正に個人情報の取得、利用及び提供を行います。また、取得した個人情報の目的外利用をしないよう処置を講じます。
          </p>
          <h3 className='c-heading--lv3'>個人情報の取得、利用、提供</h3>
          <p>
            当社は、事業活動の範囲内で個人情報の利用目的を特定し、その目的達成のために必要な限度で公正かつ適正に個人情報の取得、利用及び提供を行います。また、取得した個人情報の目的外利用をしないよう処置を講じます。
          </p>
          <h3 className='c-heading--lv3'>法令・規範の遵守</h3>
          <p>
            当社は、個人情報に関する法令、国が定める指針、その他の規範及び社会秩序を遵守し、個人情報の適切な保護に努めます。
          </p>
          <h3 className='c-heading--lv3'>個人情報の適切な管理</h3>
          <p>
            当社は、私たちが取り扱う個人情報について、不正アクセス、紛失、破壊、改ざん、漏えいなどの危険を十分に認識し、合理的な安全対策を実施するとともに、問題が発生した場合は適切な是正措置を講じます。
          </p>
          <h3 className='c-heading--lv3'>問い合わせへの対応</h3>
          <p>
            当社は、私たちが取り扱う個人情報について、本人から開示、訂正、利用停止及び苦情相談等のお問い合わせがあった場合は適正に対応します。
          </p>
          <h3 className='c-heading--lv3'>継続的改善</h3>
          <p>
            当社は、個人情報保護に関する管理規定及び管理体制を整備し、全社員で徹底して運用するとともに定期的な見直しを行い、継続的な改善に努めます。
          </p>
          <p className='u-text-align-right'>
            制定日：2020年7月1日&nbsp;&nbsp;
            <br />
            改定日：2023年7月1日
          </p>
        </article>
      </div>
    </main>
  );
}
