import Image from "next/image";

const FeatureDetailBody = ({ data }) => {
  console.log("FeatureDetailBody")
  console.log(data);
  return (
    <section className="c-feature">
      <h2 className="c-heading--lv2">{data.subject}</h2>
      <div className="c-feature__intro">
        {data.ext_2}
      </div>
      <ul className="c-feature__list">
        <li className="c-feature__item">
          <h3 className="c-heading--lv4">大阪・難波 人気食べ歩きスポット10選！</h3>
          <div className="c-feature__contents">
            <figure className="c-feature__image">
            <Image
                alt="dummy image"
                src={data.ext_1.url}
                width="400"
                height="150"
              />
            </figure>
            <div className="c-feature__detail">
              <div className="c-feature__text">
                大阪の人気エリア難波。昔ながらの名店から今年イチオシのおすすめスポットまで。大阪食い倒れツアーをご紹介します。
              </div>
              <p className="c-feature__link"><a href="#" class="c-button">MORE</a></p>
            </div>
          </div>
        </li>
        <li className="c-feature__item">
          <h3 className="c-heading--lv4">大阪・難波 人気食べ歩きスポット10選！</h3>
          <div className="c-feature__contents">
            <figure className="c-feature__image">
              {/* <img src="https://placehold.jp/400x300.png"> */}
              <Image
                alt="dummy image"
                src={data.ext_1.url}
                width="400"
                height="150"
              />
            </figure>
            <div className="c-feature__detail">
              <div className="c-feature__text">
                大阪の人気エリア難波。昔ながらの名店から今年イチオシのおすすめスポットまで。大阪食い倒れツアーをご紹介します。
              </div>
              <p className="c-feature__link"><a href="#" class="c-button">MORE</a></p>
            </div>
          </div>
        </li>
      </ul>

    </section>
  );
};

export default FeatureDetailBody;
