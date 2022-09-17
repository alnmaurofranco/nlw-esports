import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import logotipoImage from './assets/logo-nlw-esports.svg';
import CreateAdBanner from './components/CreateAdBanner';
import CreateAdModal from './components/CreateAdModal';
import GameContent from './components/GameContent';
import { Game } from './types';

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function fetchListAllGames() {
      const response = await fetch('http://localhost:3333/games');
      const data: Game[] = await response.json();
      setGames(data);
    }
    fetchListAllGames()
  }, []);

  return (
    <div className='md:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto flex flex-col items-center justify-center my-20'>
      <img src={logotipoImage} alt="Logotipo do NLW ESPORTS" />

      <h1 className='md:text-4xl lg:text-4xl xl:text-6xl 2xl:text-6xl text-white font-black sm:mt-12 md:mt-14 lg:mt-14 xl:mt-20 2xl:mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>
      {games && (
        <GameContent data={games} />
      )}

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
