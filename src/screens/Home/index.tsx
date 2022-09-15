import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  useEffect(() => {
    fetch('http://192.168.1.115:3333/games')
    .then(res => res.json())
    .then(data => {
      setGames(data);
    })
    .catch(err=>console.log(err))
  }, [])
    
  return (
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
                <GameCard data={item} />
            )}
        />

        
    </SafeAreaView>
  );
}