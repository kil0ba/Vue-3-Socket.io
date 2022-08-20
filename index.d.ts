import { Socket } from "socket.io-client";
import { App } from "vue";
import type { Store } from "vuex";

interface socketHandler<T> {
	(this: T, ...args: any[]): void
}

interface Sockets<V> {
	[key: string]: socketHandler<V>
}

declare module "@vue/runtime-core" {

	export interface ComponentCustomProperties {
		$socket: Socket,
		sockets: {
			subscribe (eventName: string, handler: socketHandler<App>): void,
			unsubscribe (eventName: string): void,
		}
	}

	export interface ComponentCustomOptions  {
		sockets?: Sockets<App>;
	}

}

export interface VueSocketOptions {
	debug?: boolean;
	connection: string | Socket,
	vuex?: {
		store?: Store<any>,
		actionPrefix?: string,
		mutationPrefix?: string,
		options?: {
			useConnectionNamespace?: boolean
		}
	},
	// type declarations for optional options
	options?: {
		path?: string;
	}
}

export default class VueSocketIO {
	constructor (options: VueSocketOptions);
	install: (app: App) => void;
}