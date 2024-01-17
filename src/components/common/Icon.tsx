import FontAwesome from '@expo/vector-icons/FontAwesome';

const Icon = (props: {
    onPress?: () => void;
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) => {
    return (
        <FontAwesome
            size={28}
            style={{ marginBottom: -3 }}
            {...props}
            onPres={props.onPress}
        />
    );
};

export default Icon;
