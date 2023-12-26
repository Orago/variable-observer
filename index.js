

export default class VariableObserver {
	listeners = [];
	rawValue;

	constructor(defaultValue) {
		this.rawValue = defaultValue;
	}

	// Checking
	validate(newValue) {
		return this.rawValue !== newValue;
	}

	sanitize(newValue) {
		return newValue;
	}

	// Mutators
	get value() {
		return this.rawValue;
	}

	set value(input) {
		if (this.validate(input)) {
			this.rawValue = this.sanitize(input);
			this.notify();
		}
	}

	// Listeners
	subscribe(callback) {
		if (this.rawValue != null)
			callback(this.rawValue);

		this.listeners.push(callback);
	}

	unsubscribe(callback) {
		this.listeners = this.listeners.filter(listener => listener !== callback);
	}

	notify() {
		this.listeners.forEach(listener => listener(this.rawValue));
	}
}