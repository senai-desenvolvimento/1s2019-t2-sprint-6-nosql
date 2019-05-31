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
            ativo : false,
            idEvento : 0
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
        
        if(this.state.idEvento === 0){
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
        } else {
            firebase.firestore().collection("eventos")
                .doc(this.state.idEvento)
                .set({
                    data : firebase.firestore.Timestamp.fromDate(new Date(this.state.data + " " + this.state.hora)),
                    titulo : this.state.titulo,
                    descricao : this.state.descricao,
                    ativo : Boolean(this.state.ativo),
                    acessoLivre : Boolean(this.state.acessoLivre)
                }).then((result) => {
                    alert("Evento Alterado");
                    this.limparFormulario()
                }).catch((erro) =>{
                    console.log('erro', erro)
                })
        }
    }

    limparFormulario(){
        this.setState({
            data : '',
            hora : '',
            titulo : '',
            descricao : '',
            ativo : false,
            acessoLivre : false,
            idEvento : 0
        })
    }

    buscarPorId(event){
        event.preventDefault();

        firebase.firestore().collection("eventos")
            .doc(event.target.id)
            .get()
            .then((evento) => {
                this.setState({
                    idEvento : evento.id,
                    titulo : evento.data().titulo,
                    descricao : evento.data().descricao,
                    ativo : evento.data().ativo,
                    acessoLivre : evento.data().acessoLivre,
                    data : evento.data().data.toDate().toISOString().split("T")[0],
                    hora : evento.data().data.toDate().toTimeString().slice(0,5)
                })
            })
    }

    excluirPorId(event){
        event.preventDefault();

        if(window.confirm("Deseja excluir o documento realmente, não vai ter volta, tome cuidado!")){
            firebase.firestore().collection("eventos")
                .doc(event.target.id)
                .delete()
                .then(() => {
                    alert("Excluído cm sucesso! Sexta-feira sua linda");
                })
        }
    }

    excluirTodos(event){
        event.preventDefault();

        if(window.confirm("Deseja excluir todos, pode ser que você seja demitido, tem certeza?")){
            this.state.listaEventos.map((evento) => {
                firebase.firestore().collection("eventos")
                .doc(evento.id)
                .delete()
            })

            alert("Excluído cm sucesso! Sexta-feira sua linda");
        }
    }

    render(){
        return(
            <div>
                <h2>Eventos - Index</h2>
                <button onClick={this.excluirTodos.bind(this)}>Excluir todos</button>
                <ul>
                {
                    this.state.listaEventos.map((evento) => {
                        
                        return (
                            
                        <li key={evento.id}>
                        {evento.id} - {evento.titulo} - {evento.descricao} - 
                        <button id={evento.id} onClick={this.buscarPorId.bind(this)}>Editar</button>
                        <button id={evento.id} onClick={this.excluirPorId.bind(this)}>Excluir</button>
                        </li> 
                        )    
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
                        <input type="checkbox" name="acessoLivre" defaultChecked={this.state.ativo === true ? "true" : ""} value={this.state.acessoLivre}  onChange={this.atualizaEstado.bind(this)}  />
                    </div>
                    <div>
                        <label>Ativo
                        <input type="checkbox" defaultChecked={this.state.ativo == true ? "true" : ""} value={this.state.ativo} name="ativo" onChange={this.atualizaEstado.bind(this)}  />
                        </label>
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