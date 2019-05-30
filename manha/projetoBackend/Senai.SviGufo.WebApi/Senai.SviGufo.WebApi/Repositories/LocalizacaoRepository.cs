using System.Collections.Generic;
using MongoDB.Driver;
using Senai.SviGufo.WebApi.Domains;
using Senai.SviGufo.WebApi.Interfaces;

namespace Senai.SviGufo.WebApi.Repositories
{
    public class LocalizacaoRepository : ILocalizacaoRepository
    {

        private readonly IMongoCollection<LocalizacaoDomain> _localizacoes;

        public LocalizacaoRepository()
        {
            // var client = new MongoClient("mongodb://localhost:27017");
            var client = new MongoClient("mongodb://svigufom:svi132@ds263816.mlab.com:63816/svigufom");
        
            var database = client.GetDatabase("svigufom");
            _localizacoes = database.GetCollection<LocalizacaoDomain>("mapas");
        }

        public void Cadastrar(LocalizacaoDomain localizacao)
        {
            _localizacoes.InsertOne(localizacao);
        }

        public List<LocalizacaoDomain> ListarTodos()
        {
            // _localizacoes.Find(null).ToList();
            return _localizacoes.Find(localizacao => true).ToList();
        }
    }
}
