# __
A primitive template/locale mini-library to populate text.

There is no plurial, grammatical management, a minimal primitive for date format, and no number/currency format management.


## How to use

### Minimum use case

```javascript
__._add_locale('en', {
  'today' : 'Today'
});

document.body = __.populate('<h1>{{today}}</h1>');

// or, via direct set substitution rule
document.body = __.populate('<h1>{{today}}</h1>', {'{{today}}' : 'Today' });

```



