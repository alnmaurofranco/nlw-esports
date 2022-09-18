import { FlatList, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoImage from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading/inde';
import { apiClient } from '../../services/apiClient';
import { Game } from '../../types';
import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<Game[]>([])
  const navigation = useNavigation();
  useEffect(() => {
    async function fetchGames() {
      const response = await apiClient.get<Game[]>('/games');
      const data = response.data;
      setGames(data);
    }
    fetchGames()
  }, [])

  function handleOpenGame({ id, title, bannerURL, _count }: Game) {
    navigation.navigate('game', { id, title, bannerURL, _count });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImage}
          style={styles.logo}
        />

        <Heading
          title="Encontre seu duo!"
          subtitle='Selecione o game que deseja jogar...'
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
          ListEmptyComponent={() => (
            <Heading
              title="Nenhum jogo encontrado"
              subtitle="Tente novamente mais tarde"
            />
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
