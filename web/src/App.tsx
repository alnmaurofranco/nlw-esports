import { useEffect, useState } from 'react';
import logotipoImage from './assets/logo-nlw-esports.svg';
import CreateAdBanner from './components/CreateAdBanner';
import GameContent from './components/GameContent';
import { Game } from './types';
import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react';
import Input from './components/Form/Input';
import Button from './components/Form/Button';

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
    <div className='max-w-[1344px] mx-auto flex flex-col items-center justify-center my-20'>
      <img src={logotipoImage} alt="Logotipo do NLW ESPORTS" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>
      {games && (
        <GameContent data={games} />
      )}

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='font-black text-3xl'>Publique um anúncio</Dialog.Title>

            <form className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                <Input
                  id="game"
                  type="text"
                  placeholder='Selecione o game que deseja jogar'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="name" className='font-semibold'>Seu nome (ou nickname)</label>
                <Input
                  id="name"
                  type="text"
                  placeholder='Como te chamam dentro do game?'
                />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearPlaying" className='font-semibold'>Joga há quantos anos?</label>
                  <Input
                    id="yearPlaying"
                    type="number"
                    placeholder='Tudo bem ser ZERO'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord" className='font-semibold'>Qual seu Discord?</label>
                  <Input
                    id="discord"
                    type="text"
                    placeholder='Usuario#000'
                  />
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays" className='font-semibold'>Qual costuma jogar?</label>

                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      title="Domingo"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      D
                    </Button>
                    <Button
                      title="Segunda-feira"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </Button>
                    <Button
                      title="Terça-feira"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      T
                    </Button>
                    <Button
                      title="Quarta-feira"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      Q
                    </Button>
                    <Button
                      title="Quinta-feira"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      Q
                    </Button>
                    <Button
                      title="Sexta-feira"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </Button>
                    <Button
                      title="Sábado"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart" className='font-semibold'>Qual horário do dia?</label>

                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      id="hourStart"
                      type="time"
                      placeholder='De'
                    />
                    <Input
                      id="hourEnd"
                      type="time"
                      placeholder='Até'
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input
                  name="useVoiceChannel"
                  type="checkbox"
                />
                Costumo me conectar no chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                  Cancelar
                </Dialog.Close>
                <Button
                  type='submit'
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600 flex items-center gap-3"
                >
                  <GameController size={24} />
                  Encontrar duo
                </Button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
