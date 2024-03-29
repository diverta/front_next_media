export default function AlertSuccess({ message }) {
  return (
    <div className='c-alert c-alert--success'>
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
            <circle cx='13' cy='13' r='13' fill='var(--color-success)' />
            <path
              d='M18.3333 9L11 16.3333L7.66667 13'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <p className='c-alert__heading'>{message}</p>
      </div>
    </div>
  );
}
