import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

export default Styles.style({
    $nest: {
      '.custom-combobox .selection': {
        background: 'transparent',
        border: 'none',
        $nest: {
          'input': {
            background: 'transparent',
            color: Theme.text.third,
            border: 'none'
          }
        }
      },
      '.custom-combobox .icon-btn': {
        border: 'none'
      },
      'input': {
        background: 'transparent',
        color: Theme.text.third,
        border: 'none'
      },
      '.btn-os': {
        color: '#fff',
        fontWeight: 600,
        fontSize: '1rem',
        borderRadius: 5,
        background: Theme.background.gradient,
        $nest: {
          '&:disabled': {
            color: '#fff'
          }
        }
      }
    }
});