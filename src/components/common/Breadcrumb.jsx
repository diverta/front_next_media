const Breadcrumb = ({data}) => {
  return (
    <nav className="l-breadcrumb is-pc">
      <div className="l-container--large">
        <ul>
          <li>
            <a href="/">トップ</a>
          </li>
          <li>{data[0].contents_type_ext_col_01}</li>
        </ul>
      </div>
    </nav>
  );
};

export default Breadcrumb;