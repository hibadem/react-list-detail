import portfeil from '../assets/images/Portfeil.png';
const Header = () => {
  return (
    <header className="bg-primary flex justify-around p-2 text-base ">
      <div className="flex items-center gap-24">
        <div className="font-extrabold text-xl text-white">ETERATION</div>
        <div className="header__search">
          <input className="p-2 min-w-[384px]" type="search" name="" placeholder='Search' />
        </div>
      </div>
      
      <div className="flex items-center text-white">
        <img src={portfeil} />
        <div className="header__price">€117.000</div>
      </div>
    </header>
  )
}

export default Header;