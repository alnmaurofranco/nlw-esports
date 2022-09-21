import { Game } from '../../types';
import GameBanner from '../GameBanner';
import './styles.css'

type GameContentProps = {
  data: Game[]
}

const GameContent: React.FC<GameContentProps> = ({ data }: GameContentProps) => {
  return (
    <div className='game-content'>
      {data && data.map((game) => (
        <GameBanner
          key={game.id}
          title={game.title}
          bannerURL={game.bannerURL}
          adsCount={game.count}
        />
      ))}
    </div>
  )
}

export default GameContent;
