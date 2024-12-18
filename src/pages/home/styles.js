export const styles = {
    mainContainer: {
      minHeight: '100vh',
      bgcolor: 'background.default'
    },
    section: {
      py: 8
    },
    gradientBorder: {
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 2,
        padding: '2px',
        background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude'
      }
    }
  };

export const globalAnimations = {
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0px)' }
  }
};