/**
 * Converts markdown bold and italic syntax to HTML
 * Used for content rendered via dangerouslySetInnerHTML
 * 
 * Supported:
 * - **bold** → <strong>bold</strong>
 * - *italic* → <em>italic</em>
 * - [link text](url) → <a href="url">link text</a>
 * 
 * @param text - Text with markdown syntax
 * @returns HTML string
 */
export const markdownToHtml = (text: string): string => {
  if (!text) return '';
  
  return text
    // Bold: **text** → <strong>text</strong>
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic: *text* → <em>text</em> (must come after bold to avoid conflicts)
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
    // Links: [text](url) → <a href="url" class="...">text</a>
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" class="text-wings-red hover:underline font-semibold">$1</a>'
    );
};

/**
 * Strips all markdown syntax from text
 * Used for plain text contexts like meta descriptions
 * 
 * @param text - Text with markdown syntax
 * @returns Plain text string
 */
export const stripMarkdown = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Remove links, keep text
};

