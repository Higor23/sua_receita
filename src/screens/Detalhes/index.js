import React from 'react';

import { CardContent, Card, CardImage } from 'react-native-cards';

import {
    NomeProduto,
    DescricaoProduto
} from '../../assets/styles';

import { getFeed, getImagem } from "../../api";

export default class Detalhes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feedId: this.props.navigation.state.params.feedId,
            feed: null
        }
    }

    carregarFeed = () => {
        const { feedId } = this.state
           
        getFeed(feedId).then((feedAtualizado) => {
            this.setState({
                feed: feedAtualizado
            });
        }).catch((erro) => {
            console.error("erro atualizando o feed: " + erro);
        });
        

    }

    componentDidMount = () => {
        this.carregarFeed();
    }

    render = () => {
        const { feed } = this.state

        if (feed) {
            return (
                <Card style={{ borderRadius: 10, padding: 10, }}>
                    <CardImage source={getImagem(feed.imagem)} />
                    <CardContent>
                            <NomeProduto style={{ padding: 10}}>{feed.product.name}</NomeProduto>
                        <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                    </CardContent>
                </Card>
            );
        } else {
            return (null);
        }
    }
}