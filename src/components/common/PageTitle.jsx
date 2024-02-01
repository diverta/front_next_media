const PageTitle = ({content}) => {
  const title = content.text?content.text:content[0].contents_type_ext_col_01;
  const title_en = content.text?content.text_en:content[0].contents_type_nm;
  return (

    <div className="c-page-title">
      <div className="l-container--large">
        <h1 className="c-page-title__heading">{title}</h1>
        <p className="c-heading--sub">{title_en}</p>
      </div>
    </div>

  );
};

export default PageTitle;