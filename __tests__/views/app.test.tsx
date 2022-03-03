import React from 'react';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import WS from "jest-websocket-mock";
import { Backdrop, Modal } from '@mui/material';
import '@testing-library/jest-dom/extend-expect'

import AppView from '../../src/views/app/app.view';
import { WEBSOCKET_URL } from '../../src/utils/config';
import { IPost } from '../../src/views/app/app.interfaces';

describe('AppView', () => {
	let server: WS;
	const postsMock: IPost[] = [{
		link: '',
		wordCount: {
			'word': 1
		},
		id: 0,
		excerpt: {
			rendered: '',
			protected: false
		},
		title: {
			rendered: '',

		},
		slug: '',
		date: '',
		_links: {},
		author: 0,
		featured_media: 0,
		type: ''
	}];

	function updatePosts(): void {
		const posts: string = JSON.stringify(postsMock);
		server.send(posts);
	}

	beforeEach(async () => {
		// starts mock socket server
		server = new WS(WEBSOCKET_URL);
		const client = new WebSocket(WEBSOCKET_URL);
		await server.connected;
	});

	afterEach(() => {
		// close all mocked socket connections
		WS.clean();
	});

	it('AppView should match snapshot', () => {
		const component: ShallowWrapper = shallow(<AppView />);

		expect(component).toMatchSnapshot();
	});

	it('shows loading on app start', () => {
		const component: ReactWrapper = mount(<AppView />);

		expect(component.find(Backdrop)).toHaveLength(1);
	});

	it('connects to websocket and receives socket events', () => {
		// @ts-ignore
		const spy: jest.SpyInstance = jest.spyOn(AppView.prototype, 'onPostsReceived');

		const component: ReactWrapper = mount(<AppView />);
		// @ts-ignore
		component.instance().componentDidMount();

		updatePosts();

		expect(spy).toHaveBeenCalled();
	});

	it('updates state when posts arrives', () => {
		const component: ShallowWrapper = shallow(<AppView />);

		updatePosts();

		// @ts-ignore
		expect(component.instance().state.posts).toHaveLength(1);
		// @ts-ignore
		expect(component.instance().state.posts[0]).toEqual(postsMock[0]);
	});

	it('can show word count', () => {
		// @ts-ignore
		const spy: jest.SpyInstance = jest.spyOn(AppView.prototype, 'openWordCount');

		const component: ReactWrapper = mount(<AppView />);

		// add posts to dom
		updatePosts();
		component.update();

		// retrieve open word count button
		const button: ReactWrapper = component.find('#word-count-button-0').hostNodes();

		// check and click
		expect(button.exists()).toEqual(true);
		button.simulate('click');

		// @ts-ignore
		expect(spy).toHaveBeenNthCalledWith(1, postsMock[0].wordCount);
		// @ts-ignore
		expect(component.instance().state.modalOpen).toBeTruthy();
		expect(component.find(Modal)).toHaveLength(1);
	});
});
