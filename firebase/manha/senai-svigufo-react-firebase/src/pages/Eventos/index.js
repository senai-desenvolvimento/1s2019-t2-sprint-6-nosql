import React, { Component } from 'react'
import firebase from '../../services/firebaseConfig';

export default class EventosIndex extends Component {

    constructor(){
        super();
        this.state = {
            listaEventos : []
        }
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
                                    {evento.id} - {evento.titulo} - {evento.descricao} - {evento.data} - {evento.acessoLivre.toString()}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}