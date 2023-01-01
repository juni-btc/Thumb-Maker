const EmojiUrl = () => {
  const emojis = [
    '😀',
    '😄',
    '😆',
    '🥹',
    '😅',
    '😂',
    '🤣',
    '🥲',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😚',
    '😋',
    '😛',
    '😝',
    '😜',
    '🤪',
    '🤨',
    '🧐',
    '🤓',
    '😎',
    '🥸',
    '🤩',
    '🥳',
    '😏',
    '😱',
    '😰',
    '😓',
    '🤥',
    '🫣',
  ]

  const emojiEffect = () => {
    setInterval(() => {
      const random = Math.floor((Date.now() / 100) % emojis.length)
      window.location.hash = emojis[random]
    }, 150)
  }

  return emojiEffect
}

export default EmojiUrl
