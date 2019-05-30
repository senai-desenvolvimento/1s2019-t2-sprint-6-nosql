using MongoDB.Bson.Serialization.Attributes;

namespace Senai.SviGufo.WebApi.Domains
{
    public class LocalizacaoDomain
    {
        [BsonId]
        // _id
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("latitude")]
        [BsonRequired]
        public string Latitude { get; set; }
        [BsonElement("longitude")]
        public string Longitude { get; set; }
    }
}
