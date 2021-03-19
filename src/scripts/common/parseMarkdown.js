/* eslint-disable no-cond-assign, prefer-destructuring */
import commonmark from 'commonmark';
import sanitize from './sanitize';

export default str => {
  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer();

  const parsed = reader.parse(str);
  const walker = parsed.walker();

  let event;
  let node;

  while ((event = walker.next())) {
    node = event.node;
    if (
      event.entering &&
      (node.type === 'html_inline' || node.type === 'html_block')
    ) {
      node.literal =
        node.type === 'html_block'
          ? `<p>${sanitize(node.literal)}</p>`
          : sanitize(node.literal);
    }
  }

  return writer.render(parsed);
};
