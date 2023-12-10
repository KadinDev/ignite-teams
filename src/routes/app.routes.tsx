import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

import { Groups } from '@screens/Groups'
import { Players } from '@screens/Players'
import { NewGroup } from '@screens/NewGroup'


export function AppRoutes(){
    return(
        <Navigator 
            initialRouteName='groups'
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}    
        >
            <Screen
                name='groups'
                component={ Groups }
            />

            <Screen
                name='new'
                component={ NewGroup }
            />

            <Screen
                name='players'
                component={ Players }
            />
        </Navigator>
    )
}