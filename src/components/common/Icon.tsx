import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';

const Icon = (props: {
    onPress?: () => void;
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    size: number;
    style?: View['props']['style'];
}) => {
    return (
        <FontAwesome
            style={{ marginBottom: -3 }}
            {...props}
            onPres={props.onPress}
        />
    );
};

export default Icon;
