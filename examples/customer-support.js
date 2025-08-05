/**
 * Multi-Provider Example - Use with OpenAI, Anthropic, Google Gemini
 * Shows how Asynova Core works with any AI provider
 */

const { AdvancedCostSaver } = require('@asynova/core');
const Redis = require('ioredis');

// Initialize optimizer
const redis = new Redis();
const optimizer = new AdvancedCostSaver(redis, { debug: true });

// Example: Customer Support System
class CustomerSupportAI {
  constructor() {
    this.requestCount = 0;
    this.totalSaved = 0;
  }

  async handleQuery(userQuery) {
    console.log(`\n🎫 Support Ticket #${++this.requestCount}: "${userQuery}"`);
    
    // 1. Check cache for similar questions
    const cached = await optimizer.semanticDeduplication(userQuery);
    if (cached) {
      console.log('✅ Found similar question in cache!');
      this.totalSaved += 0.05; // Saved ~$0.05 per cached response
      return {
        response: cached,
        cost: 0,
        source: 'cache'
      };
    }

    // 2. Optimize the query
    const { optimizedPrompt, model } = await optimizer.optimizeRequest(userQuery);
    
    // 3. Route to appropriate AI provider based on model
    let response;
    let cost;
    
    switch(model) {
      case 'gemini-1.5-flash':
        response = await this.callGeminiFlash(optimizedPrompt);
        cost = 0.0001; // Super cheap!
        break;
      case 'gemini-1.5-flash-8b':
        response = await this.callGeminiFlash8b(optimizedPrompt);
        cost = 0.0005;
        break;
      case 'gemini-1.5-pro':
        response = await this.callGeminiPro(optimizedPrompt);
        cost = 0.005;
        break;
      default:
        response = await this.callGeminiFlash(optimizedPrompt);
        cost = 0.0001;
    }

    // 4. Cache the response
    await optimizer.cacheResponse(userQuery, response);
    
    // Calculate savings
    const wouldHaveCost = 0.01; // GPT-4 cost
    this.totalSaved += (wouldHaveCost - cost);
    
    return {
      response,
      cost,
      source: model,
      saved: wouldHaveCost - cost
    };
  }

  // Mock AI provider calls (replace with real implementations)
  async callGeminiFlash(prompt) {
    console.log('🚀 Using Gemini Flash (fastest & cheapest)');
    return `[Gemini Flash Response] I understand your question about "${prompt}". Here's a helpful response...`;
  }

  async callGeminiFlash8b(prompt) {
    console.log('⚡ Using Gemini Flash 8B (balanced)');
    return `[Gemini Flash 8B Response] Based on your question about "${prompt}", I can help you with...`;
  }

  async callGeminiPro(prompt) {
    console.log('🧠 Using Gemini Pro (most capable)');
    return `[Gemini Pro Response] This is a complex question about "${prompt}". Let me provide a detailed answer...`;
  }

  printStats() {
    console.log('\n📊 Session Statistics:');
    console.log(`   Total queries: ${this.requestCount}`);
    console.log(`   Total saved: $${this.totalSaved.toFixed(4)}`);
    console.log(`   Average saving per query: $${(this.totalSaved / this.requestCount).toFixed(4)}`);
    console.log(`   Monthly projection (1000 queries/day): $${(this.totalSaved * 30000 / this.requestCount).toFixed(2)}`);
  }
}

// Simulate a customer support session
async function runSimulation() {
  const support = new CustomerSupportAI();
  
  // Common customer queries
  const queries = [
    "How do I reset my password?",
    "Can you help me reset my password?", // Similar to above
    "What are your business hours?",
    "When are you open?", // Similar to above
    "I need to cancel my subscription and get a refund for the last month",
    "How do I integrate your API with my Python application?",
    "My account was charged twice this month",
    "Is my data encrypted?",
    "How can I export my data?",
    "Password reset not working", // Similar to first query
  ];

  console.log('🎬 Starting Customer Support Simulation...\n');
  
  for (const query of queries) {
    const result = await support.handleQuery(query);
    console.log(`💬 Response: ${result.response.substring(0, 80)}...`);
    console.log(`💰 Cost: $${result.cost.toFixed(4)} (saved $${result.saved?.toFixed(4) || '0.0000'})`);
    console.log(`📍 Source: ${result.source}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Pause for readability
  }

  support.printStats();
}

// Run the simulation
runSimulation()
  .then(() => {
    console.log('\n✅ Simulation complete!');
    console.log('💡 Notice how similar queries were cached and cost $0!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
