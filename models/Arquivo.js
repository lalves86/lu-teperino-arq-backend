const mongoose = require('mongoose');
const path = require('path');

const { Schema } = mongoose;

const ArquivoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    etapa_id: {
      type: Schema.Types.ObjectId,
      ref: 'Etapa',
      required: true,
    },
  },
  { toJSON: { virtuals: true } }
);

ArquivoSchema.virtual('url').get(function() {
  return `${path.resolve(__dirname)}/public/images/${this.path}`;
});

module.exports = mongoose.model('Arquivo', ArquivoSchema);
