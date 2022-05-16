import React from "react";
import { renderToString } from "react-dom/server.js"

const html = renderToString(
    React.createElement('h1', {}, 'Hello Word')
)

console.log(html)