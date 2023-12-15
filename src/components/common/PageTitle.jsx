const PageTitle = ({data, content}) => {
  const title = content?content.text:data[0].contents_type_ext_col_01;
  const title_en = content?content.text_en:data[0].contents_type_nm;
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