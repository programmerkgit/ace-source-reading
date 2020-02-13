type Callback = (e: {}) => any
type DefaultHandlers = { __disabled__: { [key: string]: Callback[] } } & { [key: string]: Callback }

/**
* represent EventEmitter
* */
export class EventEmitter {
    private eventRegistry: { [key: string]: Callback[] } = {};
    private defaultHandlers: DefaultHandlers = {__disabled__: {}} as DefaultHandlers;

    private safeGetListeners(eventName: string): Callback[] {
        this.eventRegistry[eventName] || (this.eventRegistry[eventName] = []);
        return this.eventRegistry[eventName];
    }

    constructor() {
    }

    private safeGetDisabledDefaultHandlers(eventName: string): Callback[] {
        this.defaultHandlers.__disabled__[eventName] || (this.defaultHandlers.__disabled__[eventName] = []);
        return this.defaultHandlers.__disabled__[eventName];
    }

    setDefaultHandlers(eventName: string, callback: Callback): EventEmitter {
        const handlers = this.defaultHandlers;
        if (handlers[eventName]) {
            /* 元々のデフォルトハンドラーをDisableに格納 */
            const oldHandler = handlers[eventName];
            const disabled = this.safeGetDisabledDefaultHandlers(eventName);
            disabled.push(oldHandler);
            /* disabledにcallbackが存在していたら削除 */
            const index = disabled.indexOf(callback);
            if (index != -1) {
                disabled.splice(index, 1);
            }
        }
        handlers[eventName] = callback;
        return this;
    }
    /**
     * add event listner
     * @param {string} eventName - name of event to listen to
     * @param {Callback} callback - function which is called when emitted event of eventName
     * */
    addListener(eventName: string, callback: Callback): EventEmitter {
        this.safeGetListeners(eventName).push(callback);
        return this;
    }

    removeListener(eventName: string, callback: Callback): void {
        const index = (this.safeGetListeners(eventName)).indexOf(callback);
        if (0 < index) {
            this.safeGetListeners(eventName).splice(index, 1);
        }
    }

    // event名を渡したらevent名のListenerを全て削除
    // event名を渡さない場合は全てのListenerを削除
    removeAllListener(eventName?: string): EventEmitter {
        if (eventName === null || eventName === undefined) {
            this.eventRegistry = {};
        } else {
            this.eventRegistry[eventName] = [];
        }
        return this;
    }

    emit(eventName: string, e: {}): EventEmitter {
        (this.safeGetListeners(eventName)).forEach(callback => {
            callback(e);
        });
        return this;
    }
}
