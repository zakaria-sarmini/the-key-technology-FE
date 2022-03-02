import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export const modalStyle: SxProps<Theme> = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	borderRadius: '12px',
	p: 4,
	overflowX: 'hidden'
}

export const postStyle: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'left',
	bgcolor: 'background.paper',
	overflow: 'hidden',
	borderRadius: '12px',
	boxShadow: 1,
	fontWeight: 'bold',
	padding: "32px"
}
