import { MagnifyingGlassPlus } from 'phosphor-react'
import logotipoImage from './assets/logo-nlw-esports.svg';

function App() {
  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center justify-center my-20'>
      <img src={logotipoImage} alt="Logotipo do NLW ESPORTS" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        <a href="#" className='relative rounded-lg overflow-hidden'>
          <img src="./game-1.png" alt="League of Legends" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>League of Legends</strong>
            <span className='text-zinc-300 text-sm block'>4 anúncios</span>
          </div>
        </a>
        <a href="#" className='relative rounded-lg overflow-hidden'>
          <img src="./game-2.png" alt="Dota 2" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>Dota 2</strong>
            <span className='text-zinc-300 text-sm block'>1 anúncios</span>
          </div>
        </a>
        <a href="#" className='relative rounded-lg overflow-hidden'>
          <img src="./game-3.png" alt="CS:GO" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>CS:GO</strong>
            <span className='text-zinc-300 text-sm block'>6 anúncios</span>
          </div>
        </a>
        <a href="#" className='relative rounded-lg overflow-hidden'>
          <img src="./game-4.png" alt="Apex" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>APEX</strong>
            <span className='text-zinc-300 text-sm block'>1 anúncios</span>
          </div>
        </a>
        <a href="#" className='relative rounded-lg overflow-hidden'>
          <img src="./game-5.png" alt="Fortnite" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>Fortnite</strong>
            <span className='text-zinc-300 text-sm block'>6 anúncios</span>
          </div>
        </a>
        <a href="#" className='relative rounded-lg overflow-hidden'>
          <img src="./game-6.png" alt="World of Warcraft" />

          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>World of Warcraft</strong>
            <span className='text-zinc-300 text-sm block'>4 anúncios</span>
          </div>
        </a>
      </div>

      <div className='pt-2 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
          <div>
            <strong className='text-2xl text-white font-bold block'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>

          <button className='py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
