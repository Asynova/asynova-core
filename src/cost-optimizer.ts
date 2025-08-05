/**
 * Asynova Cost Optimizer - Community Edition
 * 
 * This is a simplified version of our production algorithms.
 * For enterprise-grade optimization with 60% cost reduction,
 * visit https://asynova.com
 * 
 * MIT License - Use freely!
 */

export interface OptimizationConfig {
  enableCaching?: boolean;
  enableCompression?: boolean;
  enableModelSelection?: boolean;
  debug?: boolean;
}

export interface OptimizationStats {
  technique: 'cache' | 'compression' | 'model_selection' | 'none';
  potentialSavings: 'high' | 'medium' | 'low' | 'none';
  optimized: boolean;
}

/**
 * Community Edition Cost Optimizer
 * 
 * This demonstrates the core concepts behind AI cost optimization.
 * Our production version at asynova.com includes:
 * - Advanced ML-based optimization
 * - Semantic similarity matching  
 * - Multi-provider orchestration
 * - Real-time cost prediction
 */
export class CostOptimizer {
  private simpleCache: Map<string, { response: string; timestamp: number }>;
  private config: OptimizationConfig;
  private readonly CACHE_TTL = 3600000; // 1 hour
  
  constructor(config: OptimizationConfig = {}) {
    this.simpleCache = new Map();
    this.config = {
      enableCaching: true,
      enableCompression: true,
      enableModelSelection: true,
      debug: false,
      ...config
    };
  }

  /**
   * Main optimization method
   * Returns optimized prompt and recommendations
   */
  async optimizeRequest(prompt: string): Promise<{
    optimizedPrompt: string;
    cachedResponse?: string;
    recommendedModel: string;
    stats: OptimizationStats;
  }> {
    // 1. Try cache first (simplified version)
    if (this.config.enableCaching) {
      const cached = this.checkSimpleCache(prompt);
      if (cached) {
        return {
          optimizedPrompt: prompt,
          cachedResponse: cached,
          recommendedModel: 'cache',
          stats: {
            technique: 'cache',
            potentialSavings: 'high',
            optimized: true
          }
        };
      }
    }

    // 2. Compress prompt (basic version)
    let optimizedPrompt = prompt;
    let compressionApplied = false;
    
    if (this.config.enableCompression) {
      const compressed = this.compressPrompt(prompt);
      if (compressed.length < prompt.length * 0.8) {
        optimizedPrompt = compressed;
        compressionApplied = true;
      }
    }

    // 3. Select appropriate model
    const recommendedModel = this.config.enableModelSelection 
      ? this.selectModel(optimizedPrompt)
      : 'default';

    // Determine optimization stats
    const stats: OptimizationStats = {
      technique: compressionApplied ? 'compression' : 'none',
      potentialSavings: this.estimateSavings(prompt, optimizedPrompt, recommendedModel),
      optimized: compressionApplied || recommendedModel !== 'default'
    };

    if (this.config.debug) {
      console.log('[Asynova] Optimization stats:', {
        originalLength: prompt.length,
        optimizedLength: optimizedPrompt.length,
        reduction: `${((1 - optimizedPrompt.length / prompt.length) * 100).toFixed(1)}%`,
        model: recommendedModel
      });
    }

    return {
      optimizedPrompt,
      recommendedModel,
      stats
    };
  }

  /**
   * Store response in cache
   */
  cacheResponse(prompt: string, response: string): void {
    if (this.config.enableCaching) {
      this.simpleCache.set(this.normalizePrompt(prompt), {
        response,
        timestamp: Date.now()
      });
      
      // Clean old entries
      this.cleanCache();
    }
  }

