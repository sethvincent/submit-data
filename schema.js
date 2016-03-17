module.exports = {
  required: true,
  type: 'object',
  properties: {
    title: {
      required: true,
      type: 'string',
      default: null
    },
    description: {
      type: 'string',
      default: null
    },
    url: {
      type: 'string',
      default: null
    }
  }
}
