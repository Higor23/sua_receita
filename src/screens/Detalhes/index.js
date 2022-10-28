import React from 'react';

import { CardContent, Card } from 'react-native-cards';
import { Image } from 'react-native';
import produto from '../../assets/imgs/receita.jpg';

import {
    NomeProduto,
    DescricaoProduto
} from '../../assets/styles';

import feedsEstaticos from '../../assets/dicionarios/feeds.json';


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

        const feeds = feedsEstaticos.feeds;
        const feedsFiltrados = feeds.filter((feed) => feed._id === feedId)

        if (feedsFiltrados.length) {
            this.setState({
                feed: feedsFiltrados[0]
            });
        }
    }

    componentDidMount = () => {
        this.carregarFeed();
    }

    render = () => {
        const { feed } = this.state

        if (feed) {
            return (
                <Card style={{ borderRadius: 10, padding: 10, }}>
                    <Image source={produto} style={{ width: '100%', maxHeight: 300, borderRadius: 10 }} />
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