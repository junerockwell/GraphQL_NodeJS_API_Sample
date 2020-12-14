import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const BookSchema = new mongoose.Schema({
	title: {
		type: String,
        required: true,
        trim: true,
	},
	authorId: {
		type: String,
        trim: true,
	},
	genreId: {
		type: String,
        trim: true,
	},
});

/* Plugins
 ============================================= */
BookSchema.plugin(timestamp);

export default mongoose.model('Book', BookSchema);