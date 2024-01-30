const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
    light: {
        text: '#000',
        background: '#fff',
        tint: tintColorLight,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorLight,
    },
    dark: {
        primary: '#1E88E5',
        secondary: '#E91E63',
        success: '#4CAF50',
        danger: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',
        light: '#F5F5F5',

        background: '#212121',

        gray: '#9E9E9E',
        grayLight: '#EEEEEE',
        grayDark: '#757575',
        grayText: '#BDBDBD',
        text: '#F5F5F5',
        textSecondary: '#757575',

        black: '#000000',
        white: '#FFFFFF',

        // Accent Colors
        accent1: '#FF5733', // Example: Orange
        accent2: '#4CAF50', // Example: Green
        accent3: '#3498DB', // Example: Blue
        accent4: '#9B59B6', // Example: Purple
        accent5: '#E74C3C', // Example: Red
        accent6: '#254b68',
        accent7: '#ffe6a7',
        accent8: '#94d2bd',
        // Add more accent colors as needed

        // Grayscale
        gray100: '#F8F8F8',
        gray200: '#E0E0E0',
        gray300: '#BDBDBD',
        gray400: '#757575',
        gray500: '#424242',
        gray450: '#616161',
        gray600: '#212121',

        // Additional Shades
        transparent: 'transparent',

        shadowStyle: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
        },
    },
    default: {},
};
