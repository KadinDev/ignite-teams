import {PlayersGetByGroup} from './playersGetByGroup'

export async function PlayersGetByGroupAndTeam(group: string, team: string){
    try {
        // pega os jogadores do grupo selecionado
        const storage = await PlayersGetByGroup(group)

        // verifica quem é do time que quero filtrar, Team A, Team B ...
        const players = storage.filter(player => player.team === team)

        return players

    } catch (error) {
        throw error
    }
}