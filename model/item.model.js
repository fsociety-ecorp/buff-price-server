module.exports = mongoose => {
    const ExteriorSchema = mongoose.Schema({
        category: String,
        id: Number,
        internal_name: String,
        localized_name: String
    });

    const QualitySchema = mongoose.Schema({
        category: String,
        id: Number,
        internal_name: String,
        localized_name: String
    });

    const RaritySchema = mongoose.Schema({
        category: String,
        id: Number,
        internal_name: String,
        localized_name: String
    });

    const TypeSchema = mongoose.Schema({
        category: String,
        id: Number,
        internal_name: String,
        localized_name: String
    });

    const TagsSchema = mongoose.Schema({
        exterior: ExteriorSchema,
        quality: QualitySchema,
        rarity: RaritySchema,
        type: TypeSchema
    });

    const InfoSchema = mongoose.Schema({
        tags: TagsSchema
    });

    const GoodsInfoSchema = mongoose.Schema({
        icon_url: String,
        info: InfoSchema,
        item_id: String,
        original_icon_url: String,
        steam_price: String,
        steam_price_cny: String
    });

    const schema = mongoose.Schema(
        {
            appid: Number,
            bookmarked: Boolean,
            buy_max_price: String,
            buy_num: Number,
            can_bargain: Boolean,
            can_search_by_tournament: Boolean,
            description: String,
            game: String,
            goods_info: GoodsInfoSchema,
            has_buff_price_history: Boolean,
            id: Number,
            market_hash_name: String,
            market_min_price: String,
            name: String,
            quick_price: String,
            sell_min_price: String,
            sell_num: Number,
            sell_reference_price: String,
            short_name: String,
            steam_market_url: String,
            transacted_num: Number
        }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Item = mongoose.model("item", schema);
    return Item;
}