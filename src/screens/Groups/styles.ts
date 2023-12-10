import styled from 'styled-components/native';

// faz os elementos serem exibidos em area segura, no caso do Iphone
// vai livrar da barrinha acima, melhor que o SafeAreaView do reactnative
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_600};
    align-items: center;
    justify-content: center;
    padding: 40px 0 20px;
`;

export const Title = styled.Text`
    font-size: 12px;
    color: #fff
`;