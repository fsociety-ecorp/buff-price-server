module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            sessionId: String
        },
        { timestamps : true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.Object();
        object.id = _id;
        return object;
    });

    const Buff = mongoose.model("buff", schema);
    return Buff;
}