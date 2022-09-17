import './styles.css'

type GameBannerProps = {
  title: string;
  link?: string;
  bannerURL: string;
  adsCount: number;
}

const GameBanner: React.FC<GameBannerProps> = ({ title, bannerURL, link, adsCount }: GameBannerProps) => {
  return (
    <a href={link ?? '#'} className='game-banner-content hover:animate-pulse delay-500 ease-out'>
      <img src={bannerURL} alt={title} />

      <div className='game-banner-details'>
        <strong className='game-banner-title'>{title}</strong>
        <span className='game-banner-subtitle'>{adsCount} anúncios</span>
      </div>
    </a>
  )
}

export default GameBanner;
