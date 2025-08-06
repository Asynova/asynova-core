# Asynova Core - AI Cost Optimization (Community Edition)

<div align="center">
  <h1>🚀 Reduce Your AI API Costs</h1>
  <p><strong>Open source library demonstrating AI cost optimization techniques</strong></p>
  
  <p>
    <a href="#quick-start">Quick Start</a> •
    <a href="#what-you-get">Features</a> •
    <a href="#examples">Examples</a> •
    <a href="#pro-version">Pro Version</a>
  </p>

  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License" />
  <img src="https://img.shields.io/badge/Status-Beta-yellow.svg" alt="Beta" />
</div>

---

## 💸 The Problem

AI API costs are exploding:
- Simple chatbot? $500-2,000/month
- Customer support AI? $5,000+/month  
- Multi-agent system? $10,000+/month

## 💡 The Solution (Community Edition)

This library demonstrates basic optimization techniques that can reduce costs by 10-20%:

- ✅ **Simple Caching** - Avoid duplicate API calls
- ✅ **Basic Compression** - Reduce prompt sizes
- ✅ **Model Selection** - Choose cheaper models when possible

> Want 60% cost reduction? Check out our [Pro Platform →](https://asynova.com)

## 🚀 Quick Start

### Installation

**Option 1: Clone and Use Locally**
```bash
git clone https://github.com/asynova/asynova-core.git
cd asynova-core
npm install
npm run build
```

**Option 2: Copy the Code**
```bash
# Copy src/cost-optimizer.ts into your project
# It's MIT licensed - use it freely!
```

### Basic Usage

```javascript
import CostOptimizer from './cost-optimizer';
// or
const CostOptimizer = require('./cost-optimizer').default;

const optimizer = new CostOptimizer({ debug: true });

async function callAI(prompt) {
  // 1. Optimize the request
  const { optimizedPrompt, cachedResponse, recommendedModel } = 
    await optimizer.optimizeRequest(prompt);
  
  // 2. Return cached response if available
  if (cachedResponse) return cachedResponse;
  
  // 3. Call AI with optimized parameters
  const response = await openai.complete({
    prompt: optimizedPrompt,
    model: recommendedModel
  });
  
  // 4. Cache for next time
  optimizer.cacheResponse(prompt, response);
  
  return response;
}
```

## 📊 What You Get

| Feature | Description | Typical Savings |
|---------|-------------|-----------------|
| **Basic Cache** | Exact prompt matching | 5-10% |
| **Simple Compression** | Remove common words | 5-10% |
| **Model Selection** | Length-based routing | 5-10% |
| **Total** | Combined techniques | **10-20%** |

## 🎯 Examples

Check the `examples/` directory for:
- `basic-usage.js` - Simple integration
- `customer-support.js` - Support bot optimization
- `benchmark.js` - Performance comparison

Run examples:
```bash
npm run example:basic
npm run example:support
npm run benchmark
```

## 🏢 Pro Version - Asynova Platform

This community edition is just the beginning. Our **[Pro Platform](https://asynova.com)** delivers:

- **60% average cost reduction** (vs 10-20% here)
- **Enterprise features** (SSO, audit logs, SLA)
- **Multi-provider support** (OpenAI, Anthropic, Google)
- **Real-time analytics** and cost tracking
- **Priority support** from our team

### Our Goal:
Help developers build amazing AI applications without breaking the bank.

**[Learn More →](https://asynova.com)**

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## ⭐ Support

If this helps you:
1. ⭐ Star this repository
2. 📢 Share with other developers
3. 🚀 Consider [Asynova Pro](https://asynova.com) for maximum savings

---

<div align="center">
  <p>Built with ❤️ by developers tired of massive AI bills</p>
  <p>
    <a href="https://asynova.com">
      <img src="https://img.shields.io/badge/Try%20Pro-60%25%20Savings-green?style=for-the-badge" alt="Try Pro" />
    </a>
  </p>
</div>