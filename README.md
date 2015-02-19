### Code Coming Soon...stay tuned!

# RedFiveJS
A lightweight creative toolkit for AdDev.  Designed to make animations, transitions and gaming functionality easier to build and faster to deploy.  

## How to Use with AdJS 5
Just include the RedFive JS script in your application.js file:
```javascript
var Ad = Verve.ExpandableAd.extend({

  scripts: ['javascripts/redfive.js'],
  
  ...

});
new Ad();
```
Now that the hard part's over, it's time to strap on your learning cap.

## The Setup
RedFive isn't too complicated and uses a fairly loose pattern.  Here's a basic example:

```javascript
var Ad = Verve.ExpandableAd.extend({

  ...
  
  onLoad: function() {
  
    Redfive.someNeatFunction({
      configOne: '', 
      configTwo: '',
      callback: function() {
      	// do stuff
      }
    });
  
  },
  
  ...

});
new Ad();
```
Not bad huh?  Ok let's dig in.

## The Code
We're gonna cover a wide variety of use cases and all of the possible configurations thereof.  If you're hungry, or need a bathroom break, now's the time.  No?  Ok then, here we go.

### Animations & Transitions

#### Blur

```javascript
Redfive.blur(element, {
  value: '2px',
  important: false,
  callback: function() {
  	// do stuff
  },
  callbackDelay: '500'
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
element |var   |HTML element to be blurred|yes
value |px   |desired amount of blur|yes
important|boolean|css specificity|no
callback|function|runs after transition|no
callbackDelay|ms|delay your callback if needed|no

#### Fade

```javascript
Redfive.fade(element, {
  blur: '1px',
  value: '0',
  speed: '500',
  timing: 'ease-in-out',
  important: false,
  callback: function() {
  	// do stuff
  },
  callbackDelay: '500'
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
element|var|HTML element to fade in or out|yes
blur  |px|desired amount of blur|no
value |num   |opacity (1 or 0)|yes
speed|ms|transition duration|yes
timing|string|transition curve (default: linear)| no
important|boolean|css specificity|no
callback|function|runs after transition|no
callbackDelay|ms|delay your callback if needed|no

#### Rotate

```javascript
Redfive.rotate(element, {
  x: '180deg',
  speed: '500',
  timing: 'ease-in-out',
  important: false,
  callback: function() {
  	// do stuff
  },
  callbackDelay: '500'
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
element|var|HTML element to be rotated|yes
x or y |deg|degree of rotation|yes
speed|ms|transition duration|yes
timing|string|transition curve (default: linear)| no
important|boolean|css specificity|no
callback|function|runs after transition|no
callbackDelay|ms|delay your callback if needed|no

#### Rotate3d

```javascript
Redfive.rotate3d(element, {
  x: '10',
  y: '10',
  z: '10',
  angle: '90deg',
  speed: '500',
  timing: 'ease-in-out',
  important: false,
  callback: function() {
  	// do stuff
  },
  callbackDelay: '500'
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
element|var|HTML element to be rotated|yes
x|num|degree of x coord rotation|yes
y|num|degree of y coord rotation|yes
z|num|degree of z coord rotation|yes
angle|num|angle of rotation|yes
speed|ms|transition duration|yes
timing|string|transition curve (default: linear)| no
important|boolean|css specificity|no
callback|function|runs after transition|no
callbackDelay|ms|delay your callback if needed|no

#### Scale

```javascript
Redfive.scale(element, {
  x: '1.5',
  speed: '500',
  timing: 'ease-in-out',
  important: false,
  callback: function() {
  	// do stuff
  },
  callbackDelay: '500'
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
element|var|HTML element to be scaled|yes
x or y |num|amount of desired scale|yes
speed|ms|transition duration|yes
timing|string|transition curve (default: linear)| no
important|boolean|css specificity|no
callback|function|runs after transition|no
callbackDelay|ms|delay your callback if needed|no

#### Scale3d

```javascript
Redfive.scale3d(element, {
  x: '2',
  y: '2',
  speed: '500',
  timing: 'ease-in-out',
  important: false,
  callback: function() {
  	// do stuff
  },
  callbackDelay: '500'
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
element|var|HTML element to be scaled|yes
x|num|amount of x coord scale|yes
y|num|amount of y coord scale|yes
speed|ms|transition duration|yes
timing|string|transition curve (default: linear)| no
important|boolean|css specificity|no
callback|function|runs after transition|no
callbackDelay|ms|delay your callback if needed|no

#### Slide

```javascript
Redfive.slide(element, {
  value: '320px',
  direction: 'left',
  speed: '500',
  timing: 'ease-in-out',
  important: false,
  callback: function() {
  	// do stuff
  },
  callbackDelay: '500'
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
element|var|HTML element to slide|yes
value|px|desired amount of slide|yes
direction|string|up, down, left, right|yes
speed|ms|transition duration|yes
timing|string|transition curve (default: linear)| no
important|boolean|css specificity|no
callback|function|runs after transition|no
callbackDelay|ms|delay your callback if needed|no
######Note: Using 'left' and 'up' assume negative space, therefore you do not need to set '-320px' in the value option.

#### General Transition

```javascript
Redfive.transition(element, {
  property: 'margin-left',
  value: '50px',
  speed: '500',
  timing: 'ease-in-out',
  important: false,
  callback: function() {
  	// do stuff
  },
  callbackDelay: '500'
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
element|var|HTML element to transition|yes
property|string|css property|yes
value|px|desired amount of transition|yes
speed|ms|transition duration|yes
timing|string|transition curve (default: linear)| no
important|boolean|css specificity|no
callback|function|runs after transition|no
callbackDelay|ms|delay your callback if needed|no

### Gaming & Other Neat Stuff

#### Timer
Creates a game timer.

```javascript
Redfive.timer(element, {
  seconds: '30',
  onStart: function() {
  	// do stuff
  },
  onEnd: function() {
  	// do stuff
  }
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
element|var|HTML element to display timer|yes
seconds |num|amount of seconds for timer|yes
onStart|function|fires when timer starts|no
onEnd|function|fires when timer ends|no

#### Racking Points
Creates a single object of accumulated points (bucket), accessible via callback.  Typically used for game ad units.

```javascript
Redfive.rackPoints({
  value: '2',
  callback: function(bucket) {
	console.log(bucket[0].points);
    // do stuff with points
  }
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
value|num|increment of points each interaction is worth|yes
callback |function|access to obj of accumulated points `bucket[0].points` |yes

#### Element Collision
Detects when elements collide.  Primarily used when elements need to interact with each other in games.

```javascript
Redfive.collide(element, {
  secondaryEl: secondaryElement,
  onCollide: function() {
    // do stuff when both elements collide
  }
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
element|var|first HTML element| yes
secondaryEl|var|second HTML element|yes
onCollide |function|fires when elements collide |yes

#### AJAX Requests
Makes quick and easy calls to get data.

```javascript
Redfive.request({
  url: 'http://spring.vrvm.com/shoplocal/getcategorylistings.aspx?campaignid=C1145B27DDC87001&citystatezip=92009&categorytreeid=212322&sortby=23&listingcount=10&resultset=full&listingimagewidth=320',
  onReturn: function(data) {
	console.log(data);
    // do stuff with data
  },
  onError: function() {
	// do stuff if request fails
  }
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
url|url|location of data| yes
onReturn|function|fires when request is successful, returns `data` object|yes
onError |function|fires if request fails|yes

#### OS/Platform Detection
Detects iOS, Android and/or Desktop.

```javascript
Redfive.detectOS({
  ios: function() {
	// do stuff if iOS
  },
  android: function() {
    // do stuff if Android
  },
  desktop: function() {
	// do stuff if desktop
  }
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
ios|function|fires if iOS device|yes
android|function|fires if Android device|yes
desktop|function|fires if desktop or unsupported device|no

#### Simple Email
Builds simple email, opens native client.

```javascript
Redfive.email({
  mailto: 'jcoletti@vervemobile.com',
  subject: 'Publishers Clearing House - You won!',
  body: 'Just kiding, you lost. lulz',
  onSend: function() {
	// do stuff when email is created
  }
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
mailto|email address|email destination|yes
subject|string|email subject, no need to encode|yes
body|string|email body, no need to encode|yes
onSend|function|fires after email client opens|no

#### Create List / Object / Array
Creates an array on the fly and stores on the client with `localstorage`.  Can be accessed via `localstorage` API as 'TheList'.

```javascript
Redfive.list({
  value: 'blarg',
  getList: function(list) {
	var theList = localStorage.getItem('TheList');
    var myList = JSON.parse(thelist);
    console.log(myList[0].value);
    // do stuff with your new array
  }
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
value|string or num|item you're storing in the array|yes
getList |function|access to array `myList[i].value` |yes

#### Detect Touch & Mouse Events
Detects touch and mouse events. Typically used with game units that need to demo on desktop.  

```javascript
Redfive.touchMouse({
  touch: function() {
	// touch stuff
  },
  mouse: function() {
    // mouse things
  }
});

```
Option|Type|Description         |Required?
:----:|:---:|:-----------------:|:-------:
value|string or num|item you're storing in the array|yes
getList |function|access to array `myList[i].value` |yes

##The End
Wanna get involved and make RedFive better?  G'head and jump in feet first.  Until then, go forth and build cool stuff!
