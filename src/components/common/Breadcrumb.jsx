const Breadcrumb = ({data, content}) => {
  const path = content.text?content.text:content[0].contents_type_ext_col_01;
  return (
    <nav className="l-breadcrumb is-pc">
      <div className="l-container--large">
        <ul>
          <li>
            <a href="/">トップ</a>
          </li>
          <li>{path}</li>
        </ul>
      </div>
    </nav>
  );
};

export default Breadcrumb;