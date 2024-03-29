const PageTitle = ({ title, subTitle }) => {
  return (
    <div className='c-page-title'>
      <div className='l-container--large'>
        <h1 className='c-page-title__heading'>{title || ''}</h1>
        <p className='c-heading--sub'>{subTitle || ''}</p>
      </div>
    </div>
  );
};

export default PageTitle;
