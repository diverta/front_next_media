"use client"

import Breadcrumb from "@/components/common/Breadcrumb"
import PageTitle from "@/components/common/PageTitle"
import { getLabels } from "@/components/common/fetchData"
import Link from "next/link"
import { useRef, useState } from "react"
import { reminder, reset } from "@/components/common/fetchData"
import AlertSuccess from "@/components/ui/AlertSuccess"

export default function Reminder({ searchParams }) {
  const token = searchParams && searchParams.token ? searchParams.token : null
  const contentDirectory = getLabels()
  const content = contentDirectory.reminder
  const mail = useRef("")
  const temp_pwd = useRef("")
  const login_pwd = useRef("")

  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const handleChange = () => {
    setAlert(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await reminder(mail.current.value)
    if (response) {
      setAlert(true)
      setAlertMessage(response)
    }
  }

  const handleReset = async (event) => {
    event.preventDefault()
    const response = await reset(
      token,
      temp_pwd.current.value,
      login_pwd.current.value,
    )
    if (response) {
      setAlert(true)
      setAlertMessage(response)
    }
  }

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--small l-container--contents">
        <div class="c-box">
          {alert && <AlertSuccess message={alertMessage} />}
          {token ? (
            <form className="c-form" onSubmit={handleReset}>
              <div className="c-form-group">
                <label htmlFor="email" className="c-form-label">
                  仮パスワード
                </label>
                <input
                  name="temp_password"
                  type="password"
                  id="temp_password"
                  ref={temp_pwd}
                />
              </div>
              <div className="c-form-group">
                <label htmlFor="password" className="c-form-label">
                  パスワード
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  ref={login_pwd}
                />
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  )
}
