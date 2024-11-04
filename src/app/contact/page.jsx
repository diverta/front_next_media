'use client';

import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';
import { useEffect, useRef, useState } from 'react';
import AlertError from '@/components/ui/AlertError';
import AlertSuccess from '@/components/ui/AlertSuccess';
import Link from 'next/link';
import postUpload from '@/fetch/postUpload';
import postInquiry from '@/fetch/postInquiry';
import getInquiryColumns from '@/fetch/getInquiryColumns';
import Metadata from '@/components/common/Metadata';
import { METADATA } from '@/constants/config';

export default function Page() {
  const formData = useRef({});
  const date = useRef({});
  const matrixSingle = useRef({});
  const matrixMultiple = useRef({});
  const [, setSelectedChoices1] = useState([]);
  const [, setSelectedChoices2] = useState([]);
  const [, setSelectedChoices3] = useState([]);

  const [formErrors, setFormErrors] = useState(false);
  const [conditionCheck, setConditionCheck] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [submittedText, setSubmittedText] = useState('');
  const [columns, setColumns] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getColumns = async () => {
      try {
        const cols = await getInquiryColumns();
        setDescription(cols.inquiry_info);
        setColumns(cols.cols);
      } catch (error) {
        console.error('Error fetching column list :', error);
      }
    };
    getColumns();
  }, []);

  const handleInputChange = (e) => {
    setFormErrors(false);
    const { name, value } = e.target;
    formData.current = {
      ...formData.current,
      [name]: value,
    };
  };

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
    setFormErrors(false);
    setConditionCheck(e.target.checked);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    date.current = {
      ...date.current,
      [name]: value,
    };
  };

  const handleFileUpload = async (e) => {
    const fileData = new FormData();
    fileData.append('file', e.target.files[0]);

    const status = await postUpload(fileData);

    if (status.errors.length > 0) {
      setFormErrors(status.errors);
    } else {
      const file_id = status.file_id;
      formData.current = {
        ...formData.current,
        ext_08: { file_id },
      };
    }
  };

  const handleMatrixSingleChange = (e) => {
    const { name, value } = e.target;
    matrixSingle.current = {
      ...matrixSingle.current,
      [name]: value,
    };
  };

  const handleMatrixMultipleChange = (e, field) => {
    const { value, checked } = e.target;

    let setSelectedChoices;
    if (field === '1') {
      setSelectedChoices = setSelectedChoices1;
    } else if (field === '2') {
      setSelectedChoices = setSelectedChoices2;
    } else if (field === '3') {
      setSelectedChoices = setSelectedChoices3;
    }

    if (setSelectedChoices) {
      setSelectedChoices((prevChoices) => {
        let newChoices;
        if (checked) {
          newChoices = [...prevChoices, value];
        } else {
          newChoices = prevChoices.filter((choice) => choice !== value);
        }

        matrixMultiple.current = {
          ...matrixMultiple.current,
          [field]: newChoices,
        };
        return newChoices;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    const requiredFields = Object.values(columns).reduce((acc, col) => {
      if (col.required == 2) {
        acc[col.key] = col.title;
      }
      return acc;
    }, {});

    const errors = [];

    if (selectedChoices.length != 0) {
      formData.current = {
        ...formData.current,
        ext_06: selectedChoices,
      };
    }

    if (date.current.year && date.current.month && date.current.date) {
      formData.current = {
        ...formData.current,
        ext_02: `${date.current.year}-${date.current.month}-${date.current.date}`,
      };
    }

    if (matrixSingle.current) {
      formData.current = {
        ...formData.current,
        ext_07: matrixSingle.current,
      };
    }

    if (matrixMultiple.current) {
      formData.current = {
        ...formData.current,
        ext_09: matrixMultiple.current,
      };
    }

    if (!conditionCheck) {
      errors.push({ message: '利用規約に同意してください' });
    }

    Object.entries(requiredFields).forEach(([field, title]) => {
      if (!formData.current[field]) {
        errors.push({
          message: `${title.charAt(0).toUpperCase() + title.slice(1)} is required`,
        });
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const status = await postInquiry(formData.current);

    if (status.errors.length > 0) {
      setFormErrors(status.errors);
    } else {
      setSubmittedText(status.messages);
    }
  };

  return (
    <main className='l-container'>
      <Metadata title={METADATA.CONTACT} />
      <Breadcrumb paths={[{ label: 'お問い合わせ' }]} />

      <PageTitle title='お問い合わせ' subTitle='Contact' />
      <div className='l-container--small l-container--contents'>
        {submittedText ? (
          <div>
            <AlertSuccess message='Submitted' />
            <p>{submittedText}</p>
          </div>
        ) : (
          <div>
            <div className='c-form-group'>
              <p className='c-text c-text--pre u-ma-0'>{description}</p>
              <p className='c-text--small'>
                <span className='c-form-label__required'>*</span>
                は必須項目です。
              </p>
            </div>
            <form className='c-form' onSubmit={handleSubmit}>
              {formErrors && <AlertError errors={formErrors} />}
              {Object.values(columns).map((col) => (
                <div key={col.key} className='c-form-group'>
                  <label className='c-form-label'>{col.title}</label>
                  {col.required == 2 && (
                    <span className='c-form-label__required'>*</span>
                  )}
                  {col.type === 1 && (
                    <input
                      type='text'
                      name={col.key}
                      id={col.key}
                      onChange={handleInputChange}
                    />
                  )}
                  {col.type === 2 && (
                    <textarea
                      rows='4'
                      cols='60'
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
                            type='radio'
                            name={col.key}
                            id={col.key + option.key}
                            className='c-form-toggle__radio'
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
                      <option label='選択なし' value=''>
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
                            type='checkbox'
                            name={col.key}
                            id={col.key + option.key}
                            className='c-form-toggle__checkbox'
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
                    <div className='u-display-flex u-display-flex-align-items-center'>
                      <select name='year' onChange={handleDateChange}>
                        <option label='選択なし' value=''>
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
                      <label htmlFor={col.key + '_year'} className='u-pa-10'>
                        年
                      </label>
                      <select name='month' onChange={handleDateChange}>
                        <option label='選択なし' value=''>
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
                      <label htmlFor={col.key + '_month'} className='u-pa-10'>
                        月
                      </label>
                      <select name='date' onChange={handleDateChange}>
                        <option label='選択なし' value=''>
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
                      <label htmlFor={col.key + '_date'} className='u-pa-10'>
                        日
                      </label>
                    </div>
                  )}
                  {col.type === 7 && (
                    <div>
                      <input
                        type='file'
                        name={col.key}
                        id={col.key}
                        onChange={handleFileUpload}
                        accept={
                          col.options.map((option) => option.value).join(',') ||
                          '*'
                        }
                      />
                    </div>
                  )}
                  {col.type === 10 &&
                    col.attribute.selection_type === 'single' && (
                      <table className='u-width-100'>
                        <thead>
                          <tr>
                            <th></th>
                            {Object.entries(col.options[0].value).map(
                              ([key, option]) => (
                                <th key={key} scope='col'>
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
                                <th scope='row'>{row_option}</th>
                                {Object.entries(col.options[0].value).map(
                                  ([key]) => (
                                    <td
                                      key={key}
                                      className='u-text-align-center'
                                    >
                                      <input
                                        type='radio'
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
                      <table className='u-width-100'>
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
                                <th scope='row'>{row_option}</th>
                                {Object.entries(col.options[0].value).map(
                                  ([key]) => (
                                    <td
                                      key={key}
                                      className='u-text-align-center'
                                    >
                                      <input
                                        type='checkbox'
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
              <div className='c-form-group'>
                <input
                  type='checkbox'
                  name='condition_check'
                  value=''
                  id='privacy'
                  onChange={handleConditionCheck}
                />
                <label htmlFor='privacy'>
                  <Link href='#'>利用規約</Link>及び
                  <Link href='/privacy'>プライバシーポリシー</Link>に同意する
                </label>
              </div>
              <button
                type='submit'
                id='inquiry_item_button_confirm'
                className='c-button--primary u-width-100'
              >
                確認する
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
