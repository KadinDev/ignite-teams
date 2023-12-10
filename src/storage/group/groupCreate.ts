import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from '@storage/storageConfig'
import { groupsGetAll } from './groupsGetAll'
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName: string){
    /* pega todos os grupos já salvos e adiciona a eles o novo grupo */
    try {
        // buscar os nomes dos grupos já salvos
        const storedGroups = await groupsGetAll();

        // o includes ele permite verificar se já existe algum
        // nome igual ao nome que quero cadastrar
        const groupAlreadyExists = storedGroups.includes(newGroupName)

        if(groupAlreadyExists){
            // vou lançar uma nova excessão
            throw new AppError('Já existe um grupo cadastrado com esse nome!')
        }

        // transforma as informações em string
        const storage = JSON.stringify([...storedGroups, newGroupName])

        await AsyncStorage.setItem( GROUP_COLLECTION, storage )
    
    } catch (error) {
        throw error
    }
}