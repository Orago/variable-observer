# @orago/variable-observer

### Usage:


```html
new VariableObserver(<startingValue>);
```

```js
import VariableObserver from '@orago/variable-observer';

const test = new VariableObserver('friday');
```

### Creating a listener
```js
function myCallback (value){
	console.log('hello world, today is', value);
}

test.subscribe(myCallback);
```

### Updating values
```js
test.value = 'saturday';
/* console => */ 'hello world, today is saturday'
```

### Removing a listener
```js
test.unsubscribe(myCallback);
```

### Handling minor changes in an object
By default, this util will not handle changes within an object

you will have to do this yourself

```js
const me = new VariableObserver({
	name: 'orago',
	age: 17
});

me.value.name = 'gato';
// Nothing happens since value wasn't modified directly

// to manually call all subscribed events use
me.notify();
```