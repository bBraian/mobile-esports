import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';

import { useRoute, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import logo from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';
import { EmptyAds } from '../../components/EmptyAds';
import { DuoMatch } from '../../components/DuoMatch';

interface RouteParms {
  id: string;
  title: string;
  banneUrk: string
}

export function Game() {
  const route = useRoute();
  const game = route.params as RouteParms;
  const navigation = useNavigation();
  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.1.115:3333/ads/${adsId}/discord`)
    .then(res => res.json())
    .then(data => {
      setDiscordDuoSelected(data.discord  );
    })
  }

  useEffect(() => {
    fetch(`http://192.168.1.115:3333/games/${game.id}/ads`)
    .then(res => res.json())
    .then(data => {
      setAds(data);
    })
  }, [])

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <Background>
        <SafeAreaView style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <Entypo 
                name='chevron-thin-left'
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
            </TouchableOpacity>

            <Image source={logo} style={styles.logo} />
            <View style={styles.right} />
          </View>

          <Image 
            source={{ uri: game.banneUrk }}
            style={styles.cover}
            resizeMode="cover"
          />

          <Heading 
            title={game.title}
            subtitle="Conenct-se e começe a jogar!"
          />

          <FlatList 
            data={ads}
            keyExtractor={item => item.id}
            horizontal={true}
            style={styles.containerList}
            contentContainerStyle={ads.length === 0 ? styles.emptyListContent : styles.contentList }
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<EmptyAds />}
            renderItem={({item}) => (
              <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
            )}
          />

          <DuoMatch 
            discord={discordDuoSelected}
            visible={discordDuoSelected.length > 0}
            onClose={() => setDiscordDuoSelected('')}
      
          />

        </SafeAreaView>
    </Background>
  );
}