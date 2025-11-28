// @/constants/theme -> ../constants/theme
import { Colors } from '../constants/theme';
import { useColorScheme } from './use-color-scheme'; // assuming use-color-scheme is in the same directory

// O restante do código permanece o mesmo, a não ser que você queira usar o alias @/
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}