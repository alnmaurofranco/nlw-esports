import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { CaretDown, CaretUp, Check, GameController } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { apiClient } from '../../services/apiClient';
import { Game } from '../../types';
import Button from '../Form/Button';
import Checkbox from '../Form/Checkbox';
import Input from '../Form/Input';

const CreateAdModal: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    async function fetchListAllGames() {
      const response = await fetch('http://localhost:3333/games');
      const data: Game[] = await response.json();
      setGames(data);
    }
    fetchListAllGames()
  }, []);

  async function handleCreateAnnouncement(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const body = {
      name: data.name,
      discord: data.discord,
      yearPlaying: Number(data.yearPlaying),
      weekDays: {
        days: weekDays
      },
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      useVoiceChannel,
    }
    try {
      await apiClient.post(`/games/${data.game}/ads`, body);
      alert('Anúncio criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar anúncio');
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='font-black text-3xl'>Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAnnouncement} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
            <Select.Root name='game'>
              <Select.Trigger className="bg-zinc-900 rounded px-4 py-3 text-sm flex justify-between gap-2">
                <Select.Value
                  className='text-zinc-400'
                  placeholder="Selecione o game que deseja jogar"
                />

                <Select.Icon>
                  <CaretDown size={16} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="bg-zinc-900 py-1 px-1 mt-10 rounded w-[400px]">

                  <Select.ScrollUpButton
                    className="flex items-center justify-center h-[25px] bg-zinc-900 hover:bg-zinc-800 cursor-default rounded"
                  >
                    <CaretUp size={16} className="text-violet-500" />
                  </Select.ScrollUpButton>

                  <Select.Viewport>
                    {games && games.map(game =>
                    (
                      <Select.Item
                        key={game.id}
                        value={game.id}
                        className="text-white text-sm py-2 px-3 hover:bg-zinc-800"
                      >
                        <Select.ItemText className="text-white">
                          {game.title}
                        </Select.ItemText>
                        <Select.ItemIndicator
                          className="absolute w-[25px] items-center justify-center right-2"
                        >
                          <Check size={18} className="text-emerald-500" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>

                  <Select.ScrollDownButton
                    className="flex items-center justify-center h-[25px] bg-emerald-800 cursor-default"
                  >
                    <CaretDown size={16} />
                  </Select.ScrollDownButton>

                </Select.Content>
              </Select.Portal>

            </Select.Root>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="name" className='font-semibold'>Seu nome (ou nickname)</label>
            <Input
              id="name"
              name='name'
              type="text"
              placeholder='Como te chamam dentro do game?'
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearPlaying" className='font-semibold'>Joga há quantos anos?</label>
              <Input
                id="yearPlaying"
                name='yearPlaying'
                type="number"
                placeholder='Tudo bem ser ZERO'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="discord" className='font-semibold'>Qual seu Discord?</label>
              <Input
                id="discord"
                name='discord'
                type="text"
                placeholder='Usuario#000'
              />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays" className='font-semibold'>Qual costuma jogar?</label>

              <ToggleGroup.Root
                type='multiple'
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value='0'
                  title="Domingo"
                  className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='1'
                  title="Segunda-feira"
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900 '}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='2'
                  title="Terça-feira"
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='3'
                  title="Quarta-feira"
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='4'
                  title="Quinta-feira"
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='5'
                  title="Sexta-feira"
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='6'
                  title="Sábado"
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart" className='font-semibold'>Qual horário do dia?</label>

              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="hourStart"
                  name='hourStart'
                  type="time"
                  placeholder='De'
                />
                <Input
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder='Até'
                />
              </div>
            </div>
          </div>

          <label className="mt-2 items-center flex gap-2 text-sm">
            <Checkbox
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
              iconStyle='text-violet-500'
            >
              Costumo me conectar no chat de voz
            </Checkbox>
          </label>

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
  )
}

export default CreateAdModal;
