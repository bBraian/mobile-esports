import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation();

  function handleOpenGame({ id, title, banneUrk }: GameCardProps) {
    navigation.navigate('game', { id, title, banneUrk });
  }

  useEffect(() => {
    fetch('http://192.168.1.228:3333/games')
    .then(res => res.json())
    .then(data => {
      setGames(data);
    })
    .catch(err=>console.log(err))
  }, [])
    
  return (
    <Background>
      <SafeAreaView style={styles.container}>
          <Image 
              source={logoImg}
              style={styles.logo}
          />

          <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar' />

          <FlatList
              contentContainerStyle={styles.contentList}
              data={games}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                  <GameCard data={item} onPress={() => handleOpenGame(item)} />
              )}
          />
          
      </SafeAreaView>
    </Background>
  );
}