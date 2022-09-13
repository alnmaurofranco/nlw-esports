import { ImageBackground } from 'react-native';

import { styles } from './styles';

import backgroundImage from '../../assets/background-galaxy.png';

type BackgroundProps = {
  children: React.ReactNode
}

export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      defaultSource={backgroundImage}
    >
      {children}
    </ImageBackground>
  );
}
