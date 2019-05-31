import React, { Component } from 'react'
import firebase from '../../services/firebaseConfig';

export default class EventosIndex extends Component {

    constructor(){
        super();
        this.state = {
            listaEventos : [],
            titulo : '',
            descricao : '',
            data : '',
            hora : '',
            acessoLivre : false,
            ativo : false,
            idEvento : 0
        }
    }

    atualizaEstado(event){
        this.setState({[event.target.name] : event.target.value});
    }

    listarEventosRealTime(){
        firebase.firestore().collection("Eventos")
            .where("ativo", "==", true)
            .onSnapshot((eventos) => {
                let eventosArray = [];
                //Percorre os eventos retornado do banco
                eventos.forEach((evento) => {
                    //Inclui os eventos retornado em um array
                    eventosArray.push({
                        id : evento.id,
                        titulo : evento.data().titulo,
                        descricao : evento.data().descricao,
                        data : evento.data().data.toDate().toLocaleString("pt-br"),
                        acessoLivre : evento.data().acessoLivre,
                        ativo : evento.data().ativo
                    })
                })
                //Atribui os valores do Array ao state.listaEventos
                this.setState({ listaEventos : eventosArray}, () => {
                    console.log(this.state.listaEventos)
                });
            })
    }

    listarEventos(){
        firebase.firestore().collection("Eventos")
            .where("ativo", "==", true)
            .get()
            .then((eventos) => {
                //console.log(eventos);
                let eventosArray = [];
                //Percorre os eventos retornado do banco
                eventos.forEach((evento) => {
                    //Inclui os eventos retornado em um array
                    eventosArray.push({
                        id : evento.id,
                        titulo : evento.data().Titulo,
                        descricao : evento.data().Descricao,
                        data : evento.data().Data.toDate().toLocaleString('pt-br'),
                        acessoLivre : evento.data().acessoLivre,
                        ativo : evento.data().ativo
                    })
                })
                //Atribui os valores do Array ao state.listaEventos
                this.setState({ listaEventos : eventosArray}, () => {
                    console.log(this.state.listaEventos)
                });
            })


    }

    cadastraEvento(event){
        event.preventDefault();
        
        if(this.state.idEvento === 0){
            firebase.firestore().collection("Eventos").add({
                titulo : this.state.titulo,
                descricao : this.state.descricao,
                data :  firebase.firestore.Timestamp.fromDate(new Date(this.state.data + " " + this.state.hora)),
                acessoLivre : Boolean(this.state.acessoLivre),
                ativo : Boolean(this.state.ativo)
            }).then((resultado) =>{
                alert("Evento Cadastrado")
                this.limparFormulario();
            }).catch((erro) =>{
                console.log('tag', erro)
            })
        } else {
            firebase.firestore().collection("Eventos")
                .doc(this.state.idEvento)
                .set({
                    titulo : this.state.titulo,
                    descricao : this.state.descricao,
                    data :  firebase.firestore.Timestamp.fromDate(new Date(this.state.data + " " + this.state.hora)),
                    acessoLivre : Boolean(this.state.acessoLivre),
                    ativo : Boolean(this.state.ativo)
                }).then((resultado) =>{
                    alert("Evento Alterado")
                    this.limparFormulario();
                }).catch((erro) =>{
                    console.log('tag', erro)
                })
        }
    }

    limparFormulario(){
        this.setState({
            idEvento : 0,
            titulo : '',
            descricao : '',
            ativo : false,
            acessoLivre : false,
            data : '',
            hora : ''
        })
    }

    buscarPorId(event){
        event.preventDefault();

        firebase.firestore().collection("Eventos")
            .doc(event.target.id)
            .get()
            .then((evento) =>{
                this.setState({
                    idEvento : evento.id,
                    titulo : evento.data().titulo,
                    descricao : evento.data().descricao,
                    ativo : Boolean(evento.data().ativo),
                    acessoLivre : Boolean(evento.data().acessoLivre),
                    data : evento.data().data.toDate().toISOString().split("T")[0],
                    hora : evento.data().data.toDate().toTimeString().slice(0,5)
                })
            })
    }

    componentDidMount(){
        this.listarEventosRealTime();
    }

    render(){
        return (
            <div>
                <h3>Eventos - Index</h3>
                <ul>
                    {
                        this.state.listaEventos.map((evento, key) => {
                            return (
                                <li key={key}>
                                    {evento.id} - {evento.titulo} - {evento.descricao} - {evento.data} -  {evento.acessoLivre.toString()} - <button id={evento.id} onClick={this.buscarPorId.bind(this)}>Editar</button>
                                </li>
                            )
                        })
                    }
                </ul>

                <h2>Eventos - Cadastrar</h2>
                <form onSubmit={this.cadastraEvento.bind(this)}>
                    <div>
                        <label>Título</label>
                        <input type="text" name="titulo" value={this.state.titulo} onChange={this.atualizaEstado.bind(this)} required />
                    </div>
                    <div>
                        <label>Descrição</label>
                        <input type="text" name="descricao" value={this.state.descricao} onChange={this.atualizaEstado.bind(this)} required />
                    </div>
                    <div>
                        <label>Acesso Livre</label>
                        <input type="checkbox" name="acessoLivre" checked={this.state.acessoLivre} value={this.state.acessoLivre} onChange={this.atualizaEstado.bind(this)}  />
                    </div>
                    <div>
                        <label>Ativo</label>
                        <input type="checkbox" checked={this.state.ativo} name="ativo" value={this.state.ativo} onChange={this.atualizaEstado.bind(this)}  />
                    </div>
                    <div>
                        <label>Data</label>
                        <input type="date" name="data" value={this.state.data} onChange={this.atualizaEstado.bind(this)} required />
                    </div>
                    <div>
                        <label>Hora</label>
                        <input type="time" name="hora" value={this.state.hora} onChange={this.atualizaEstado.bind(this)} required />
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        )
    }
}