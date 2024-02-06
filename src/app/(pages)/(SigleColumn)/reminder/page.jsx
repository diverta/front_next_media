'use client'

import Breadcrumb from '@/components/common/Breadcrumb'
import PageTitle from '@/components/common/PageTitle'
import { getLabels } from '@/components/common/fetchData'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { reminder } from '@/components/common/fetchData'
import AlertSuccess from '@/components/ui/AlertSuccess'

export default function Reminder() {
  const contentDirectory = getLabels();
  const content = contentDirectory.reminder;
  const mail = useRef('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = () => {
    setAlert(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(mail.current.value);
    const response = await reminder(mail.current.value);
    console.log('yaha',response);
    if (response) {
      setAlert(true);
      setAlertMessage(response);
    }
  }

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--small l-container--contents">
        <form
          className="c-form"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <div className="c-form-group">
            <p>パスワードリセットのメールを送信します。</p>
          </div>
          <div className="c-form-group">
            <label htmlFor="email" className="c-form-label">
              メールアドレス
            </label>
            <input name="email" type="email" id="email" ref={mail} />
          </div>
          <div className="c-form-group">
            <button className="c-button--primary u-width-100">送信</button>
          </div>
          <div className="c-form-group u-text-align-center">
            <Link href="/login" className="nuxt-link-active">
              ログイン
            </Link>
          </div>
        </form>
        {alert && (
          <AlertSuccess message={alertMessage} />
        )}
      </div>
    </div>
  )
}
