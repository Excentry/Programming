import { FaGlobeAmericas } from 'react-icons/fa';
export function Header({ userName, dateTime, children }) {
  return (
    <header className='fb-feedCard-header'>
      <img
        className='fb-feedCard-avatar'
        alt='Avatar del Usuario'
        src={`https://unavatar.io/${userName}`}
      />
      <div className='fb-feedCard-info'>
        <strong>{children}</strong>

        <div className='fb-feedCard-subInfo'>
          <span className='fb-feedCard-date'>{dateTime}</span>
          <span className='fb-feedCard-Type'>
            <FaGlobeAmericas size={12} />
          </span>
        </div>
      </div>
    </header>
  );
}
