import { View, Text } from 'react-native';
import { Clipboard } from 'phosphor-react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

export function EmptyAds() {
  return (
    <View style={styles.container}>
        <Clipboard size={50} color={THEME.COLORS.CAPTION_300} />
        <Text style={styles.emptyText}>Não há anúncios para este jogo ainda</Text>
    </View>
  );
}