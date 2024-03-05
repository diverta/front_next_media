'use client'

import Breadcrumb from '@/components/common/Breadcrumb'
import PageTitle from '@/components/common/PageTitle'
import { getLabels } from '@/components/common/fetchData'
import { useEffect, useRef, useState, useCallback } from 'react'
import AlertError from '@/components/ui/AlertError'
import AlertSuccess from '@/components/ui/AlertSuccess'
import Link from 'next/link'
import {
  inquiry,
  uploadFile,
  getInquiryColumns,
} from '@/components/common/fetchData'

export default function Contact() {
  const contentDirectory = getLabels()
  const content = contentDirectory.contact
  const formData = useRef({})
  const date = useRef({})
  const matrixSingle = useRef({})
  const matrixMultiple = useRef({})
  const [selectedChoices1, setSelectedChoices1] = useState([])
  const [selectedChoices2, setSelectedChoices2] = useState([])
  const [selectedChoices3, setSelectedChoices3] = useState([])

  const [formErrors, setFormErrors] = useState(false)
  const [conditionCheck, setConditionCheck] = useState(false)
  const [selectedChoices, setSelectedChoices] = useState([])
  const [submittedText, setSubmittedText] = useState('')
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const getColumns = async () => {
      try {
        const cols = await getInquiryColumns()
        console.log(cols.cols)
        setColumns(cols.cols)
      } catch (error) {
        console.error('Error fetching column list :', error)
      }
    }
    getColumns()
  }, [])

  const handleInputChange = (e) => {
    setFormErrors(false)
    const { name, value } = e.target
    formData.current = {
      ...formData.current,
      [name]: value,
    }
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    setSelectedChoices((prevChoices) => {
      if (checked) {
        return [...prevChoices, value]
      } else {
        return prevChoices.filter((choice) => choice !== value)
      }
    })
  }

  const handleConditionCheck = (e) => {
    setFormErrors(false)
    setConditionCheck(e.target.checked)
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target
    date.current = {
      ...date.current,
      [name]: value,
    }
  }

  const handleFileUpload = async (e) => {
    const fileData = new FormData()
    fileData.append('file', e.target.files[0])

    const status = await uploadFile(fileData)

    if(status.errors.length > 0){
      setFormErrors(status.errors)
    } else {
    const file_id = status.file_id
    formData.current = {
      ...formData.current,
      ext_08: { file_id },
    }
  }
  }

  const handleMatrixSingleChange = (e) => {
    const { name, value } = e.target
    matrixSingle.current = {
      ...matrixSingle.current,
      [name]: value,
    }
  }

  const handleMatrixMultipleChange = (e, field) => {
    const { value, checked } = e.target

    let setSelectedChoices
    if (field === '1') {
      setSelectedChoices = setSelectedChoices1
    } else if (field === '2') {
      setSelectedChoices = setSelectedChoices2
    } else if (field === '3') {
      setSelectedChoices = setSelectedChoices3
    }

    if (setSelectedChoices) {
      setSelectedChoices((prevChoices) => {
        let newChoices
        if (checked) {
          newChoices = [...prevChoices, value]
        } else {
          newChoices = prevChoices.filter((choice) => choice !== value)
        }

        matrixMultiple.current = {
          ...matrixMultiple.current,
          [field]: newChoices,
        }
        return newChoices
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    window.scrollTo(0, 0)

    const requiredFields = Object.values(columns).reduce((acc, col) => {
      if (col.required == 2) {
        acc[col.key] = col.title;
      }
      return acc;
    }, {});

    const errors = []

    if (selectedChoices.length != 0) {
      formData.current = {
        ...formData.current,
        ext_06: selectedChoices,
      }
    }

    if (date.current.year && date.current.month && date.current.date) {
      formData.current = {
        ...formData.current,
        ext_02: `${date.current.year}-${date.current.month}-${date.current.date}`,
      }
    }

    if (matrixSingle.current) {
      formData.current = {
        ...formData.current,
        ext_07: matrixSingle.current,
      }
    }

    if (matrixMultiple.current) {
      formData.current = {
        ...formData.current,
        ext_09: matrixMultiple.current,
      }
    }

    if (!conditionCheck) {
      errors.push({ message: '利用規約に同意してください' })
    }

    Object.entries(requiredFields).forEach(([field, title]) => {
      if (!formData.current[field]) {
        errors.push({
          message: `${title.charAt(0).toUpperCase() + title.slice(1)} is required`,
        });
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    console.log(formData.current)
    const status = await inquiry(formData.current)

    if (status.errors.length > 0) {
      setFormErrors(status.errors)
    } else {
      setSubmittedText(status.messages)
    }
  }

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--small l-container--contents">
        {submittedText ? (
          <div>
            <AlertSuccess message="Submitted" />
            <p>{submittedText}</p>
          </div>
        ) : (
          <div>
            <div className="c-form-group">
              <p className="c-text c-text--pre u-ma-0">
                通常は2営業日以内に返信いたします。
                ※土日祝日等、弊社休業日にいただいたお問い合わせにつきましては、翌営業日以降の回答とさせていただきます。
              </p>
              <p className="c-text--small">
                <span className="c-form-label__required">*</span>
                は必須項目です。
              </p>
            </div>
            <form className="c-form" onSubmit={handleSubmit}>
              {formErrors && <AlertError errors={formErrors} />}
              {Object.values(columns).map((col) => (
                <div key={col.key} className="c-form-group">
                  <label className="c-form-label">{col.title}</label>
                  {col.required == 2 && (
                    <span className="c-form-label__required">*</span>
                  )}
                  {col.type === 1 && (
                    <input
                      type="text"
                      name={col.key}
                      id={col.key}
                      onChange={handleInputChange}
                    />
                  )}
                  {col.type === 2 && (
                    <textarea
                      rows="4"
                      cols="60"
                      name={col.key}
                      id={col.key}
                      onChange={handleInputChange}
                    />
                  )}
                  {col.type === 3 && (
                    <ul>
                      {col.options.map((option) => (
                        <li key={option.key}>
                          <input
                            type="radio"
                            name={col.key}
                            id={col.key + option.key}
                            className="c-form-toggle__radio"
                            value={option.key}
                            onChange={handleInputChange}
                          />
                          <label htmlFor={col.key + option.key}>
                            {option.value}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                  {col.type === 4 && (
                    <select
                      name={col.key}
                      id={col.key}
                      onChange={handleInputChange}
                    >
                      <option label="選択なし" value="">
                        選択なし
                      </option>
                      {col.options.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                  )}
                  {col.type === 5 && (
                    <ul>
                      {col.options.map((option) => (
                        <li key={option.key}>
                          <input
                            type="checkbox"
                            name={col.key}
                            id={col.key + option.key}
                            className="c-form-toggle__checkbox"
                            value={option.key}
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor={col.key + option.key}>
                            {option.value}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                  {col.type === 6 && (
                    <div className="u-display-flex u-display-flex-align-items-center">
                      <select name="year" onChange={handleDateChange}>
                        <option label="選択なし" value="">
                          選択なし
                        </option>
                        {Array.from(
                          {
                            length:
                              parseInt(col.options[1].value, 10) -
                              parseInt(col.options[0].value, 10) +
                              1,
                          },
                          (_, i) => parseInt(col.options[0].value, 10) + i,
                        ).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <label htmlFor={col.key + '_year'} className="u-pa-10">
                        年
                      </label>
                      <select name="month" onChange={handleDateChange}>
                        <option label="選択なし" value="">
                          選択なし
                        </option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (number) => (
                            <option
                              key={number}
                              value={number.toString().padStart(2, '0')}
                            >
                              {number.toString().padStart(2, '0')}
                            </option>
                          ),
                        )}
                      </select>
                      <label htmlFor={col.key + '_month'} className="u-pa-10">
                        月
                      </label>
                      <select name="date" onChange={handleDateChange}>
                        <option label="選択なし" value="">
                          選択なし
                        </option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (number) => (
                            <option
                              key={number}
                              value={number.toString().padStart(2, '0')}
                            >
                              {number.toString().padStart(2, '0')}
                            </option>
                          ),
                        )}
                      </select>
                      <label htmlFor={col.key + '_date'} className="u-pa-10">
                        日
                      </label>
                    </div>
                  )}
                  {col.type === 7 && (
                    <input
                      type="file"
                      name={col.key}
                      id={col.key}
                      onChange={handleFileUpload}
                      accept={col.options.map((option) => option.value).join(',') || '*'}
                    />
                  )}
                  {col.type === 10 &&
                    col.attribute.selection_type === 'single' && (
                      <table className="u-width-100">
                        <thead>
                          <tr>
                            <th></th>
                            {Object.entries(col.options[0].value).map(
                              ([key, option]) => (
                                <th key={key} scope="col">
                                  {option}
                                </th>
                              ),
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(col.options[1].value).map(
                            ([row_key, row_option]) => (
                              <tr key={row_key}>
                                <th scope="row">{row_option}</th>
                                {Object.entries(col.options[0].value).map(
                                  ([key, option]) => (
                                    <td
                                      key={key}
                                      className="u-text-align-center"
                                    >
                                      <input
                                        type="radio"
                                        name={row_key}
                                        value={key}
                                        onChange={handleMatrixSingleChange}
                                      />
                                    </td>
                                  ),
                                )}
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    )}
                  {col.type === 10 &&
                    col.attribute.selection_type === 'multiple' && (
                      <table className="u-width-100">
                        <thead>
                          <tr>
                            <th></th>
                            {Object.entries(col.options[0].value).map(
                              ([key, option]) => (
                                <th key={key}>{option}</th>
                              ),
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(col.options[1].value).map(
                            ([row_key, row_option]) => (
                              <tr key={row_key}>
                                <th scope="row">{row_option}</th>
                                {Object.entries(col.options[0].value).map(
                                  ([key, option]) => (
                                    <td
                                      key={key}
                                      className="u-text-align-center"
                                    >
                                      <input
                                        type="checkbox"
                                        name={row_key}
                                        value={key}
                                        onChange={(e) =>
                                          handleMatrixMultipleChange(e, row_key)
                                        }
                                      />
                                    </td>
                                  ),
                                )}
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    )}
                </div>
              ))}
              {/* <div className="c-form-group">
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
              </div> */}
              {/* <div className="c-form-group">
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
              </div> */}
              {/* <div className="c-form-group">
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
              </div> */}
              {/* <div className="c-form-group">
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
              </div> */}
              {/* <div className="c-form-group">
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
              </div> */}
              {/* <div className="c-form-group">
                <label htmlFor="date" className="c-form-label">
                  デモンストレーション希望日
                </label>{' '}
                <div className="u-display-flex u-display-flex-align-items-center">
                  <select name="year" id="year" onChange={handleDateChange}>
                    <option label="選択なし" value="">
                      選択なし
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
                  <label htmlFor="year" className="u-pa-10">
                    年
                  </label>
                  <select name="month" onChange={handleDateChange}>
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
                  <label htmlFor="month" className="u-pa-10">
                    月
                  </label>
                  <select name="date" onChange={handleDateChange}>
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
                  <label htmlFor="date" className="u-pa-10">
                    日
                  </label>
                </div>
              </div> */}
              {/* <div className="c-form-group">
                <label htmlFor="ext_08" className="c-form-label u-mr-5">
                  添付ファイル
                </label>
                <input
                  type="file"
                  name="ext_08"
                  id="ext_08"
                  onChange={handleFileUpload}
                />
              </div> */}
              {/* <div className="c-form-group">
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
              </div> */}
              {/* <div className="c-form-group">
                <label htmlFor="ext_07" className="c-form-label">
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
                          name="1"
                          value="1"
                          onChange={handleMatrixSingleChange}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="radio"
                          name="1"
                          value="2"
                          onChange={handleMatrixSingleChange}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="radio"
                          name="1"
                          value="3"
                          onChange={handleMatrixSingleChange}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="radio"
                          name="1"
                          value="4"
                          onChange={handleMatrixSingleChange}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="radio"
                          name="1"
                          value="5"
                          onChange={handleMatrixSingleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">今日の運勢</th>
                      <td className="u-text-align-center">
                        <input
                          type="radio"
                          name="2"
                          value="1"
                          onChange={handleMatrixSingleChange}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="radio"
                          name="2"
                          value="2"
                          onChange={handleMatrixSingleChange}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="radio"
                          name="2"
                          value="3"
                          onChange={handleMatrixSingleChange}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="radio"
                          name="2"
                          value="4"
                          onChange={handleMatrixSingleChange}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="radio"
                          name="2"
                          value="5"
                          onChange={handleMatrixSingleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
              {/* <div className="c-form-group">
                <label htmlFor="ext_09" className="c-form-label">
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
                          name="1"
                          id="1"
                          className="c-form-toggle__checkbox"
                          value="1"
                          onChange={(e) => handleMatrixMultipleChange(e, '1')}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="checkbox"
                          name="1"
                          id="2"
                          className="c-form-toggle__checkbox"
                          value="2"
                          onChange={(e) => handleMatrixMultipleChange(e, '1')}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="checkbox"
                          name="1"
                          id="3"
                          className="c-form-toggle__checkbox"
                          value="3"
                          onChange={(e) => handleMatrixMultipleChange(e, '1')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>サンカク</th>
                      <td className="u-text-align-center">
                        <input
                          type="checkbox"
                          name="2"
                          id="1"
                          className="c-form-toggle__checkbox"
                          value="1"
                          onChange={(e) => handleMatrixMultipleChange(e, '2')}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="checkbox"
                          name="2"
                          id="2"
                          className="c-form-toggle__checkbox"
                          value="2"
                          onChange={(e) => handleMatrixMultipleChange(e, '2')}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="checkbox"
                          name="2"
                          id="3"
                          className="c-form-toggle__checkbox"
                          value="3"
                          onChange={(e) => handleMatrixMultipleChange(e, '2')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>シカク</th>
                      <td className="u-text-align-center">
                        <input
                          type="checkbox"
                          name="3"
                          id="1"
                          className="c-form-toggle__checkbox"
                          value="1"
                          onChange={(e) => handleMatrixMultipleChange(e, '3')}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="checkbox"
                          name="3"
                          id="2"
                          className="c-form-toggle__checkbox"
                          value="2"
                          onChange={(e) => handleMatrixMultipleChange(e, '3')}
                        />
                      </td>
                      <td className="u-text-align-center">
                        <input
                          type="checkbox"
                          name="3"
                          id="3"
                          className="c-form-toggle__checkbox"
                          value="3"
                          onChange={(e) => handleMatrixMultipleChange(e, '3')}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
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
          </div>
        )}
      </div>
    </div>
  )
}
