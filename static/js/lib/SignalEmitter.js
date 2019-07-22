export class SignalEmitter
{
    constructor() {
        this.listen = this.listen.bind(this);
        this.unlisten = this.unlisten.bind(this);
        this.emit = this.emit.bind(this);

        this._lists = {}
    }

    listen(signal, callback, entity=null) {
        if (!this._lists[signal]) {
            this._lists[signal] = [];
        }
        const listener = { cb: callback, entity: entity };
        this._lists[signal].push(listener);
    }

    unlisten(signal, callback, entity=null) {
        if (this._lists[signal]) {
            const newlist = this._lists[signal].filter(listener => {
                if (callback !== listener.cb) {
                    return true;
                }
                if (!entity || entity === listener.entity || !listener.entity) {
                    return false;
                }
                return true;
            })
            this._lists[signal] = newlist;
        }
    }

    /**
     * If there are listeners for the given signal type, emits a signal
     * by calling each callback function in the corresponding array of listeners
     * and passes the value and entity.
     * @param {string} signal - Type of signal (e.g. "click", "keypress", "keydown").
     * @param {any} value - The value that the signal emits.
     * @param {object} entity - Reference to a given entity (e.g. DOM node or JS object).
     */
    emit(signal, value=null, entity=null) {
        if (this._lists[signal]) {
            this._lists[signal].forEach(listener => {
                if (!listener.entity || listener.entity === entity) {
                    listener.cb(value, entity);
                }
            });
        }

        const log = false;
        if (log) {
            console.groupCollapsed(`EMIT SIGNAL ["${signal}"]`);
            console.log("Signal:", signal);
            console.log('Value:', value);
            console.log('Entity:', entity);
            console.groupEnd();
        }
    }
}
export const signal = new SignalEmitter();