'use client'

import Breadcrumb from '@/components/common/Breadcrumb'
import PageTitle from '@/components/common/PageTitle'
import { getLabels } from '@/components/common/fetchData'
import { useRef, useState } from 'react'
import AlertError from '@/components/ui/AlertError'
import AlertSuccess from '@/components/ui/AlertSuccess'
import Link from 'next/link'
import { inquiry } from '@/components/common/fetchData'

export default function Contact() {
  const contentDirectory = getLabels()
  const content = contentDirectory.contact
  const formData = useRef({})
  const [formErrors, setFormErrors] = useState(false)
  const [conditionCheck, setConditionCheck] = useState(false)
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [submittedText, setSubmittedText] = useState('')

  const handleInputChange = (e) => {
    setFormErrors(false)
    const { name, value } = e.target
    formData.current = {
      ...formData.current,
      [name]: value,
    }
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedChoices((prevChoices) => {
      if (checked) {
        return [...prevChoices, value];
      } else {
        return prevChoices.filter((choice) => choice !== value);
      }
    });
  };

  const handleConditionCheck = (e) => {
    setFormErrors(false)
    setConditionCheck(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    window.scrollTo(0, 0)

    const requiredFields = ['name', 'email', 'body']
    const errors = []

    if(selectedChoices.length != 0) {
      formData.current = {
        ...formData.current,
        ext_06: selectedChoices
      }
    }

    if (!conditionCheck) {
      errors.push({ message: '利用規約に同意してください' })
    }

    requiredFields.forEach((field) => {
      if (!formData.current[field]) {
        errors.push({
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
        })
      }
    })

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const status = await inquiry(formData.current);

    if(status.errors.length > 0) {
      setFormErrors(status.errors)
    } else {
      setSubmittedText(status.messages)
      console.log("Bhai waapas")
      console.log(status.messages)
    }
  }

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--small l-container--contents">
        {submittedText ? <div>
          <AlertSuccess message="Submitted" />
          <p>{submittedText}</p>
        </div> : <div>
        <div className="c-form-group">
          <p className="c-text c-text--pre u-ma-0">
            通常は2営業日以内に返信いたします。
            ※土日祝日等、弊社休業日にいただいたお問い合わせにつきましては、翌営業日以降の回答とさせていただきます。
          </p>
          <p className="c-text--small">
            <span className="c-form-label__required">*</span>は必須項目です。
          </p>
        </div>
        <form className="c-form" onSubmit={handleSubmit}>
        {formErrors && <AlertError errors={formErrors} />}
          <div className="c-form-group">
            <label htmlFor="name" className="c-form-label">
              お名前
            </label>{' '}
            <span className="c-form-label__required">*</span>{' '}
            <input
              name="name"
              id="name"
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="c-form-group">
            <label htmlFor="email" className="c-form-label">
              メールアドレス
            </label>
            <span className="c-form-label__required">*</span>
            <input
              name="email"
              id="email"
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="c-form-group">
            <label htmlFor="ext_05" className="c-form-label">
              性別
            </label>
            <ul>
              <li>
                <input
                  type="radio"
                  name="ext_05"
                  id="ext_05-1"
                  className="c-form-toggle__radio"
                  value="1"
                  onChange={handleInputChange}
                />
                <label htmlFor="ext_05-1">男性</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="ext_05"
                  id="ext_05-2"
                  className="c-form-toggle__radio"
                  value="2"
                  onChange={handleInputChange}
                />
                <label htmlFor="ext_05-2">女性</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="ext_05"
                  id="ext_05-3"
                  className="c-form-toggle__radio"
                  value="3"
                  onChange={handleInputChange}
                />
                <label htmlFor="ext_05-3">その他</label>
              </li>
            </ul>
          </div>
          <div className="c-form-group">
            <label htmlFor="ext_04" className="c-form-label">
              業種
            </label>
            <select name="ext_04" id="ext_04" onChange={handleInputChange}>
              <option label="選択なし" value="">
                選択なし
              </option>
              <option label="金融" value="1">
                金融
              </option>
              <option label="官公庁・自治体" value="2">
                官公庁・自治体
              </option>
              <option label="学校" value="3">
                学校
              </option>
              <option label="IT・ソフトウェア" value="4">
                IT・ソフトウェア
              </option>
              <option label="メディア" value="5">
                メディア
              </option>
              <option label="建設・不動産" value="6">
                建設・不動産
              </option>
              <option label="製造業" value="7">
                製造業
              </option>
              <option label="食品" value="8">
                食品
              </option>
              <option label="人材・HR" value="9">
                人材・HR
              </option>
              <option label="エネルギー・資源" value="10">
                エネルギー・資源
              </option>
              <option label="流通・小売" value="11">
                流通・小売
              </option>
              <option label="スポーツ関連" value="12">
                スポーツ関連
              </option>
            </select>
          </div>
          <div className="c-form-group">
            <label htmlFor="ext_06" className="c-form-label">
              お問い合わせ内容
            </label>
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="ext_06"
                  id="ext_03-1"
                  className="c-form-toggle__checkbox"
                  value="1"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="ext_06-1">資料請求</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="ext_06"
                  id="ext_06-2"
                  className="c-form-toggle__checkbox"
                  value="2"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="ext_06-2">見積もり依頼</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="ext_06"
                  id="ext_06-3"
                  className="c-form-toggle__checkbox"
                  value="3"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="ext_06-3">デモンストレーション依頼</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  name="ext_06"
                  id="ext_06-4"
                  className="c-form-toggle__checkbox"
                  value="4"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="ext_06-4">その他</label>
              </li>
            </ul>
          </div>
          <div className="c-form-group">
            <label htmlFor="ext_04" className="c-form-label">
              デモンストレーション希望日
            </label>{' '}
            <div className="u-display-flex u-display-flex-align-items-center">
              <select
                name="ext_04_y"
                id="ext_04_y"
                onChange={handleCheckboxChange}
              >
                <option label="選択なし" value="">
                  選択なし
                </option>
                <option label="2013" value="2013">
                  2013
                </option>
                <option label="2014" value="2014">
                  2014
                </option>
                <option label="2015" value="2015">
                  2015
                </option>
                <option label="2016" value="2016">
                  2016
                </option>
                <option label="2017" value="2017">
                  2017
                </option>
                <option label="2018" value="2018">
                  2018
                </option>
                <option label="2019" value="2019">
                  2019
                </option>
                <option label="2020" value="2020">
                  2020
                </option>
                <option label="2021" value="2021">
                  2021
                </option>
                <option label="2022" value="2022">
                  2022
                </option>
                <option label="2023" value="2023">
                  2023
                </option>
                <option label="2024" value="2024">
                  2024
                </option>
                <option label="2025" value="2025">
                  2025
                </option>
                <option label="2026" value="2026">
                  2026
                </option>
                <option label="2027" value="2027">
                  2027
                </option>
                <option label="2028" value="2028">
                  2028
                </option>
                <option label="2029" value="2029">
                  2029
                </option>
                <option label="2030" value="2030">
                  2030
                </option>
                <option label="2031" value="2031">
                  2031
                </option>
                <option label="2032" value="2032">
                  2032
                </option>
                <option label="2033" value="2033">
                  2033
                </option>
              </select>
              <label htmlFor="ext_04_y" className="u-pa-10">
                年
              </label>
              <select name="ext_04_m" onChange={handleInputChange}>
                <option label="選択なし" value="">
                  選択なし
                </option>
                <option label="01" value="01">
                  01
                </option>
                <option label="02" value="02">
                  02
                </option>
                <option label="03" value="03">
                  03
                </option>
                <option label="04" value="04">
                  04
                </option>
                <option label="05" value="05">
                  05
                </option>
                <option label="06" value="06">
                  06
                </option>
                <option label="07" value="07">
                  07
                </option>
                <option label="08" value="08">
                  08
                </option>
                <option label="09" value="09">
                  09
                </option>
                <option label="10" value="10">
                  10
                </option>
                <option label="11" value="11">
                  11
                </option>
                <option label="12" value="12">
                  12
                </option>
              </select>
              <label htmlFor="ext_04_m" className="u-pa-10">
                月
              </label>
              <select name="ext_04_d" onChange={handleInputChange}>
                <option label="選択なし" value="">
                  選択なし
                </option>
                <option label="01" value="01">
                  01
                </option>
                <option label="02" value="02">
                  02
                </option>
                <option label="03" value="03">
                  03
                </option>
                <option label="04" value="04">
                  04
                </option>
                <option label="05" value="05">
                  05
                </option>
                <option label="06" value="06">
                  06
                </option>
                <option label="07" value="07">
                  07
                </option>
                <option label="08" value="08">
                  08
                </option>
                <option label="09" value="09">
                  09
                </option>
                <option label="10" value="10">
                  10
                </option>
                <option label="11" value="11">
                  11
                </option>
                <option label="12" value="12">
                  12
                </option>
                <option label="13" value="13">
                  13
                </option>
                <option label="14" value="14">
                  14
                </option>
                <option label="15" value="15">
                  15
                </option>
                <option label="16" value="16">
                  16
                </option>
                <option label="17" value="17">
                  17
                </option>
                <option label="18" value="18">
                  18
                </option>
                <option label="19" value="19">
                  19
                </option>
                <option label="20" value="20">
                  20
                </option>
                <option label="21" value="21">
                  21
                </option>
                <option label="22" value="22">
                  22
                </option>
                <option label="23" value="23">
                  23
                </option>
                <option label="24" value="24">
                  24
                </option>
                <option label="25" value="25">
                  25
                </option>
                <option label="26" value="26">
                  26
                </option>
                <option label="27" value="27">
                  27
                </option>
                <option label="28" value="28">
                  28
                </option>
                <option label="29" value="29">
                  29
                </option>
                <option label="30" value="30">
                  30
                </option>
                <option label="31" value="31">
                  31
                </option>
              </select>
              <label htmlFor="ext_04_d" className="u-pa-10">
                日
              </label>
            </div>
          </div>
          <div className="c-form-group">
            <label htmlFor="ext_05" className="c-form-label u-mr-5">
              添付ファイル
            </label>
            <input
              type="file"
              name="ext_05"
              id="ext_05"
              onChange={handleInputChange}
            />
          </div>
          <div className="c-form-group">
            <label htmlFor="body" className="c-form-label">
              メッセージ
            </label>
            <span className="c-form-label__required">*</span>
            <textarea
              rows="4"
              cols="60"
              name="body"
              id="body"
              placeholder=""
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="c-form-group">
            <label htmlFor="ext_06" className="c-form-label">
              マトリックス(単一選択)
            </label>{' '}
            <table className="u-width-100">
              <thead>
                <tr>
                  <th></th>
                  <th scope="col">とても悪い</th>
                  <th scope="col">悪い</th>
                  <th scope="col">普通</th>
                  <th scope="col">良い</th>
                  <th scope="col">とても良い</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">今日の調子</th>
                  <td className="u-text-align-center">
                    <input
                      type="radio"
                      name="ext_06[1]"
                      value="1"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="radio"
                      name="ext_06[1]"
                      value="2"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="radio"
                      name="ext_06[1]"
                      value="3"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="radio"
                      name="ext_06[1]"
                      value="4"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="radio"
                      name="ext_06[1]"
                      value="5"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">今日の運勢</th>
                  <td className="u-text-align-center">
                    <input
                      type="radio"
                      name="ext_06[2]"
                      value="1"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="radio"
                      name="ext_06[2]"
                      value="2"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="radio"
                      name="ext_06[2]"
                      value="3"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="radio"
                      name="ext_06[2]"
                      value="4"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="radio"
                      name="ext_06[2]"
                      value="5"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="c-form-group">
            <label htmlFor="ext_07" className="c-form-label">
              マトリックス(複数選択)
            </label>{' '}
            <table className="u-width-100">
              <thead>
                <tr>
                  <th></th>
                  <th>赤</th>
                  <th>青</th>
                  <th>緑</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>マル</th>
                  <td className="u-text-align-center">
                    <input
                      type="checkbox"
                      name="ext_07[1]"
                      id="1"
                      className="c-form-toggle__checkbox"
                      value="1"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="checkbox"
                      name="ext_07[1]"
                      id="2"
                      className="c-form-toggle__checkbox"
                      value="2"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="checkbox"
                      name="ext_07[1]"
                      id="3"
                      className="c-form-toggle__checkbox"
                      value="3"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>サンカク</th>
                  <td className="u-text-align-center">
                    <input
                      type="checkbox"
                      name="ext_07[2]"
                      id="1"
                      className="c-form-toggle__checkbox"
                      value="1"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="checkbox"
                      name="ext_07[2]"
                      id="2"
                      className="c-form-toggle__checkbox"
                      value="2"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="checkbox"
                      name="ext_07[2]"
                      id="3"
                      className="c-form-toggle__checkbox"
                      value="3"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>シカク</th>
                  <td className="u-text-align-center">
                    <input
                      type="checkbox"
                      name="ext_07[3]"
                      id="1"
                      className="c-form-toggle__checkbox"
                      value="1"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="checkbox"
                      name="ext_07[3]"
                      id="2"
                      className="c-form-toggle__checkbox"
                      value="2"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="u-text-align-center">
                    <input
                      type="checkbox"
                      name="ext_07[3]"
                      id="3"
                      className="c-form-toggle__checkbox"
                      value="3"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="c-form-group">
            <input
              type="checkbox"
              name="condition_check"
              value=""
              id="privacy"
              onChange={handleConditionCheck}
            />
            <label htmlFor="privacy">
              <Link href="#">利用規約</Link>及び
              <Link href="/privacy">プライバシーポリシー</Link>に同意する
            </label>
          </div>
          <button
            type="submit"
            id="inquiry_item_button_confirm"
            className="c-button--primary u-width-100"
          >
            確認する
          </button>
        </form>
        </div>}
      </div>
    </div>
  )
}
