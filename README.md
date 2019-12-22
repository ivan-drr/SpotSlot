
# SpotSlot ![Working on](https://www.flaticon.com/free-icon/challenges_1933952)
SpotSlot or Sot, is a node module powered by React which list all files and folders found on the given path and let the user to manage it with a simple API on PHP.

## Installation
Install the package with npm on your app:

```
npm install spot-slot
```

## Usage
Use it on lifecycle method render:

```javascript
import React, { Component } from 'react'
import FileManager from 'spot-slot'

class App extends Component {
  render() {
    return (<FileManger files=[]/>)
  }
}
```
Or use it with ES6 imports:
```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import FileManager from 'spot-slot'

var mount = document.querySelectorAll('div.browser-mount');

ReactDOM.render(
  <FileManager
    files=[]
  />,
  mount[0]
);
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
