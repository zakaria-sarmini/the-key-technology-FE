import React from 'react';
import parse from 'html-react-parser';
import {
	Backdrop,
	Box,
	Button,
	Chip,
	CircularProgress,
	Grid,
	Modal,
	Paper,
	ThemeProvider,
	Typography
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { theme } from '../../utils/theme';
import AppController from './app.controller';
import { SocketController } from '../../controllers/socket.controller';
import { IPost } from './app.interfaces';
import { modalStyle, postStyle } from './app.style';
import { WEBSOCKET_URL } from '../../utils/config';

class AppView extends AppController {
	componentDidMount() {
		this.socketController = new SocketController<IPost>(
			WEBSOCKET_URL, this.onPostsReceived.bind(this)
		)
	}

	render(){
		return (
			<>
				<ThemeProvider theme={theme}>
					<Grid
						container
						direction="row"
						spacing={{ xs: 2, md: 6 }}
						columns={{ xs: 4, sm: 8, md: 8 }}
						justifyContent="center"
						alignItems="center"
						p={6}
					>
						<Grid item md={12}>
							<Typography textAlign="center" variant="h5" gutterBottom component="div">
								Blog Posts
							</Typography>

							<Typography color={"#1975ef"} textAlign="center" variant="h4" gutterBottom component="div">
								The Key Technology
							</Typography>
						</Grid>

						{this.state.posts.length > 0 && this.state.posts.map((post: IPost) => (
							<Grid key={`list-key-${post.id}`} item md={4} xs={12}>
								<Paper
									sx={postStyle}
									variant={'outlined'}
								>
									<Box>
										<Chip sx={{maxWidth: '180px'}} label={post.slug} />
									</Box>

									<br/>

									<Typography textAlign="left" variant="h5" gutterBottom component="div">
										{parse(post.title.rendered)}
									</Typography>

									<Typography
										textAlign="left"
										variant="body1"
										gutterBottom
										component="div"
									>
										{parse(post.excerpt.rendered)}
									</Typography>

									<br/>

									<Box sx={{display: 'flex', justifyContent: 'space-between'}} mr={1}>
										<Button
											variant="outlined"
											onClick={() => this.openPost(post)}
										>
											Open Post
										</Button>

										<Button
											variant="contained"
											onClick={() => this.openWordCount(post.wordCount)}
										>
											Word Count
										</Button>
									</Box>
								</Paper>
							</Grid>
						))}
					</Grid>

					<Backdrop
						sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
						open={!this.state.posts.length}
					>
						<CircularProgress color="inherit" />
					</Backdrop>
				</ThemeProvider>

				<Modal
					open={this.state.modalOpen}
					onClose={() => this.closeModal()}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={modalStyle}>
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>
											<strong>Word</strong>
										</TableCell>
										<TableCell align="center">
											<strong>Count</strong>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{Object.keys(this.currentWordCount).map((word: string) => (
										<TableRow
											key={word}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{word}
											</TableCell>
											<TableCell align="center">{this.currentWordCount[word]}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Modal>
			</>
		);
	}
}

export default AppView;
