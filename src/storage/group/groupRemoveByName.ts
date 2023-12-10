import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig'

import { groupsGetAll } from './groupsGetAll'

export async function GroupRemoveByName(groupDeleted: string){
    try {

        const storedGroups = await groupsGetAll()
        // listar todos os grupos menos o grupo que quero deletar(groupDeleted)
        const groups = storedGroups.filter(group => group !== groupDeleted)

        // grupo deletado, aqui não uso o removeItem pois quero manter os outros grupos cadastrados
        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))

        // Já aqui só removo todos os players que estavam no grupo que deletei acima
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)
        
    } catch (error) {
        throw error
    }
}