# react-code-field

A predictable input field for codes, PIN codes, promotional codes, and the like.

## WARNING

Still in alpha version, api changes every update, don't use in production

## Props:

| Property         | Type     |
| :--------------- | :------- |
| fields           | number   |
| type?            | string   |
| initialValue     | string   |
| className?       | string   |
| inputClassName?  | string   |
| listBannedChars? | string[] |
| forceUpperCase?  | boolean  |
| autoFocus?       | boolean  |
| onChange?        | func     |
| onLastChange?    | func     |

## TODO:

- [x] add character filtering
- [x] add the ability to call callback when the last input is changed
- [x] add the ability to set a initial value
- [x] add the ability to force characters to uppercase
- [ ] add the ability to integrate with formik and other form managers
- [x] add the ability to turn autofocus on and off
- [ ] add typescript support
- [ ] write functional tests
- [ ] write unit tests
- [ ] create live demo
- [ ] create complete README

If you have questions or suggestions, create a issue.
