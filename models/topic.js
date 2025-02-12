const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
    },
});

// module.exports = mongoose.model("Topic", TopicSchema);
module.exports = mongoose.models.Topic || mongoose.model("Topic", TopicSchema);