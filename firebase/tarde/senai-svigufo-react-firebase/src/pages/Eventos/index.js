import React, { Component} from 'react';
import firebase from '../../services/firebase';

export default class EventosIndex extends Component{

    constructor(){
        super();

        this.state ={
            listaEventos : []
        }
    }

    listarEventosRealTime(){
        firebase.firestore().collection("eventos")
            .where("ativo", "==", true)
            .onSnapshot((eventos) => {
                let eventosArray = [];
                
                eventos.forEach((evento) => {
                    eventosArray.push({
                        id : evento.id,
                        titulo : evento.data().titulo,
                        descricao : evento.data().descricao,
                        data : evento.data().data,
                        acessoLivre : evento.data().acessoLivre,
                        ativo : evento.data().ativo
                    })
                })

                this.setState({listaEventos : eventosArray}, () => {
                    console.log(this.state.listaEventos);
                })
            })
    }

    listarEventos(){
        firebase.firestore().collection("eventos")
            .where("ativo", "==", true)
            .get()
            .then((eventos) => {
                let eventosArray = [];
                
                eventos.forEach((evento) => {
                    eventosArray.push({
                        id : evento.id,
                        titulo : evento.data().titulo,
                        descricao : evento.data().descricao,
                        data : evento.data().data,
                        acessoLivre : evento.data().acessoLivre,
                        ativo : evento.data().ativo
                    })
                })

                this.setState({listaEventos : eventosArray}, () => {
                    console.log(this.state.listaEventos);
                })
            });

    }

    componentDidMount(){
        this.listarEventosRealTime();
    }

    render(){
        return(
            <div>
                <h2>Eventos - Index</h2>
                <ul>
                {
                    this.state.listaEventos.map((evento) => {
                        return (<li>{evento.id} - {evento.titulo} - {evento.descricao}</li>)    
                    })   
                }
                </ul>
            </div>
        )
    }
}