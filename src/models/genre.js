import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const GenreSchema = new mongoose.Schema({
	title: {
		type: String,
        required: true,
        trim: true,
	},
});

/* Plugins
 ============================================= */
GenreSchema.plugin(timestamp);

export default mongoose.model('Genre', GenreSchema);