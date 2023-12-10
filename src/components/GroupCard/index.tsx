import { TouchableOpacityProps } from 'react-native';
import * as G from './styles';


// União de tipagem, o Props recebe toda a tipagem de um
// TouchableOpacity + as que passar a seguir(title, ...)
type Props = TouchableOpacityProps & {
    title: string;
}


export function GroupCard({ title, ...rest } : Props){
    return (
        <G.Container {...rest} >
            <G.Icon />
            <G.Title> {title} </G.Title>
        </G.Container>
    )
} 