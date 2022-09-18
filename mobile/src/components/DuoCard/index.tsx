// import { GameController } from 'phosphor-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { Announcement } from '../../types';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

type DuoCardProps = {
  data: Announcement
  onConnect(): void
}

export function DuoCard({ onConnect, data }: DuoCardProps) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label="Nome"
        value={data.name}
      />

      <DuoInfo
        label="Tempo de jogo"
        value={`${data.yearPlaying} anos`}
      />

      <DuoInfo
        label="Disponibilidade"
        value={
          data.weekDays.length > 0
            ? `${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`
            : 'Nenhum'
        }
      />

      <DuoInfo
        label="Chamada de áudio"
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={onConnect}
      >
        {/* <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        /> */}

        <Text style={styles.buttonTitle}>
          Conectar
        </Text>

      </TouchableOpacity>
    </View >
  );
}
