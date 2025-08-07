/**
 * Quick benchmark to show optimization potential
 * Run this to see how much you could save!
 */

const CostOptimizer = require('@asynova/core').default;

// Simulate your AI costs
const MONTHLY_API_CALLS = 10000;
const AVG_COST_PER_CALL = 0.02; // $0.02 average

async function runBenchmark() {
  console.log('🔬 Asynova Cost Optimization Benchmark\n');
  console.log('📊 Your Current AI Usage:');
  console.log(`   API Calls/month: ${MONTHLY_API_CALLS.toLocaleString()}`);
  console.log(`   Avg cost/call: $${AVG_COST_PER_CALL}`);
  console.log(`   Monthly spend: $${(MONTHLY_API_CALLS * AVG_COST_PER_CALL).toLocaleString()}\n`);

  const optimizer = new CostOptimizer({ debug: false });
  
  // Test different types of prompts
  const testPrompts = [
    // Simple queries (high optimization potential)
    "What is machine learning?",
    "Explain AI",
    "How does ChatGPT work?",
    
    // Medium complexity
    "Write a Python function to sort an array",
    "Explain the difference between supervised and unsupervised learning",
    
    // Complex queries (less optimization with basic version)
    "Analyze this dataset and provide insights about customer behavior patterns",
    "Design a microservices architecture for an e-commerce platform"
  ];

  let totalOriginalCost = 0;
  let totalOptimizedCost = 0;
  let cacheHits = 0;

  console.log('🧪 Testing optimization on sample prompts...\n');

  // Run each prompt twice to show caching
  for (let run = 1; run <= 2; run++) {
    console.log(`\n--- Run ${run} ---`);
    
    for (const prompt of testPrompts) {
      const result = await optimizer.optimizeRequest(prompt);
      
      // Simulate cost calculation
      const originalCost = AVG_COST_PER_CALL;
      let optimizedCost = originalCost;
      
      if (result.cachedResponse) {
        optimizedCost = 0;
        cacheHits++;
        console.log(`✅ CACHED: "${prompt.substring(0, 30)}..." - 100% saved!`);
      } else {
        // Calculate savings from optimization
        const compressionSavings = (prompt.length - result.optimizedPrompt.length) / prompt.length * 0.3;
        const modelSavings = result.recommendedModel === 'small' ? 0.5 : 
                           result.recommendedModel === 'medium' ? 0.2 : 0;
        
        optimizedCost = originalCost * (1 - compressionSavings - modelSavings);
        
        // Cache for next run
        optimizer.cacheResponse(prompt, "Sample response");
      }
      
      totalOriginalCost += originalCost;
      totalOptimizedCost += optimizedCost;
    }
  }

  // Calculate results
  const savingsPercent = ((totalOriginalCost - totalOptimizedCost) / totalOriginalCost * 100).toFixed(1);
  const monthlyOriginal = MONTHLY_API_CALLS * AVG_COST_PER_CALL;
  const monthlyOptimized = monthlyOriginal * (totalOptimizedCost / totalOriginalCost);
  const monthlySavings = monthlyOriginal - monthlyOptimized;

  console.log('\n' + '='.repeat(60));
  console.log('📈 BENCHMARK RESULTS\n');
  console.log('Community Edition Performance:');
  console.log(`   Cache hits: ${cacheHits}/${testPrompts.length * 2}`);
  console.log(`   Avg reduction: ${savingsPercent}%`);
  console.log(`   Monthly savings: $${monthlySavings.toFixed(2)}\n`);

  console.log('💰 Your Projected Savings:');
  console.log(`   Current: $${monthlyOriginal.toLocaleString()}/month`);
  console.log(`   With Community Edition: $${monthlyOptimized.toFixed(2)}/month`);
  console.log(`   You save: $${monthlySavings.toFixed(2)}/month (${savingsPercent}%)\n`);

  console.log('🚀 Want MORE Savings?');
  console.log('   Community Edition: ~' + savingsPercent + '% (what you just saw)');
  console.log('   Pro Platform: 60% GUARANTEED\n');
  
  const proSavings = monthlyOriginal * 0.6;
  console.log(`   Pro would save you: $${proSavings.toFixed(2)}/month`);
  console.log(`   That's $${(proSavings * 12).toLocaleString()}/year!\n`);
  
  console.log('👉 Try Pro FREE: https://asynova.com');
  console.log('   ✅ Use your own API keys (zero cost to you)');
  console.log('   ✅ No credit card required');
  console.log('   ✅ 5 minute setup\n');
}

// Run benchmark
runBenchmark().catch(console.error);