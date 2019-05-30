using Microsoft.AspNetCore.Mvc;
using Senai.SviGufo.WebApi.Domains;
using Senai.SviGufo.WebApi.Interfaces;
using Senai.SviGufo.WebApi.Repositories;

namespace Senai.SviGufo.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LocalizacoesController : ControllerBase
    {

        private ILocalizacaoRepository LocalizacaoRepository { get; set; }

        public LocalizacoesController()
        {
            LocalizacaoRepository = new LocalizacaoRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(LocalizacaoDomain localizacao)
        {
            try
            {
                LocalizacaoRepository.Cadastrar(localizacao);
                return Ok();
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(LocalizacaoRepository.ListarTodos());
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }

    }
}