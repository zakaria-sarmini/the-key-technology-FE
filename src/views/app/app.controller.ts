import React from 'react';
import { IAppProps, IAppState, IPost } from './app.interfaces';
import { SocketController } from '../../controllers/socket.controller';

export default abstract class AppController extends React.PureComponent<IAppProps, IAppState>{
	protected socketController: SocketController<IPost> | undefined;
	protected currentWordCount: Record<string, number> = {};

	constructor(props: IAppProps) {
		super(props);

		this.state = {
			posts: [],
			modalOpen: false
		}
	}

	protected onPostsReceived(data: MessageEvent): void {
		const posts: IPost[] = JSON.parse(data.data);

		this.setState({
			posts
		});
	}

	protected openWordCount(wordCount: Record<string, number>): void {
		this.currentWordCount = wordCount;
		this.setState({
			modalOpen: true
		});
	}

	protected closeModal(): void {
		this.setState({
			modalOpen: false
		});
	}

	protected openPost(post: IPost): void {
		window.open(post.link,'_blank');
	}
}
