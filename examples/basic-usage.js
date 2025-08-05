/**
 * Basic Example - Getting Started with Asynova Core
 * This shows how to reduce AI costs using the community edition
 */

const CostOptimizer = require('@asynova/core').default;

async function main() {
  // Initialize optimizer
  const optimizer = new CostOptimizer({ 
    debug: true,
    enableCaching: true,
    enableCompression: true,
    enableModelSelection: true
  });

  // Example prompts
  const prompts = [
    "Can you please explain what artificial intelligence is and how it works?",
    "What is AI?", // Similar to first, should suggest caching
    "Write a complex algorithm to implement a binary search tree with balancing",
    "Hello, how are you?", // Simple, should use cheap model
  ];

  console.log('🚀 Asynova Core - Cost Optimization Demo\n');

  for (const prompt of prompts) {
    console.log('\n' + '='.repeat(60));
    console.log('📝 Original prompt:', prompt);
    console.log('   Length:', prompt.length, 'characters');
    
    // Optimize the request
    const result = await optimizer.optimizeRequest(prompt);
    
    console.log('\n🔧 Optimization Results:');
    console.log('   Optimized prompt:', result.optimizedPrompt);
    console.log('   Length:', result.optimizedPrompt.length, 'characters');
    console.log('   Reduction:', ((1 - result.optimizedPrompt.length / prompt.length) * 100).toFixed(1) + '%');
    console.log('   Recommended model:', result.recommendedModel);
    console.log('   Optimization type:', result.stats.technique);
    console.log('   Potential savings:', result.stats.potentialSavings);
    
    if (result.cachedResponse) {
      console.log('\n✅ CACHED RESPONSE FOUND! 100% cost savings!');
    } else {
      // Simulate API call and cache response
      const fakeResponse = `Response for: ${result.optimizedPrompt.substring(0, 30)}...`;
      optimizer.cacheResponse(prompt, fakeResponse);
      console.log('\n💾 Response cached for future use');
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n🎯 Summary:');
  console.log('   - Caching eliminates duplicate API calls');
  console.log('   - Compression reduces token usage');
  console.log('   - Smart model selection uses cheaper models when possible');
  console.log('\n💡 For production-grade optimization with 60% savings:');
  console.log('   Visit https://asynova.com');
}

main().catch(console.error);