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

        background: {
            '50': '#f5f5f5',
            '100': '#e8e8e8',
            '200': '#c7c7c7',
            '300': '#a6a6a6',
            '400': '#636363',
            '500': '#212121',
            '600': '#1f1c1c',
            '700': '#1a1313',
            '800': '#140c0c',
            '900': '#0f0707',
            '950': '#0a0303',
        },

        black: '#000000',
        white: '#FFFFFF',

        grayWarm: {
            '50': '#f7f6f2',
            '100': '#f2f1eb',
            '200': '#dedacc',
            '300': '#c9c3af',
            '400': '#a1957d',
            '500': '#796b52',
            '600': '#6b5a41',
            '700': '#59462e',
            '800': '#47321d',
            '900': '#362211',
            '950': '#241307',
        },

        grayCool: {
            '50': '#f7fafa',
            '100': '#f2f7f7',
            '200': '#dde8eb',
            '300': '#c8dade',
            '400': '#a5bfc7',
            '500': '#84a2ad',
            '600': '#6a8d9c',
            '700': '#4a6e82',
            '800': '#305169',
            '900': '#1b374f',
            '950': '#0b1e33',
        },

        green: {
            '50': '#f2faf6',
            '100': '#e9f7ef',
            '200': '#caebd7',
            '300': '#ade0bd',
            '400': '#77c786',
            '500': '#4caf50',
            '600': '#3e9e41',
            '700': '#2a852d',
            '800': '#1b691e',
            '900': '#0f4f10',
            '950': '#063307',
        },

        orange: {
            '50': '#fffcf2',
            '100': '#fff9e6',
            '200': '#ffefbf',
            '300': '#ffe299',
            '400': '#ffc34d',
            '500': '#ff9800',
            '600': '#e68200',
            '700': '#bf6600',
            '800': '#994a00',
            '900': '#733200',
            '950': '#4a1c00',
        },

        accent3: '#3498DB', // Example: Blue
        accent4: '#9B59B6', // Example: Purple
        accent5: '#E74C3C', // Example: Red
        accent6: '#254b68',
        accent7: '#ffe6a7',
        accent8: '#94d2bd',

        // Additional Shades
        transparent: 'transparent',
    },
    default: {},
};

export const InsetShadows = {
    light: {
        inset1: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
        },
        inset2: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2.22,
            elevation: 4,
        },
        inset3: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3.62,
            elevation: 6,
        },
        inset4: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
        },
        inset5: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.4,
            shadowRadius: 6.27,
            elevation: 10,
        },
    },
    dark: {
        inset1: {
            shadowColor: '#FFF',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
        },
        inset2: {
            shadowColor: '#FFF',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2.22,
            elevation: 4,
        },
        inset3: {
            shadowColor: '#FFF',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3.62,
            elevation: 6,
        },
        inset4: {
            shadowColor: '#FFF',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
        },
        inset5: {
            shadowColor: '#FFF',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.4,
            shadowRadius: 6.27,
            elevation: 10,
        },
    },
};

export const Shadows = {
    light: {
        elevation1: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
        },
        elevation2: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2.22,
            elevation: 4,
        },
        elevation3: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3.62,
            elevation: 6,
        },
        elevation4: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
        },
        elevation5: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.4,
            shadowRadius: 6.27,
            elevation: 10,
        },
    },
    dark: {
        elevation1: {
            shadowColor: '#FFF',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
        },
        elevation2: {
            shadowColor: '#FFF',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2.22,
            elevation: 4,
        },
        elevation3: {
            shadowColor: '#FFF',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3.62,
            elevation: 6,
        },
        elevation4: {
            shadowColor: '#FFF',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
        },
        elevation5: {
            shadowColor: '#FFF',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.4,
            shadowRadius: 6.27,
            elevation: 10,
        },
    },
};
