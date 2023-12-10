import { useState, useEffect, useRef } from 'react'

import {
    Alert,
    FlatList,
    TextInput
} from 'react-native'

import { useRoute, useNavigation } from '@react-navigation/native'

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { AppError } from '@utils/AppError'

import { PlayerAddByGroup } from '@storage/player/PlayerAddByGroup'
import { PlayersGetByGroup } from '@storage/player/playersGetByGroup'
import { PlayersGetByGroupAndTeam } from '@storage/player/PlayersGetByGroupAndTeam'
import { PlayerRemoveByGroup } from '@storage/player/PlayerRemoveByGroup'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { GroupRemoveByName } from '@storage/group/groupRemoveByName'
 
type RouteParams = {
    group: string
}

export function Players(){
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const route = useRoute();
    // RouteParams = tipagem dos parametros que tem dentro dessa rota
    const { group } = route.params as RouteParams

    const newPlayerNameInputRef = useRef<TextInput>(null)

    async function handleAddPlayer(){
        if(newPlayerName.trim().length === 0){
            return Alert.alert('Nova pessoas', 'Informe o nome da pessoa para adicionar.')
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            // newPlayer e nome do grupo vindo pelo parametro da rota
            await PlayerAddByGroup(newPlayer, group)
            
            newPlayerNameInputRef.current?.blur(); // o blur irá tirar o foco
            setNewPlayerName('')
            fetchPlayersByTeam(); //chama a função tb quando adicionar uma nova pessoa

        } catch (error) {
            if(error instanceof AppError){
                Alert.alert('Nova pessoa', error.message)
            }
            else {
                console.log(error)
                Alert.alert('Nova pessoa', 'Não foi possível adicionar uma nova pessoa.')
            }
        }
    }

    async function fetchPlayersByTeam(){
        try {
            /* quando essa função for chamada de novo por outra ação
            vai garantir que o isLoading seja true */
            setIsLoading(true)

            // group vindo pela rota
            const playersByTeam = await PlayersGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)

            setIsLoading(false)

        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.')
        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleRemovePlayer(playerName: string){
        try {
            await PlayerRemoveByGroup(playerName, group); //group, vindo pela rota
            fetchPlayersByTeam();

        } catch (error) {
            throw error
            Alert.alert('Remover pessoa', 'Não foi possível remover o player.')
        }
    }

    async function groupRemove(){
        try {
            // pega o group vindo do parametro da rota
            await GroupRemoveByName(group);
            navigation.navigate('groups');

        } catch (error) {
            Alert.alert('Remover grupo', 'Não foi possível remover o grupo.')
        }
    }

    async function handleGroupRemove(){
        Alert.alert(
            'Remover',
            'Deseja remover o grupo?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove() }
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam()
    },[team])

    
    return (
        <Container>

            <Header showBackButton />

            <Highlight
                title={group}
                subtitle='adicione a galera e separe os times'
            />

            <Form>
                <Input
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    placeholder='Nome da pessoa'
                    autoCorrect={false} // tira a opção do corretor
                    placeholderTextColor='#444'

                    inputRef={newPlayerNameInputRef}
                    
                    //qual função será executada quando o user clicar no
                    // botao do teclado(por ex: no meu aparece o botao OK)
                    onSubmitEditing={handleAddPlayer} // <- botao OK ou outro do teclado
                    returnKeyType='done' // 

                />

                <ButtonIcon
                    icon='add'
                    onPress={handleAddPlayer}
                />
            </Form>


            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({item}) => (

                        <Filter
                            title={item}
                            isActive={ item === team }
                            onPress={() => setTeam(item)}
                        />
                    ) }

                    horizontal
                />

                <NumbersOfPlayers> {players.length} </NumbersOfPlayers>
            
            </HeaderList>

            {
                isLoading ? 
                <Loading/> :
                <FlatList
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <PlayerCard 
                            name={item.name}
                            onRemove={() => handleRemovePlayer(item.name)}
                        />
                    ) }

                    ListEmptyComponent={() => (
                        <ListEmpty
                            message='Não há pessoas nesse time.'
                        />
                    )}

                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[

                        { paddingBottom: 100 },
                        // irá centralizar a mensagem se não houver pessoas no time                    
                        players.length === 0 && { flex: 1 }
                    
                    ]}
                />
            }

            <Button
                title='Remover Turma'
                type='SECONDARY'
                onPress={() => handleGroupRemove()}

                style={{ width: '100%' }}
            />

        </Container>
    )
}