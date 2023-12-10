import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { useTheme } from 'styled-components'

/*
    A ideia da View por volta do NavigationContainer é para não aparecer
    uma (piscada branca) atrás das rotas, pois vem como padrão esse tipo de
    piscada quando vc navega para outra rota, entao coloco uma View por volta
    e coloco o background nela, assim tira esse branco padrao.
*/
export function Routes(){
    
    const { COLORS } = useTheme()

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }} >
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </View>
    )
}