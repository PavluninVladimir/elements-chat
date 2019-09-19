var concat = require('concat');

const files = [
    './dist/elements-chat/runtime.js',
    './dist/elements-chat/polyfills.js',
    './dist/elements-chat/scripts.js',
    './dist/elements-chat/main.js'
]

concat(files, './dist/mi-element-chats.js')