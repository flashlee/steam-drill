function buildQuery(filter) {
    if (!filter) return;
    const query = {};
    if(filter.steam_app_id) query.appid = filter.steam_app_id;
    if(filter.name_contains) query.name = {$regex:`.*${filter.name_contains}.*`};
    return query;
}

module.exports = {
    Query: {
      allApps: async (root, {filter, first, skip}, {mongo: {SteamApps}}) => {
        const limit = (!filter) ? (first || 10) : (first || 0);
        const skipItems = skip || 0;
        const query = buildQuery(filter);
        const cursor = SteamApps.find(query).limit(limit).skip(skipItems); 
        return cursor.toArray();
      }
    },

    App: {
        id: root => root._id || root.id
    }
};