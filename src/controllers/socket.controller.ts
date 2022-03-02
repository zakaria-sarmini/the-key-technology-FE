export class SocketController<T> {
	private readonly url: string;
	private readonly onDataReceived: (data: MessageEvent<T>) => void
	private ws: WebSocket | undefined;
	private connectionTimeOut: number = 500;

	constructor(socketURL: string, onDataReceived: (data: MessageEvent<T>) => void) {
		this.url = socketURL;
		this.onDataReceived = onDataReceived;

		this.connect();
	}

	/**
	 * connects to the socket
	 * @private
	 */
	private connect(): void {
		let ws = new WebSocket(this.url);
		this.registerSocketEventsListeners(ws);
	}

	/**
	 * registers to general socket events
	 * @param ws
	 * @private
	 */
	private registerSocketEventsListeners(ws: WebSocket): void {
		let connectInterval: any;

		// websocket onopen event
		ws.onopen = _ => {
			this.ws = ws;

			// reset connection timer
			this.connectionTimeOut = 500;

			clearTimeout(connectInterval);
		};

		// websocket onclose event
		ws.onclose = _ => {
			// increase reconnect time
			this.connectionTimeOut += this.connectionTimeOut;
			connectInterval = setTimeout(this.check.bind(this), Math.min(10000, this.connectionTimeOut));
		};

		// websocket onerror event
		ws.onerror = err => {
			console.error(err);

			ws.close();
		};

		// websocket on data received
		ws.onmessage = (data: MessageEvent<T>) => {
			this.onDataReceived(data)
		}
	}

	/**
	 * checks socket connection and reconnect if disconnected
	 */
	private check(): void {
		if (!this.ws || this.ws.readyState === WebSocket.CLOSED) this.connect();
	};
}
