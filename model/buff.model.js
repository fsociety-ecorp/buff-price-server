module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            session: {
                id: {
                    type: String,
                    required: true
                },
                author: String
            }
        },
        { timestamps: true },
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Buff = mongoose.model("session", schema);
    return Buff;
}