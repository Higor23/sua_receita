import React from "react";

import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import FeedCard from "../../components/FeedCard";

import { getFeeds } from "../../api";

export default class Feeds extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            proximaPagina: 1,
            feeds: [],
            carregando: false,
            atualizando: false
        }
    }

    carregarFeeds = () => {
        const { proximaPagina, feeds, carregando } = this.state;

        // avisa que está carregando
        this.setState({
            carregando: true
        })

        
        getFeeds(proximaPagina).then((maisFeeds) => {
            if (maisFeeds.length) {
               console.log('Sim: '+ maisFeeds) 
                console.log("adicionando " + maisFeeds.length + " feeds");
    
                // incrementar a pagina e guardar os feeds
                this.setState({
                    proximaPagina: proximaPagina + 1,
                    feeds: [...feeds, ...maisFeeds],
    
                    carregando: false,
                    atualizando: false
                });
            } else {
                this.setState({
                    carregando: false,
                    atualizando: false
                })
            }
        }).catch((error) => {
            console.error("erro acessando feeds: " + error);
        })

    }

    componentDidMount = () => {
        this.carregarMaisFeeds();

    }

    carregarMaisFeeds = () => {
        const { carregando } = this.state;

        if(carregando){
            return;
        }

        this.carregarFeeds();
    }

    atualizar = () => {
        this.setState({ atualizando: true, feeds:[], proximaPagina: 1 },
            () => {
                this.carregarFeeds();
            })
    }

    mostrarFeed = (feed) => {
        return (
            <FeedCard feed={feed} navegador={this.props.navigation}/>
        );
    }

    mostrarFeeds = (feeds) => {
        const { atualizando } = this.state
        return (
            <FlatList
                data={feeds}
                numColumns={1}
                onEndReached={() => this.carregarMaisFeeds()}
                onEndReachedThreshold={0.1}

                onRefresh = {() => this.atualizar}
                refreshing={atualizando}

                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width: '100%', padding: 10 }}>
                            {this.mostrarFeed(item)}
                        </View>
                    )
                }}
            >
            </FlatList>
        )
    }

    render = () => {
        const { feeds } = this.state;
        {
            if (feeds.length) {
                console.log('Exibindo ' + feeds.length + ' feeds');

                return (
                    this.mostrarFeeds(feeds)
                );
            } else {
                return (null)
            }
        }
    }
}