import { Modal, ModalProps, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading/inde';
import Clipboard from 'expo-clipboard'
import { useState } from 'react';

type DuoMatchProps = ModalProps & {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
  const [isCopping, setIsCopping] = useState<boolean>(false)

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true)
    await Clipboard.setStringAsync(discord);
    Alert.alert('Copiado com sucesso!');
    setIsCopping(false)
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons
              name="close"
              color={THEME.COLORS.CAPTION_500}
              size={20}
            />
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading
            title="Let's play together!"
            subtitle="Agora é so começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text>
            Adicione no discord
          </Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>{isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
