import Breadcrumb from '@/components/common/Breadcrumb';
import Menu from '@/components/common/Menu';
import PageTitle from '@/components/common/PageTitle';
import LimitedContentBody from '@/components/section/twoColumn/LimitedContentBody';

export async function generateStaticParams() {
  // for supporting local development
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    return [{ id: '18' }, { id: '19' }];
  }

  // Exports nothing in static site generation because of dummy '[id]' given.
  // Like this page for limited contents dynamic rendering with export option (SSG),
  // incoming access to this path goes 404 which is then handled in app/not-found.jsx,
  // and it will dynamically import this page component then render over client-side.
  // Alternatively, you can use rewrites option in kuroco_front.json for dynamic routes.
  // In this case you have to provide id as 'DUMMY' or something here for forcefully generating DUMMY/index.html,
  // and in kuroco_front.json write expected path patterns to forward the html.
  return [{ id: '[id]' }];
}

export default function Page() {
  return (
    <main className='l-container'>
      <Breadcrumb paths={[{ label: '会員限定記事' }]} />
      <PageTitle title='会員限定記事' subTitle='Member Only Article' />
      <div className='l-container--col-2 l-container--contents'>
        <div className='l-container--col-2__main'>
          <LimitedContentBody />
        </div>
        <div className='l-container--col-2__side'>
          <Menu />
        </div>
      </div>
    </main>
  );
}
