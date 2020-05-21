import { ICONS, OTHERS_ICON } from '@/constants/icons.constants';

function getIcon(name: string) {
    const icon = ICONS.find(i => i.name === name);
    if (icon) {
        return icon.icon;
    }
    return OTHERS_ICON.icon;
}

export { getIcon };
