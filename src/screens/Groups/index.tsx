import { useCallback, useState } from 'react';
import { FlatList, Alert } from 'react-native';

import * as G from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupsGetAll';

export function Groups() {
  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup(){
    // exemplo passando o parametro para uma rota tipada
    //navigation.navigate('players', { group: 'Galera do Ignite' } )
    
    navigation.navigate('new')
  }

  async function fetchGroups(){
    try {
      setIsLoading(true);

      const data = await groupsGetAll()
      setGroups(data);
      
      setIsLoading(false)

    } catch (error) {
      console.log(error)
      Alert.alert('Turmas', 'Não foi possível carregar as turmas.')
    }
    finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(groupName: string){
    navigation.navigate('players', { group: groupName } )
  }

  // Quando a tela estiver em foco
  useFocusEffect(
    useCallback( () => {
      fetchGroups()
    }, [] )
  )

  return (
    <G.Container>
      <Header/>
      
      <Highlight
        title='Turmas'
        subtitle='jogue com a sua turma'
      />

      { isLoading ? <Loading/> : 
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({item}) => (
              <GroupCard
                title={item}
                onPress={() => handleOpenGroup(item)}
              />
            )
          }

          contentContainerStyle={
            groups.length === 0 && { flex: 1 }
          }

          ListEmptyComponent={ () => (
            <ListEmpty 
              message='Que tal cadastrar a primeira turma?' 
            />
          ) }
        />
      }


      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />

    </G.Container>
  );
}