  /**
   * Basic prompt compression
   * Production version uses advanced NLP techniques
   */
  private compressPrompt(prompt: string): string {
    // Remove extra spaces
    let compressed = prompt.replace(/\s+/g, ' ').trim();
    
    // Remove filler words (simplified list)
    const fillers = [
      'please', 'could you', 'can you', 'I would like',
      'I want', 'I need', 'kindly', 'just'
    ];
    
    for (const filler of fillers) {
      compressed = compressed.replace(new RegExp(`\\b${filler}\\b`, 'gi'), '');
    }
    
    // Common abbreviations
    const abbreviations: Record<string, string> = {
      'artificial intelligence': 'AI',
      'machine learning': 'ML',
      'natural language processing': 'NLP',
      'for example': 'e.g.',
      'et cetera': 'etc'
    };
    
    for (const [full, short] of Object.entries(abbreviations)) {
      compressed = compressed.replace(new RegExp(full, 'gi'), short);
    }
    
    // Clean up
    compressed = compressed.replace(/\s+/g, ' ').trim();
    
    return compressed;
  }

  /**
   * Simple model selection based on prompt characteristics
   * Production version uses ML-based complexity assessment
   */
  private selectModel(prompt: string): string {
    const length = prompt.length;
    const words = prompt.split(' ').length;
    
    // Check for complexity indicators
    const complexIndicators = [
      'analyze', 'complex', 'detailed', 'comprehensive',
      'algorithm', 'implement', 'architecture', 'optimize'
    ];
    
    const hasComplexity = complexIndicators.some(indicator => 
      prompt.toLowerCase().includes(indicator)
    );
    
    // Simple rules
    if (hasComplexity || words > 100) {
      return 'large'; // Most capable, most expensive
    } else if (words > 50 || length > 300) {
      return 'medium'; // Balanced
    } else {
      return 'small'; // Fast and cheap
    }
  }

  /**
   * Check simple cache
   * Production version uses semantic similarity matching
   */
  private checkSimpleCache(prompt: string): string | null {
    const normalized = this.normalizePrompt(prompt);
    const cached = this.simpleCache.get(normalized);
    
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL) {
      if (this.config.debug) {
        console.log('[Asynova] Cache hit!');
      }
      return cached.response;
    }
    
    return null;
  }

  /**
   * Normalize prompt for caching
   */
  private normalizePrompt(prompt: string): string {
    return prompt.toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Estimate potential savings
   */
  private estimateSavings(
    original: string, 
    optimized: string, 
    model: string
  ): 'high' | 'medium' | 'low' | 'none' {
    const compressionRatio = 1 - (optimized.length / original.length);
    const modelSavings = model === 'small' ? 0.4 : model === 'medium' ? 0.2 : 0;
    
    const totalSavings = compressionRatio + modelSavings;
    
    if (totalSavings > 0.5) return 'high';
    if (totalSavings > 0.25) return 'medium';
    if (totalSavings > 0.1) return 'low';
    return 'none';
  }

  /**
   * Clean expired cache entries
   */
  private cleanCache(): void {
    const now = Date.now();
    for (const [key, value] of this.simpleCache.entries()) {
      if (now - value.timestamp > this.CACHE_TTL) {
        this.simpleCache.delete(key);
      }
    }
  }
}

/**
 * Example usage
 */
export async function demonstrateOptimization() {
  const optimizer = new CostOptimizer({ debug: true });
  
  // First request
  const prompt1 = "Could you please provide a comprehensive analysis of artificial intelligence and machine learning applications?";
  const result1 = await optimizer.optimizeRequest(prompt1);
  
  console.log('\n--- First Request ---');
  console.log('Original:', prompt1);
  console.log('Optimized:', result1.optimizedPrompt);
  console.log('Model:', result1.recommendedModel);
  console.log('Savings:', result1.stats.potentialSavings);
  
  // Cache the response
  optimizer.cacheResponse(prompt1, "AI and ML are transforming industries...");
  
  // Second request (similar, will hit cache)
  const prompt2 = "Could you please provide a comprehensive analysis of AI and ML applications?";
  const result2 = await optimizer.optimizeRequest(prompt2);
  
  console.log('\n--- Second Request (Cached) ---');
  console.log('Original:', prompt2);
  console.log('From cache:', !!result2.cachedResponse);
  console.log('Savings:', result2.stats.potentialSavings);
}

// Export everything
export default CostOptimizer;