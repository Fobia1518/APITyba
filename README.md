# Project Tyba API

## Installation

Use command npm for dependencies

```bash
npm i
```

## Usage

Command to execute the project through docker compose

```javascript
docker compose up
```

## Warning: if you have this specific error

```javascript
const utf8Encoder = new TextEncoder();
```
## Solution: 

* Open your file *encoding.js* located in node_modules -> whatwg-url -> lib

In place of

```javascript
"use strict";
const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder("utf-8", { ignoreBOM: true });
```

Replace for this

```javascript
var util= require('util');
const utf8Encoder = new util.TextEncoder();
const utf8Decoder = new util.TextEncoder("utf-8", { ignoreBOM: true });
```
