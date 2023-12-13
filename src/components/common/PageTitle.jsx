const PageTitle = ({data}) => {
  // console.log(data[0]);
  console.log(data[0].contents_type_ext_col_01);
  console.log(data[0].contents_type_nm);
  return (

    <div className="c-page-title">
      <div className="l-container--large">
        <h1 className="c-page-title__heading">{data[0].contents_type_ext_col_01}</h1>
        <p className="c-heading--sub">{data[0].contents_type_nm}</p>
      </div>
    </div>

  );
};

export default PageTitle;