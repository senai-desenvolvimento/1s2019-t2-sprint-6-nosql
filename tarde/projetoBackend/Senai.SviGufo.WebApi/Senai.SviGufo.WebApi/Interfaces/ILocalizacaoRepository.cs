using Senai.SviGufo.WebApi.Domains;
using System.Collections.Generic;

namespace Senai.SviGufo.WebApi.Interfaces
{
    public interface ILocalizacaoRepository
    {
        void Cadastrar(LocalizacaoDomain localizacao);

        List<LocalizacaoDomain> ListarTodos();
    }
}
