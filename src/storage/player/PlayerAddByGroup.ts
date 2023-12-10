
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppError} from '@utils/AppError'

import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PlayersGetByGroup } from './playersGetByGroup'

export async function PlayerAddByGroup(
    newPlayer: PlayerStorageDTO, // nome do jogador e de qual time ele é
    group: string
){
    try {
        const storedPlayers = await PlayersGetByGroup(group)

        // percorrer cada pessoas que já existe e ver se ela já está cadastrada no grupo
        const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name)

        if(playerAlreadyExists.length > 0){
            throw new AppError('Essa pessoa já está adicionada em um time aqui.')
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer]);

        
        /*
            ex:
            @ignite-teams:players-${group} (nome do grupo, ex: rocket)
            @ignite-teams:players-React Js: [] - o array vai ter os nomes da pessoas que estao no grupo
            @ignite-teams:players-Node: []
        */
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage )

    } catch (error) {
        throw error
    }

}