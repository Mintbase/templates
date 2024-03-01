/* eslint-disable react/no-children-prop */

import ReactMarkdown from 'react-markdown'

const Markdown = ({ children }: { children: string }) => {
  return <ReactMarkdown children={children} />
}

export default Markdown
