import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { Container, Content, Icon } from './styles'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { useNavigation } from '@react-navigation/native'

import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'

export function NewGroup(){
  const [insertNameGroup, setInsertNameGroup] = useState('')

  const navigation = useNavigation()
  
  async function handleNew(){
    try {

      await groupCreate(insertNameGroup);
  
      navigation.navigate('players', { group: insertNameGroup })
      
    } catch (error) {
      // se o erro é da classe que criei no AppError.ts
      // se é uma instancia do AppError
      if(error instanceof AppError ){
        Alert.alert('Novo Grupo', error.message)
      }
      else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon/>
        
        <Highlight
          title='Novo Grupo'
          subtitle='crie a turma para adicionar as pessoas'
        />

        <Input
          placeholder='Nome da turma'
          placeholderTextColor='#444'
          value={insertNameGroup}
          onChangeText={setInsertNameGroup}
        />

        <Button
          title='Criar'
          style={{ 
            marginTop: 20, 
            width: '100%', 
            opacity: insertNameGroup.trim().length < 3 ? 0.3 : 1
          }}
          onPress={handleNew}
          disabled={!insertNameGroup}
        />

      </Content>

    </Container>
  )
}