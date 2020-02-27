const mongoose = require('mongoose');

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
  return `http://localhost:3333/public/images/${this.path}`;
});

module.exports = mongoose.model('Arquivo', ArquivoSchema);