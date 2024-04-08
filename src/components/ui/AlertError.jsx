export default function AlertError({ errors, message }) {
  return (
    <div className='c-alert c-alert--error'>
      <div className='u-display-flex'>
        <div className='c-alert__icon u-display-flex-shrink-0'>
          <svg
            width='26'
            height='26'
            viewBox='0 0 26 26'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='u-display-block'
          >
            <circle cx='13' cy='13' r='13' fill='var(--color-error)' />
            <path
              d='M13 8.33331V13'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M13 17.6667H13.01'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div>
          <p className='c-alert__heading'>エラーが発生しました</p>
          <p className='c-alert__message'>{message}</p>
          <p className='c-alert__message'>
            {errors?.map((item, index) => (
              <span key={index}>
                {item.message}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
