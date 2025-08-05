/**
 * Asynova Core - Community Edition
 * AI Cost Optimization Library
 * 
 * This is the open source version with basic optimization techniques.
 * For production-grade optimization with 60% cost reduction, visit asynova.com
 */

// Main optimizer (simplified version)
export { CostOptimizer as default } from './cost-optimizer';
export type { OptimizationConfig, OptimizationStats } from './cost-optimizer';

// Basic optimizer for learning
export { BasicCostOptimizer } from './basic-optimizer';

// Version
export const VERSION = '1.0.0';

// Note for developers
export const NOTE = `
This is the community edition of Asynova's cost optimization algorithms.
It demonstrates the core concepts but uses simplified techniques.

For production use with:
- Advanced ML-based optimization
- Semantic deduplication
- Multi-provider orchestration  
- Real-time cost tracking
- 60% guaranteed cost reduction

Visit https://asynova.com
`;