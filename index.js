// @ts-check

/**
 * @template valueType
 */
export default class VariableObserver {
	/**
	 * @type {Array<Function>}
	 */
	listeners = [];

	/**
	 * @type {valueType | any}
	 */
	rawValue;

	/**
	 * 
	 * @param {valueType | any} defaultValue 
	 */
	constructor (defaultValue) {
		if (defaultValue != undefined){
			this.rawValue = defaultValue;
		}
	}

	/**
	 * 
	 * @param {valueType} newValue 
	 * @returns 
	 */
	validate(newValue) {
		return this.rawValue !== newValue;
	}

	/**
	 * 
	 * @param {valueType} newValue 
	 * @returns 
	 */
	sanitize(newValue) {
		return newValue;
	}

	// Mutators
	get value() {
		return this.rawValue;
	}

	/**
	 * Set current value and notify
	 * @see {VariableObserver.notify}
	 */
	set value(input) {
		if (this.validate(input)) {
			this.rawValue = this.sanitize(input);
			this.notify();
		}
	}

	/**
	 * Listen to changes
	 * @param {function (valueType): *} callback 
	 */
	subscribe(callback) {
		if (this.rawValue != null)
			callback(this.rawValue);

		this.listeners.push(callback);
	}


	/**
	 * 
	 * @param {function (valueType): *} callback 
	 */
	unsubscribe(callback) {
		this.listeners = this.listeners.filter(listener => listener !== callback);
	}

	/**
	 * Calls all of the listeners with current value
	 */
	notify() {
		for (const listener of this.listeners) {
			listener(this.rawValue);
		}
	}
}