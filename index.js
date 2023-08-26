class VariableObserver {
  listeners = [];
  #value;

  constructor (defaultValue) {
    this.#value = defaultValue;
  }

  // Checking
  validate (newValue){
    return this.#value !== newValue;
  }

  sanitize (newValue){
    return newValue;
  }

  // Mutators
  get value (){
    return this.#value;
  }

  set value (input){
    if (this.validate(input)) {
			this.#value = this.sanitize(input);
      this.notify();
    }
  }

  // Listeners
  subscribe(callback) {
    if (this.#value != null)
      callback(this.#value);

    this.listeners.push(callback);
  }

  unsubscribe(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notify () {
    this.listeners.forEach(listener => listener(this.#value));
  }
}

export default VariableObserver;