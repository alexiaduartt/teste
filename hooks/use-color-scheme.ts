// hooks/use-color-scheme.ts
import { useColorScheme as _useColorScheme } from 'react-native';

// Garante que o retorno é sempre 'light' ou 'dark'
export function useColorScheme(): 'light' | 'dark' {
  const scheme = _useColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}