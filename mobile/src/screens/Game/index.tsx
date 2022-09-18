import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { Entypo } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../theme';

import logoImage from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading/inde';
import { apiClient } from '../../services/apiClient';
import { Announcement } from '../../types';
import { DuoCard } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

type RouteGameParams = {
  id: string;
  title: string;
  bannerURL: string;
}

export function GameComponent() {
  const [duos, setDuos] = useState<Announcement[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const gameRoute = route.params as RouteGameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(announcementId: string) {
    const response = await apiClient.get(`/ads/${announcementId}/discord`);
    setDiscordDuoSelected(response.data.discord);
  }

  useEffect(() => {
    async function fetchCreateAd() {
      try {
        const response = await apiClient.get<Announcement[]>(`/games/${gameRoute.id}/ads`, {});
        const data = response.data
        setDuos(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCreateAd();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImage}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: gameRoute.bannerURL }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={gameRoute.title}
          subtitle='Conecte-se e comece a jogar!'
        />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              onConnect={() => getDiscordUser(item.id)}
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Heading
              title="Nenhum anúncio encontrado"
              subtitle="Que tal criar um anúncio?"
            />
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />

      </SafeAreaView>
    </Background>
  );
}
