import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GameComponent } from '../screens/Game';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Home"
        component={Home}
      />

      <Screen
        name="game"
        component={GameComponent}
      />
    </Navigator>
  );
}
