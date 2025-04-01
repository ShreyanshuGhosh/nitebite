
// Helper function to get icon for category
export function getCategoryIcon(category: string): string {
  switch (category) {
    case 'chips': return '🍟';
    case 'drinks': return '🥤';
    case 'coffee': return '☕';
    case 'chocolate': return '🍫';
    case 'biscuits': return '🍪';
    default: return '📦';
  }
}
