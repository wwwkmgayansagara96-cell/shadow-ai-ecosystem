# SHEDOW AI JavaScript SDK

Official SDK for integrating SHEDOW AI into web applications.

## Installation

```bash
npm install @shedow/ai-sdk
```

## Quick Start

```javascript
import ShedowAI from '@shedow/ai-sdk';

const shedow = new ShedowAI({
  apiKey: 'your_api_key'
});

const response = await shedow.process('What time is it?');
console.log(response.output);
```

## Features

- ✅ Promise-based API
- ✅ TypeScript support
- ✅ Real-time WebSocket
- ✅ Memory graph access
- ✅ Plugin management

## Documentation

Full documentation available at [docs.shedow.ai](https://docs.shedow.ai)
