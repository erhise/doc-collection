import presets, { colors } from './presets';
import { rhythm, scale, options } from './typography';

export const scrollbarStyles = {
  WebkitOverflowScrolling: 'touch',
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: colors.ui.bright,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: colors.lilac,
  },
  '&::-webkit-scrollbar-track': {
    background: colors.ui.light,
  },
}
