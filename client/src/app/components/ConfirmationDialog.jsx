import { Button, Dialog, styled, useTheme } from '@mui/material'
import { tokens } from '../theme'
import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'

const Title = styled('h2')(() => ({
  margin: 0,
  marginBottom: '8px',
  textTransform: 'capitalize',
}))

const StyledButton = styled(Button)(({ theme }) => ({
  margin: '8px',
  paddingLeft: '24px',
  paddingRight: '24px',
  overflow: 'hidden',
  borderRadius: '5px',
  transition: 'all 250ms',
  '&.yesBtn': {
    '&:hover': {
      color: '#fff',
      // background: `${theme.palette.primary.main} !important`,
      // backgroundColor: `${theme.palette.primary.main} !important`,
      fallbacks: [{ color: 'white !important' }],
    },
  },
  '&.noBtn': {
    color: '#000',
    '&:hover': {
      color: '#fff',
      // background: `${theme.palette.secondary.main} !important`,
      // backgroundColor: `${theme.palette.secondary.main} !important`,
      fallbacks: [{ color: 'white !important' }],
    },
  },
}))

const ConfirmationDialog = ({
  open,
  onConfirmDialogClose,
  text,
  title = 'confirm',
  onYesClick,
  id,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Dialog maxWidth="sm" fullWidth open={open}>
      <DialogTitle>
        <Title>{title}</Title>
        <Box className="icon-close" onClick={onConfirmDialogClose}>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography style={{fontSize: "16px"}}>{text}</Typography>
      </DialogContent>
      <DialogActions>
        <StyledButton
          className="yesBtn button-confirm1"
          variant="contained"
          onClick={() => onYesClick(id)}
        >
          Đồng ý
        </StyledButton>
        <StyledButton
          className="noBtn button-cancel"
          variant="contained"
          onClick={onConfirmDialogClose}
        >
          Hủy
        </StyledButton>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
