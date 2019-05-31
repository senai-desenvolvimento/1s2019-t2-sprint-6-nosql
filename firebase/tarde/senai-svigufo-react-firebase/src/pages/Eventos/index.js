import React, { Component} from 'react';
import firebase from '../../services/firebase';

export default class EventosIndex extends Component{

    constructor(){
        super();

        this.state ={
            listaEventos : [],
            titulo : '',
            descricao : '',
            data : '',
            hora : '',
            acessoLivre : false,
            ativo : false
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

    atualizaEstado(event){
        this.setState({[event.target.name] : event.target.value});
    }

    salvarEvento(event){
        event.preventDefault();
        
        firebase.firestore().collection("eventos")
            .add({
                data : firebase.firestore.Timestamp.fromDate(new Date(this.state.data + " " + this.state.hora)),
                titulo : this.state.titulo,
                descricao : this.state.descricao,
                ativo : Boolean(this.state.ativo),
                acessoLivre : Boolean(this.state.acessoLivre)
            }).then(() => {
                alert("Evento Cadastrado")
                this.limparFormulario();
            }).catch((erro) => {
                console.log('erro', erro);
            })
    }

    limparFormulario(){
        this.setState({
            data : '',
            hora : '',
            titulo : '',
            descricao : '',
            ativo : false,
            acessoLivre : false
        })
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

                <h2>Eventos - Cadastrar</h2>
                <form onSubmit={this.salvarEvento.bind(this)} >
                    <div>
                        <label>Título</label>
                        <input type="text" name="titulo" value={this.state.titulo} onChange={this.atualizaEstado.bind(this)}  />
                    </div>
                    <div>
                        <label>Descrição</label>
                        <input type="text" name="descricao" value={this.state.descricao} onChange={this.atualizaEstado.bind(this)}  />
                    </div>
                    <div>
                        <label>Acesso Livre</label>
                        <input type="checkbox" name="acessoLivre" defaultValue={this.state.acessoLivre}  onChange={this.atualizaEstado.bind(this)}  />
                    </div>
                    <div>
                        <label>Ativo</label>
                        <input type="checkbox" defaultValue={this.state.ativo} name="ativo" onChange={this.atualizaEstado.bind(this)}  />
                    </div>
                    <div>
                        <label>Data</label>
                        <input type="date" name="data" value={this.state.data} onChange={this.atualizaEstado.bind(this)}  />
                    </div>
                    <div>
                        <label>Hora</label>
                        <input type="time" name="hora" value={this.state.hora} onChange={this.atualizaEstado.bind(this)}  />
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        )
    }
}