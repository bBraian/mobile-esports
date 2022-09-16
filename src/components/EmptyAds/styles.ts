import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
    height: 180,
    borderTopColor: THEME.COLORS.CAPTION_500,
    borderTopWidth: 1,
    borderRadius: 8,
    paddingVertical: 40,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyText: {
    color: THEME.COLORS.CAPTION_300,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR
  },

});